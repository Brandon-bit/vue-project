<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import useTaskStore from '../store/taskStore'
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import DeleteTask from './DeleteTask.vue'
import AddEditTaskForm from './AddEditTaskForm.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { taskSchema } from '../validations/taskValidation'
import { toTypedSchema } from '@vee-validate/zod'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    onRefresh?: () => void
}>()

const taskStore = useTaskStore()
const modalStore = useModalStore()

const initialValues = {
    title: taskStore.selectedTask?.title || '',
    description: taskStore.selectedTask?.description || '',
    initiative: taskStore.selectedTask?.initiative || '',
    responsible: taskStore.selectedTask?.responsible || '',
    startDate: taskStore.selectedTask?.startDate || '',
    endDate: taskStore.selectedTask?.endDate || '',
    priority: taskStore.selectedTask?.priority || '0'
}

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: toTypedSchema(taskSchema),
    validateOnMount: false,
    initialValues: initialValues
})

watch(
    () => taskStore.selectedTask,
    (item) => {
        if (item) {
            setValues({
                title: item.title,
                description: item.description,
                initiative: item.initiative,
                responsible: item.responsible,
                startDate: item.startDate,
                endDate: item.endDate,
                priority: item.priority
            })
        }
    },
    { immediate: true }
)

const modalMap: Record<string, any> = {
    CREATE: {
        component: AddEditTaskForm,
        action: async (values: any) => {
            console.log('Create Task:', values)
            return { message: 'Tarea creada exitosamente', status: 'success' }
        }
    },
    EDIT: {
        component: AddEditTaskForm,
        action: async (values: any) => {
            console.log('Edit Task:', values)
            return { message: 'Tarea actualizada exitosamente', status: 'success' }
        }
    },
    DELETE: {
        component: DeleteTask,
        action: async () => {
            console.log('Delete Task')
            return { message: 'Tarea eliminada exitosamente', status: 'success' }
        }
    }
}

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[taskStore.taskModalId]?.type
    if (!modalType) return AddEditTaskForm
    return modalMap[modalType]?.component || AddEditTaskForm
})

const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[taskStore.taskModalId]?.type
    const action = modalMap[modalType]?.action
    try {
        const { message, status } = await action(formValues)
        showNotification(message, status)
        if (status === 'success') props.onRefresh?.()
        modalStore.close(taskStore.taskModalId)
    } catch (error) {
        console.error(error)
    }
})

const onClose = () => {
    resetForm()
    taskStore.setTaskData()
}
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="taskStore.taskModalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>
