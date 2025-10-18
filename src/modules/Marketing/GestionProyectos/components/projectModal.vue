<script setup lang="ts">
import { computed, watch, ref } from 'vue';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';

import BaseModal from '@/shared/components/BaseModal.vue';
import { useModalStore } from '@/shared/stores/modal.store';
import { useProjectStore } from '../store/projectStore';
import { useProjectActions } from '../composables/useProjectActions';

import ProjectTaskForm from './projectForm.vue';
import DeleteTask from './deleteTask.vue';
import type { TaskFormType } from '../types/projectType';

const props = defineProps<{
  onRefresh?: () => void;
}>();

const projectStore = useProjectStore();
const modalStore = useModalStore();
const { createTask, updateTask, deleteTask } = useProjectActions();
const taskFormRef = ref<{ formData: TaskFormType } | null>(null);

const taskSchema = zod.object({
  title: zod.string().min(1, 'El título es requerido'),
  description: zod.string().min(1, 'La descripción es requerida'),
  assignee: zod.string().min(1, 'El asignado es requerido'),
  priority: zod.enum(['low', 'medium', 'high']),
});

const initialValues = {
  title: projectStore.selectedTask?.title || '',
  description: projectStore.selectedTask?.description || '',
  assignee: projectStore.selectedTask?.assignee || '',
  priority: projectStore.selectedTask?.priority || 'low',
};

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
  validationSchema: toTypedSchema(taskSchema),
  validateOnMount: false,
  initialValues: initialValues,
});

watch(
  () => projectStore.selectedTask,
  (task) => {
    if (task && task.id) {
      setValues({
        title: task.title,
        description: task.description,
        assignee: task.assignee,
        priority: task.priority,
      });
    }
  },
  { immediate: true }
);

const modalMap = {
  CREATE: {
    component: ProjectTaskForm,
    action: (data: TaskFormType) => createTask(data),
  },
  EDIT: {
    component: ProjectTaskForm,
    action: (data: TaskFormType) => updateTask(data),
  },
  DELETE: {
    component: DeleteTask,
    action: () => deleteTask(),
  },
};

const currentModalComponent = computed(() => {
  const modalType = modalStore.modals[projectStore.modalId]?.type;
  return modalMap[modalType]?.component;
});

const onSubmit = handleSubmit(async (formValues) => {
  const modalType = modalStore.modals[projectStore.modalId]?.type;
  const action = modalMap[modalType]?.action;

  try {
    const { message, status } = await action(formValues as TaskFormType);

    if (status === 'success') {
      props.onRefresh?.();
    }
    modalStore.close(projectStore.modalId);
  } catch (error) {
    console.error(error);
  }
});

const onClose = () => {
  resetForm();
  projectStore.setData();
};
</script>

<template>
  <BaseModal
    :onSubmit="onSubmit"
    :modalId="projectStore.modalId"
    :isSubmitting="isSubmitting"
    :onClose="onClose"
  >
    <template v-slot:modalBody>
      <component :is="currentModalComponent" ref="taskFormRef" />
    </template>
  </BaseModal>
</template>