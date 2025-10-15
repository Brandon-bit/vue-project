<script setup lang="ts">
import { ref, computed } from 'vue';
import { Plus } from 'lucide-vue-next';
import TaskColumn from '../components/TaskColumn.vue'; // Importa el componente de columna
import type { Task } from '../types/projectType'; // Importa el tipo de tarea

// Estado con todas las tareas (esto vendría de un servicio)
const tasks = ref<Task[]>([
  {
    id: "1",
    title: "Diseñar landing page",
    description: "Crear mockups para la nueva landing page del producto X",
    assignee: "María García",
    priority: "high",
    status: "inprogress",
  },
  {
    id: "2",
    title: "Redactar copy para email",
    description: "Newsletter de enero con novedades del producto",
    assignee: "Juan Pérez",
    priority: "medium",
    status: "todo",
  },
  {
    id: "3",
    title: "Aprobar diseños de redes",
    description: "Revisar y aprobar posts programados para esta semana",
    assignee: "Ana López",
    priority: "high",
    status: "review",
  },
  {
    id: "4",
    title: "Configurar campaña de Google Ads",
    description: "Campaña de búsqueda para el nuevo producto",
    assignee: "Juan Pérez",
    priority: "medium",
    status: "todo",
  }
]);


const todoTasks = computed(() => tasks.value.filter((task) => task.status === 'todo'));
const inprogressTasks = computed(() => tasks.value.filter((task) => task.status === 'inprogress'));
const reviewTasks = computed(() => tasks.value.filter((task) => task.status === 'review'));
const doneTasks = computed(() => tasks.value.filter((task) => task.status === 'done'));
</script>

<template>
  <div class="p-6 space-y-6">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold">Gestión de Proyectos</h1>
        <p class="text-gray-500 mt-2">
          Organiza y ejecuta las tareas de tu equipo de marketing
        </p>
      </div>
      <button class="btn btn-primary">
        <Plus class="mr-2 h-4 w-4" />
        Nueva Tarea
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <TaskColumn title="Por Hacer" :tasks="todoTasks" />
      <TaskColumn title="En Proceso" :tasks="inprogressTasks" />
      <TaskColumn title="En Revisión" :tasks="reviewTasks" />
      <TaskColumn title="Completado" :tasks="doneTasks" />
    </div>
  </div>
</template>