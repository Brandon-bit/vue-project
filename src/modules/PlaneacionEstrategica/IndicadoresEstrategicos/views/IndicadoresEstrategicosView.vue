<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import KPIModal from '../components/KPIModal.vue'
import useKPIStore from '../store/kpiStore'
import { useModalStore } from '@/shared/stores/modal.store'
import type { KPI } from '../types/kpiTypes'

const kpiStore = useKPIStore()
const modalStore = useModalStore()

// Active tab
const activeTab = ref('todos')

// Mock data
const kpis = ref<KPI[]>([
    {
        id: 1,
        name: 'Margen EBITDA',
        description: 'Rentabilidad operativa antes de intereses, impuestos, depreciación y amortización',
        type: 'KPI',
        perspective: 'Financial',
        objective: 'Incrementar la rentabilidad',
        currentValue: 22,
        target: 25,
        unit: '%',
        frequency: 'Monthly',
        trend: 'ascending',
        status: 'attention',
        dataSource: 'ERP Financiero',
        active: true,
        deleted: false
    },
    {
        id: 2,
        name: 'Net Promoter Score (NPS)',
        description: 'Indicador de lealtad y satisfacción del cliente',
        type: 'KPI',
        perspective: 'Customer',
        objective: 'Aumentar satisfacción del cliente',
        currentValue: 65,
        target: 75,
        unit: ' pts',
        frequency: 'Quarterly',
        trend: 'ascending',
        status: 'attention',
        dataSource: 'Encuestas CRM',
        active: true,
        deleted: false
    },
    {
        id: 3,
        name: 'Tiempo de Ciclo de Proceso',
        description: 'Días promedio para completar el proceso end-to-end',
        type: 'KPI',
        perspective: 'Process',
        objective: 'Mejorar eficiencia operativa',
        currentValue: 8,
        target: 5,
        unit: ' días',
        frequency: 'Weekly',
        trend: 'descending',
        status: 'attention',
        dataSource: 'Sistema de Gestión',
        active: true,
        deleted: false
    },
    {
        id: 4,
        name: 'ROI',
        description: 'Retorno sobre inversión',
        type: 'KPI',
        perspective: 'Financial',
        objective: 'Incrementar la rentabilidad',
        currentValue: 18,
        target: 20,
        unit: '%',
        frequency: 'Monthly',
        trend: 'ascending',
        status: 'meeting',
        dataSource: 'ERP Financiero',
        active: true,
        deleted: false
    },
    {
        id: 5,
        name: 'Retención de Talento',
        description: 'Porcentaje de empleados clave que permanecen en la organización',
        type: 'OKR',
        perspective: 'Learning',
        objective: 'Desarrollar talento clave',
        currentValue: 85,
        target: 90,
        unit: '%',
        frequency: 'Quarterly',
        trend: 'stable',
        status: 'attention',
        dataSource: 'Sistema de RH',
        active: true,
        deleted: false
    }
])

// Computed stats
const totalKPIs = computed(() => kpis.value.length)
const meetingCount = computed(() => kpis.value.filter(k => k.status === 'meeting').length)
const attentionCount = computed(() => kpis.value.filter(k => k.status === 'attention').length)
const criticalCount = computed(() => kpis.value.filter(k => k.status === 'critical').length)

// Group by perspective
const kpisByPerspective = computed(() => {
    const grouped: Record<string, KPI[]> = {}
    kpis.value.forEach(kpi => {
        if (!grouped[kpi.perspective]) {
            grouped[kpi.perspective] = []
        }
        grouped[kpi.perspective].push(kpi)
    })
    return grouped
})

// Filter by type
const filteredKPIs = computed(() => {
    if (activeTab.value === 'kpi') {
        return kpis.value.filter(k => k.type === 'KPI')
    } else if (activeTab.value === 'okr') {
        return kpis.value.filter(k => k.type === 'OKR')
    }
    return kpis.value
})

// Functions
const openKPIModal = () => {
    modalStore.open(kpiStore.kpiModalId, 'CREATE', 'Nuevo Indicador Estratégico')
}

const getProgress = (kpi: KPI) => {
    return Math.min((kpi.currentValue / kpi.target) * 100, 100)
}

const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
        'meeting': 'border-success',
        'attention': 'border-warning',
        'critical': 'border-error'
    }
    return colors[status] || 'border-base-300'
}

const getTrendIcon = (trend: string) => {
    const icons: Record<string, string> = {
        'ascending': 'trending_up',
        'descending': 'trending_down',
        'stable': 'remove'
    }
    return icons[trend] || 'remove'
}

const getTrendColor = (trend: string) => {
    const colors: Record<string, string> = {
        'ascending': 'text-success',
        'descending': 'text-error',
        'stable': 'text-base-content/60'
    }
    return colors[trend] || 'text-base-content/60'
}

const getPerspectiveLabel = (perspective: string) => {
    const labels: Record<string, string> = {
        'Financial': 'Financiera',
        'Customer': 'Clientes',
        'Process': 'Procesos Internos',
        'Learning': 'Aprendizaje y Crecimiento'
    }
    return labels[perspective] || perspective
}

const getFrequencyLabel = (frequency: string) => {
    const labels: Record<string, string> = {
        'Daily': 'Diaria',
        'Weekly': 'Semanal',
        'Monthly': 'Mensual',
        'Quarterly': 'Trimestral',
        'Annual': 'Anual'
    }
    return labels[frequency] || frequency
}
</script>

<template>
    <div class="p-6 space-y-6">
        <div class="flex items-center justify-between">
            <BaseTitle
                title="Indicadores Estratégicos"
                subtitle="KPIs y OKRs que miden el avance de los objetivos estratégicos"
            />
            <button @click="openKPIModal" class="btn btn-primary btn-lg">
                <span class="material-symbols-outlined text-xl">add</span>
                Nuevo Indicador
            </button>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-4 gap-4">
            <div class="card bg-base-200 shadow-sm">
                <div class="card-body p-4">
                    <p class="text-sm text-base-content/60">Total Indicadores</p>
                    <p class="text-3xl font-bold">{{ totalKPIs }}</p>
                </div>
            </div>
            <div class="card bg-base-200 shadow-sm">
                <div class="card-body p-4">
                    <p class="text-sm text-base-content/60">Cumpliendo Meta</p>
                    <p class="text-3xl font-bold text-success">{{ meetingCount }}</p>
                </div>
            </div>
            <div class="card bg-base-200 shadow-sm">
                <div class="card-body p-4">
                    <p class="text-sm text-base-content/60">Requieren Atención</p>
                    <p class="text-3xl font-bold text-warning">{{ attentionCount }}</p>
                </div>
            </div>
            <div class="card bg-base-200 shadow-sm">
                <div class="card-body p-4">
                    <p class="text-sm text-base-content/60">Críticos</p>
                    <p class="text-3xl font-bold text-error">{{ criticalCount }}</p>
                </div>
            </div>
        </div>

        <!-- Tabs -->
        <div role="tablist" class="tabs tabs-boxed">
            <a
                role="tab"
                class="tab"
                :class="{ 'tab-active': activeTab === 'todos' }"
                @click="activeTab = 'todos'"
            >
                Todos
            </a>
            <a
                role="tab"
                class="tab"
                :class="{ 'tab-active': activeTab === 'kpi' }"
                @click="activeTab = 'kpi'"
            >
                KPIs
            </a>
            <a
                role="tab"
                class="tab"
                :class="{ 'tab-active': activeTab === 'okr' }"
                @click="activeTab = 'okr'"
            >
                OKRs
            </a>
        </div>

        <!-- Content by Tab -->
        <div v-if="activeTab === 'todos'" class="space-y-6">
            <div
                v-for="(kpisData, perspective) in kpisByPerspective"
                :key="perspective"
                class="space-y-4"
            >
                <h2 class="text-xl font-semibold border-b border-base-300 pb-2">
                    {{ getPerspectiveLabel(perspective) }}
                </h2>
                <div class="grid gap-4 md:grid-cols-2">
                    <div
                        v-for="kpi in kpisData"
                        :key="kpi.id"
                        class="card bg-base-200 shadow-sm border-l-4"
                        :class="getStatusColor(kpi.status)"
                    >
                        <div class="card-body">
                            <!-- Header -->
                            <div class="flex items-start justify-between mb-2">
                                <div class="space-y-1 flex-1">
                                    <div class="flex items-center gap-2">
                                        <h3 class="card-title text-base">{{ kpi.name }}</h3>
                                        <div class="badge badge-sm">{{ kpi.type }}</div>
                                    </div>
                                    <p class="text-xs text-base-content/60">{{ kpi.description }}</p>
                                </div>
                                <span
                                    class="material-symbols-outlined text-xl"
                                    :class="getTrendColor(kpi.trend)"
                                >
                                    {{ getTrendIcon(kpi.trend) }}
                                </span>
                            </div>

                            <!-- Values -->
                            <div class="flex items-end justify-between mb-3">
                                <div>
                                    <p class="text-xs text-base-content/60">Actual</p>
                                    <p class="text-2xl font-bold">{{ kpi.currentValue }}{{ kpi.unit }}</p>
                                </div>
                                <div class="text-right">
                                    <p class="text-xs text-base-content/60">Meta</p>
                                    <p class="text-lg font-medium">{{ kpi.target }}{{ kpi.unit }}</p>
                                </div>
                            </div>

                            <!-- Progress -->
                            <div class="space-y-1 mb-3">
                                <div class="flex items-center justify-between text-xs">
                                    <span class="text-base-content/60">Avance</span>
                                    <span class="font-medium">{{ Math.round(getProgress(kpi)) }}%</span>
                                </div>
                                <progress
                                    class="progress progress-primary w-full h-2"
                                    :value="getProgress(kpi)"
                                    max="100"
                                ></progress>
                            </div>

                            <!-- Info Grid -->
                            <div class="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-base-300">
                                <div>
                                    <p class="text-base-content/60">Frecuencia</p>
                                    <p class="font-medium">{{ getFrequencyLabel(kpi.frequency) }}</p>
                                </div>
                                <div>
                                    <p class="text-base-content/60">Fuente</p>
                                    <p class="font-medium">{{ kpi.dataSource }}</p>
                                </div>
                            </div>

                            <!-- Objective -->
                            <div v-if="kpi.objective" class="text-xs pt-2 border-t border-base-300">
                                <p class="text-base-content/60">Objetivo asociado:</p>
                                <p class="font-medium">{{ kpi.objective }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- KPI/OKR Tab Content -->
        <div v-else class="grid gap-4 md:grid-cols-2">
            <div
                v-for="kpi in filteredKPIs"
                :key="kpi.id"
                class="card bg-base-200 shadow-sm border-l-4"
                :class="getStatusColor(kpi.status)"
            >
                <div class="card-body">
                    <div class="flex items-start justify-between mb-2">
                        <div class="space-y-1">
                            <h3 class="card-title text-base">{{ kpi.name }}</h3>
                            <p class="text-xs text-base-content/60">{{ getPerspectiveLabel(kpi.perspective) }}</p>
                        </div>
                        <span
                            class="material-symbols-outlined text-xl"
                            :class="getTrendColor(kpi.trend)"
                        >
                            {{ getTrendIcon(kpi.trend) }}
                        </span>
                    </div>
                    <div class="flex items-end justify-between mb-3">
                        <div>
                            <p class="text-xs text-base-content/60">Actual</p>
                            <p class="text-2xl font-bold">{{ kpi.currentValue }}{{ kpi.unit }}</p>
                        </div>
                        <div class="text-right">
                            <p class="text-xs text-base-content/60">Meta</p>
                            <p class="text-lg font-medium">{{ kpi.target }}{{ kpi.unit }}</p>
                        </div>
                    </div>
                    <progress
                        class="progress progress-primary w-full h-2"
                        :value="getProgress(kpi)"
                        max="100"
                    ></progress>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <KPIModal />
    </div>
</template>
