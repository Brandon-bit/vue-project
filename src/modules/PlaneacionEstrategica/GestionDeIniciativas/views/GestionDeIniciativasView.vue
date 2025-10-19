<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import InitiativeModal from '../components/InitiativeModal.vue'
import ConvertModal from '../components/ConvertModal.vue'
import useInitiativeStore from '../store/initiativeStore'
import { useModalStore } from '@/shared/stores/modal.store'
import type { Initiative } from '../types/initiativeTypes'

const initiativeStore = useInitiativeStore()
const modalStore = useModalStore()

// Mock data
const initiatives = ref<Initiative[]>([
    {
        id: 1,
        name: 'Transformación Digital',
        description: 'Modernización de sistemas y procesos mediante adopción de tecnologías cloud y automatización',
        objective: 'Mejorar eficiencia operativa',
        leader: 'Ana García',
        startDate: '2025-01-15',
        endDate: '2025-12-31',
        progress: 35,
        status: 'in-progress',
        budget: '$2,500,000',
        converted: false,
        active: true,
        deleted: false
    },
    {
        id: 2,
        name: 'Excelencia en Servicio al Cliente',
        description: 'Programa integral para elevar la experiencia del cliente en todos los puntos de contacto',
        objective: 'Aumentar satisfacción del cliente',
        leader: 'Carlos Mendoza',
        startDate: '2025-02-01',
        endDate: '2025-11-30',
        progress: 48,
        status: 'in-progress',
        budget: '$1,200,000',
        converted: false,
        active: true,
        deleted: false
    },
    {
        id: 3,
        name: 'Optimización de Costos',
        description: 'Revisión y eficiencia de estructura de costos operativos',
        objective: 'Reducir costos operativos',
        leader: 'María López',
        startDate: '2025-01-01',
        endDate: '2025-06-30',
        progress: 72,
        status: 'in-progress',
        budget: '$500,000',
        converted: true,
        active: true,
        deleted: false
    }
])

// Computed stats
const totalInitiatives = computed(() => initiatives.value.length)
const inProgressCount = computed(() => initiatives.value.filter(i => i.status === 'in-progress').length)
const convertedCount = computed(() => initiatives.value.filter(i => i.converted).length)
const averageProgress = computed(() => {
    if (initiatives.value.length === 0) return 0
    const sum = initiatives.value.reduce((acc, i) => acc + i.progress, 0)
    return Math.round(sum / initiatives.value.length)
})

// Functions
const openInitiativeModal = () => {
    modalStore.open(initiativeStore.initiativeModalId, 'CREATE', 'Nueva Iniciativa Estratégica')
}

const openConvertModal = (initiative: Initiative) => {
    initiativeStore.setInitiativeData(initiative)
    modalStore.open(initiativeStore.convertModalId, 'CREATE', '🚀 Convertir Iniciativa en Proyecto')
}

const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
        'planning': 'border-info',
        'in-progress': 'border-success',
        'paused': 'border-warning',
        'completed': 'border-base-300'
    }
    return colors[status] || 'border-base-300'
}

const getStatusBadgeClass = (status: string) => {
    const classes: Record<string, string> = {
        'planning': 'badge-info',
        'in-progress': 'badge-success',
        'paused': 'badge-warning',
        'completed': 'badge-ghost'
    }
    return classes[status] || 'badge-ghost'
}

const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
        'planning': 'Planeación',
        'in-progress': 'En Curso',
        'paused': 'Pausada',
        'completed': 'Completada'
    }
    return labels[status] || status
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' })
}
</script>

<template>
    <div class="p-6 space-y-6">
        <div class="flex items-center justify-between">
            <BaseTitle
                title="Gestión de Iniciativas Estratégicas"
                subtitle="Programas estratégicos que impulsan los objetivos corporativos"
            />
            <button @click="openInitiativeModal" class="btn btn-primary btn-lg">
                <span class="material-symbols-outlined text-xl">add</span>
                Nueva Iniciativa
            </button>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-4 gap-4">
            <div class="card bg-base-200 shadow-sm">
                <div class="card-body p-4">
                    <p class="text-sm text-base-content/60">Total Iniciativas</p>
                    <p class="text-3xl font-bold">{{ totalInitiatives }}</p>
                </div>
            </div>
            <div class="card bg-base-200 shadow-sm">
                <div class="card-body p-4">
                    <p class="text-sm text-base-content/60">En Curso</p>
                    <p class="text-3xl font-bold text-success">{{ inProgressCount }}</p>
                </div>
            </div>
            <div class="card bg-base-200 shadow-sm">
                <div class="card-body p-4">
                    <p class="text-sm text-base-content/60">Convertidas a Proyectos</p>
                    <p class="text-3xl font-bold text-info">{{ convertedCount }}</p>
                </div>
            </div>
            <div class="card bg-base-200 shadow-sm">
                <div class="card-body p-4">
                    <p class="text-sm text-base-content/60">Avance Promedio</p>
                    <p class="text-3xl font-bold text-secondary">{{ averageProgress }}%</p>
                </div>
            </div>
        </div>

        <!-- Initiatives List -->
        <div class="grid gap-6">
            <div
                v-for="initiative in initiatives"
                :key="initiative.id"
                class="card bg-base-200 shadow-sm border-l-4"
                :class="getStatusColor(initiative.status)"
            >
                <div class="card-body">
                    <!-- Header -->
                    <div class="flex items-start justify-between mb-3">
                        <div class="space-y-2 flex-1">
                            <div class="flex items-center gap-3 flex-wrap">
                                <h3 class="card-title text-xl">{{ initiative.name }}</h3>
                                <div class="badge" :class="getStatusBadgeClass(initiative.status)">
                                    {{ getStatusLabel(initiative.status) }}
                                </div>
                                <div v-if="initiative.converted" class="badge badge-outline border-success text-success">
                                    ✓ Convertida a Proyecto
                                </div>
                            </div>
                            <p class="text-sm text-base-content/60">{{ initiative.description }}</p>
                        </div>
                    </div>

                    <!-- Info Grid -->
                    <div class="grid grid-cols-4 gap-6 text-sm mb-4">
                        <div class="space-y-1">
                            <div class="flex items-center gap-2 text-base-content/60">
                                <span class="material-symbols-outlined text-lg">flag</span>
                                <span>Objetivo</span>
                            </div>
                            <p class="font-medium">{{ initiative.objective }}</p>
                        </div>
                        <div class="space-y-1">
                            <div class="flex items-center gap-2 text-base-content/60">
                                <span class="material-symbols-outlined text-lg">person</span>
                                <span>Líder</span>
                            </div>
                            <p class="font-medium">{{ initiative.leader }}</p>
                        </div>
                        <div class="space-y-1">
                            <div class="flex items-center gap-2 text-base-content/60">
                                <span class="material-symbols-outlined text-lg">calendar_month</span>
                                <span>Período</span>
                            </div>
                            <p class="font-medium text-xs">
                                {{ formatDate(initiative.startDate) }} - {{ formatDate(initiative.endDate) }}
                            </p>
                        </div>
                        <div class="space-y-1">
                            <div class="flex items-center gap-2 text-base-content/60">
                                <span class="material-symbols-outlined text-lg">attach_money</span>
                                <span>Presupuesto</span>
                            </div>
                            <p class="font-medium">{{ initiative.budget }}</p>
                        </div>
                    </div>

                    <!-- Progress -->
                    <div class="space-y-2 mb-4">
                        <div class="flex items-center justify-between text-sm">
                            <span class="text-base-content/60">Progreso</span>
                            <span class="font-medium">{{ initiative.progress }}%</span>
                        </div>
                        <progress
                            class="progress progress-primary w-full h-2"
                            :value="initiative.progress"
                            max="100"
                        ></progress>
                    </div>

                    <!-- Convert Button -->
                    <div v-if="!initiative.converted" class="pt-4 border-t border-base-300">
                        <button
                            @click="openConvertModal(initiative)"
                            class="btn btn-primary btn-lg w-full"
                        >
                            <span class="material-symbols-outlined text-xl">rocket_launch</span>
                            🚀 Convertir en Proyecto
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modals -->
        <InitiativeModal />
        <ConvertModal />
    </div>
</template>
