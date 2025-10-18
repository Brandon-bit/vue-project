<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { Plus } from 'lucide-vue-next';
import TaskColumn from '../components/TaskColumn.vue';
import ProjectModal from '../components/projectModal.vue';
import { useProjectStore } from '../store/projectStore';
import { useModalStore } from '@/shared/stores/modal.store';
import { useProjectActions } from '../composables/useProjectActions';
import type { Task } from '../types/projectType';
import BaseTitle from '@/shared/components/BaseTitle.vue';

const tasks = ref<Task[]>([]);

const projectStore = useProjectStore();
const modalStore = useModalStore();
const { getTasks } = useProjectActions();

const fetchData = async () => {
  const response = await getTasks();
  tasks.value = response.items;
};

onMounted(fetchData);

const todoTasks = computed(() => tasks.value.filter((task) => task.status === 'todo'));
const inprogressTasks = computed(() => tasks.value.filter((task) => task.status === 'inprogress'));
const reviewTasks = computed(() => tasks.value.filter((task) => task.status === 'review'));
const doneTasks = computed(() => tasks.value.filter((task) => task.status === 'done'));

const openCreateModal = () => {
  projectStore.setData();
  modalStore.open(projectStore.modalId, {
    type: 'CREATE',
    title: 'Crear Nueva Tarea',
  });
};

const handleEditClick = (task: Task) => {
  projectStore.setData(task);
  modalStore.open(projectStore.modalId, {
    type: 'EDIT',
    title: 'Editar Tarea',
  });
};

const handleDeleteClick = (task: Task) => {
  projectStore.setData(task);
  modalStore.open(projectStore.modalId, {
    type: 'DELETE',
    title: 'Eliminar Tarea',
  });
};
</script>

<template>
  <div class="p-6 space-y-6">
    <BaseTitle title="Gestión de Proyectos" subtitle="Organiza y ejecuta las tareas de tu equipo" />
    
    <div class="flex justify-end items-center">
      <button class="btn btn-primary" @click="openCreateModal">
        <Plus class="mr-2 h-4 w-4" />
        Nueva Tarea
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <TaskColumn
        title="Por Hacer"
        :tasks="todoTasks"
        @add-task="openCreateModal"
        @edit-task="handleEditClick"
        @delete-task="handleDeleteClick"
      />
      <TaskColumn
        title="En Proceso"
        :tasks="inprogressTasks"
        @add-task="openCreateModal"
        @edit-task="handleEditClick"
        @delete-task="handleDeleteClick"
      />
      <TaskColumn
        title="En Revisión"
        :tasks="reviewTasks"
        @add-task="openCreateModal"
        @edit-task="handleEditClick"
        @delete-task="handleDeleteClick"
      />
      <TaskColumn
        title="Completado"
        :tasks="doneTasks"
        @add-task="openCreateModal"
        @edit-task="handleEditClick"
        @delete-task="handleDeleteClick"
      />
    </div>

    <ProjectModal :on-refresh="fetchData" />
  </div>
</template>