<script setup lang="ts">
import { ref, watch } from 'vue';
import { useProjectStore } from '../store/projectStore';
import type { TaskFormType } from '../types/projectType';

const projectStore = useProjectStore();

const formData = ref<TaskFormType>({
  title: '',
  description: '',
  assignee: '',
  priority: 'low',
});

const priorityOptions = [
  { label: 'Baja', value: 'low' },
  { label: 'Media', value: 'medium' },
  { label: 'Alta', value: 'high' },
];

watch(
  () => projectStore.selectedTask,
  (newTask) => {
    if (newTask && newTask.id) {
      formData.value = {
        title: newTask.title,
        description: newTask.description,
        assignee: newTask.assignee,
        priority: newTask.priority,
      };
    } else {
      formData.value = {
        title: '',
        description: '',
        assignee: '',
        priority: 'low',
      };
    }
  },
  { immediate: true, deep: true }
);

defineExpose({
  formData,
});
</script>

<template>
  <form class="space-y-4">
    <div>
      <label class="label">
        <span class="label-text">Título de la Tarea</span>
      </label>
      <input
        v-model="formData.title"
        type="text"
        placeholder="Ej. Diseñar landing page"
        class="input input-bordered w-full"
      />
    </div>

    <div>
      <label class="label">
        <span class="label-text">Descripción</span>
      </label>
      <textarea
        v-model="formData.description"
        class="textarea textarea-bordered w-full"
        rows="3"
        placeholder="Añade una breve descripción..."
      ></textarea>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="label">
          <span class="label-text">Asignado a</span>
        </label>
        <input
          v-model="formData.assignee"
          type="text"
          placeholder="Ej. María García"
          class="input input-bordered w-full"
        />
      </div>
      <div>
        <label class="label">
          <span class="label-text">Prioridad</span>
        </label>
        <select v-model="formData.priority" class="select select-bordered w-full">
          <option v-for="opt in priorityOptions" :key="opt.value" :value="opt.value">
            {{ opt.label }}
          </option>
        </select>
      </div>
    </div>
  </form>
</template>