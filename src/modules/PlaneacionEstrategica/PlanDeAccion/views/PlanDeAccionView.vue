<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import TaskModal from '../components/TaskModal.vue'
import useTaskStore from '../store/taskStore'
import { useModalStore } from '@/shared/stores/modal.store'
import type { Task } from '../types/taskTypes'

const taskStore = useTaskStore()
const modalStore = useModalStore()

// Mock data
const tasks = ref<Task[]>([
    {
        id: 1,
        title: 'Evaluación de plataformas cloud',
        description: 'Análisis comparativo de AWS, Azure y GCP',
        initiative: 'Transformación Digital',
        responsible: 'Juan Pérez',
        startDate: '2025-01-15',
        endDate: '2025-02-15',
        status: 'completed',
        priority: 'high',
        active: true,
        deleted: false
    },
    {
        id: 2,
        title: 'Diseño de arquitectura de migración',
        description: 'Documentar arquitectura target y plan de migración',
        initiative: 'Transformación Digital',
        responsible: 'Ana García',
        startDate: '2025-02-16',
        endDate: '2025-03-30',
        status: 'in-progress',
        priority: 'high',
        active: true,
        deleted: false
    },
    {
        id: 3,
        title: 'Capacitación equipo de soporte',
        description: 'Programa de training en nuevas herramientas',
        initiative: 'Excelencia en Servicio',
        responsible: 'Carlos Mendoza',
        startDate: '2025-02-01',
        endDate: '2025-03-15',
        status: 'in-progress',
        priority: 'medium',
        active: true,
        deleted: false
    },
    {
        id: 4,
        title: 'Implementación sistema de tickets',
        description: 'Deploy de plataforma de gestión de tickets',
        initiative: 'Excelencia en Servicio',
        responsible: 'María López',
        startDate: '2025-03-01',
        endDate: '2025-04-15',
        status: 'pending',
        priority: 'medium',
        active: true,
        deleted: false
    },
    {
        id: 5,
        title: 'Análisis de estructura de costos',
        description: 'Revisión detallada de gastos operativos por categoría',
        initiative: 'Optimización de Costos',
        responsible: 'Roberto Silva',
        startDate: '2025-01-01',
        endDate: '2025-02-28',
        status: 'review',
        priority: 'high',
        active: true,
        deleted: false
    }
])

// Kanban columns
const columns = [
    { id: 'pending', label: 'Pendiente', color: 'border-base-300' },
    { id: 'in-progress', label: 'En Progreso', color: 'border-info' },
    { id: 'review', label: 'En Revisión', color: 'border-warning' },
    { id: 'completed', label: 'Completada', color: 'border-success' }
]

// Group tasks by status
const tasksByStatus = computed(() => {
    const grouped: Record<string, Task[]> = {
        'pending': [],
        'in-progress': [],
        'review': [],
        'completed': []
    }
    tasks.value.forEach(task => {
        grouped[task.status].push(task)
    })
    return grouped
})

// Stats
const totalTasks = computed(() => tasks.value.length)
const inProgressCount = computed(() => tasksByStatus.value['in-progress'].length)
const reviewCount = computed(() => tasksByStatus.value['review'].length)
const completedCount = computed(() => tasksByStatus.value['completed'].length)

// Functions
const openTaskModal = () => {
    modalStore.open(taskStore.taskModalId, 'CREATE', 'Nueva Tarea')
}

const handleMoveTask = (taskId: number, newStatus: string) => {
    const taskIndex = tasks.value.findIndex(t => t.id === taskId)
    if (taskIndex !== -1) {
        tasks.value[taskIndex].status = newStatus as Task['status']
    }
}

const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
        'pending': 'border-base-300',
        'in-progress': 'border-info',
        'review': 'border-warning',
        'completed': 'border-success'
    }
    return colors[status] || 'border-base-300'
}

const getPriorityBadgeClass = (priority: string) => {
    const classes: Record<string, string> = {
        'high': 'badge-error',
        'medium': 'badge-ghost',
        'low': 'badge-ghost'
    }
    return classes[priority] || 'badge-ghost'
}

const getPriorityLabel = (priority: string) => {
    const labels: Record<string, string> = {
        'high': 'Alta',
        'medium': 'Media',
        'low': 'Baja'
    }
    return labels[priority] || priority
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })
}
</script>

<template>
    <div class="p-6 space-y-6">
        <div class="flex items-center justify-between">
            <BaseTitle
                title="Plan de Acción Operativo"
                subtitle="Gestión de tareas vinculadas a iniciativas estratégicas"
            />
            <button @click="openTaskModal" class="btn btn-primary btn-lg">
                <span class="material-symbols-outlined text-xl">add</span>
                Nueva Tarea
            </button>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-4 gap-4">
            <div class="card bg-base-200 shadow-sm">
                <div class="card-body p-4">
                    <p class="text-sm text-base-content/60">Total Tareas</p>
                    <p class="text-3xl font-bold">{{ totalTasks }}</p>
                </div>
            </div>
            <div class="card bg-base-200 shadow-sm">
                <div class="card-body p-4">
                    <p class="text-sm text-base-content/60">En Progreso</p>
                    <p class="text-3xl font-bold text-info">{{ inProgressCount }}</p>
                </div>
            </div>
            <div class="card bg-base-200 shadow-sm">
                <div class="card-body p-4">
                    <p class="text-sm text-base-content/60">En Revisión</p>
                    <p class="text-3xl font-bold text-warning">{{ reviewCount }}</p>
                </div>
            </div>
            <div class="card bg-base-200 shadow-sm">
                <div class="card-body p-4">
                    <p class="text-sm text-base-content/60">Completadas</p>
                    <p class="text-3xl font-bold text-success">{{ completedCount }}</p>
                </div>
            </div>
        </div>

        <!-- Kanban Board -->
        <div class="grid grid-cols-4 gap-6">
            <div
                v-for="column in columns"
                :key="column.id"
                class="space-y-4"
            >
                <!-- Column Header -->
                <div class="flex items-center justify-between">
                    <h3 class="font-semibold text-sm uppercase tracking-wider">
                        {{ column.label }}
                    </h3>
                    <div class="badge badge-sm">{{ tasksByStatus[column.id].length }}</div>
                </div>

                <!-- Tasks -->
                <div class="space-y-3">
                    <div
                        v-for="task in tasksByStatus[column.id]"
                        :key="task.id"
                        class="card bg-base-200 shadow-sm border-l-4"
                        :class="getStatusColor(task.status)"
                    >
                        <div class="card-body p-4">
                            <!-- Title and Description -->
                            <div class="space-y-1 mb-3">
                                <h4 class="text-sm font-semibold leading-tight">{{ task.title }}</h4>
                                <p class="text-xs text-base-content/60 line-clamp-2">{{ task.description }}</p>
                            </div>

                            <!-- Priority Badge -->
                            <div class="flex items-center gap-2 mb-3">
                                <div class="badge badge-sm" :class="getPriorityBadgeClass(task.priority)">
                                    {{ getPriorityLabel(task.priority) }}
                                </div>
                            </div>

                            <!-- Initiative -->
                            <div v-if="task.initiative" class="text-xs mb-3">
                                <p class="text-base-content/60">Iniciativa:</p>
                                <p class="font-medium">{{ task.initiative }}</p>
                            </div>

                            <!-- Responsible and Dates -->
                            <div class="space-y-2 text-xs mb-3">
                                <div class="flex items-center gap-2 text-base-content/60">
                                    <span class="material-symbols-outlined text-sm">person</span>
                                    <span>{{ task.responsible }}</span>
                                </div>
                                <div class="flex items-center gap-2 text-base-content/60">
                                    <span class="material-symbols-outlined text-sm">calendar_month</span>
                                    <span>{{ formatDate(task.startDate) }} - {{ formatDate(task.endDate) }}</span>
                                </div>
                            </div>

                            <!-- Status Selector -->
                            <div class="pt-2 border-t border-base-300">
                                <select
                                    :value="task.status"
                                    @change="(e) => handleMoveTask(task.id, (e.target as HTMLSelectElement).value)"
                                    class="select select-sm w-full text-xs"
                                >
                                    <option value="pending">Pendiente</option>
                                    <option value="in-progress">En Progreso</option>
                                    <option value="review">En Revisión</option>
                                    <option value="completed">Completada</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <TaskModal />
    </div>
</template>
