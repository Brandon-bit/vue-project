<script setup lang="ts">
import type { PropType } from 'vue';
import { MoreVertical, Plus, Edit, Trash2 } from 'lucide-vue-next';
import type { Task } from '../types/projectType';

defineProps({
  title: {
    type: String,
    required: true,
  },
  tasks: {
    type: Array as PropType<Task[]>,
    required: true,
  },
});

const emit = defineEmits(['edit-task', 'delete-task', 'add-task']);

const getPriorityProps = (priority: Task['priority']) => {
  switch (priority) {
    case 'low':
      return { label: 'Baja', class: 'badge-info' };
    case 'medium':
      return { label: 'Media', class: 'badge-warning' };
    case 'high':
      return { label: 'Alta', class: 'badge-error' };
    default:
      return { label: '', class: '' };
  }
};
</script>

<template>
  <div class="card bg-base-200">
    <div class="card-body bg-white shadow-md rounded-lg">
      <div class="flex justify-between items-center mb-4">
        <h3 class="card-title text-base font-semibold">{{ title }}</h3>
        <span class="cursor-pointer rounded-[8px] bg-neutral-200 px-3 py-1 text-sm text-neutral-950 transition-colors hover:bg-neutral-100 active:bg-neutral-50">{{ tasks.length }}</span>
      </div>

      <div class="space-y-3">
        <div
          v-for="task in tasks"
          :key="task.id"
          class="card bg-base-100 border border-gray-300 shadow-lg hover:shadow-xl transition-shadow cursor-pointer rounded-2xl"
        >
          <div class="card-body p-4">
            <div class="flex justify-between items-start mb-2">
              <h4 class="font-medium text-sm">{{ task.title }}</h4>
              <div class="dropdown dropdown-end">
                <button tabindex="0" class="btn btn-ghost btn-circle btn-sm h-6 w-6">
                  <MoreVertical class="h-4 w-4" />
                </button>
                <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-36 z-10">
                  <li><a @click="emit('edit-task', task)"><Edit class="h-4 w-4 mr-2"/>Editar</a></li>
                  <li><a @click="emit('delete-task', task)" class="text-error"><Trash2 class="h-4 w-4 mr-2"/>Eliminar</a></li>
                </ul>
              </div>
            </div>
            <p class="text-xs text-gray-500 mb-3">{{ task.description }}</p>
            <div class="flex justify-between items-center">
              <span class="text-xs text-gray-500">{{ task.assignee }}</span>
              <span
                class="badge text-xs"
                :class="getPriorityProps(task.priority).class"
              >
                {{ getPriorityProps(task.priority).label }}
              </span>
            </div>
          </div>
        </div>

        <button class="btn btn-ghost btn-sm w-full mt-2" @click="emit('add-task')">
          <Plus class="mr-2 h-4 w-4" />
          Agregar Tarea
        </button>
      </div>
    </div>
  </div>
</template>