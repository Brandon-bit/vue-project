<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import ObjectiveDrawer from '../components/ObjectiveDrawer.vue'
import useMapStore from '../store/mapStore'
import type { StrategicObjective } from '../types/mapTypes'

const mapStore = useMapStore()

// Mock data
const objectives = ref<StrategicObjective[]>([
    {
        id: 1,
        name: 'Incrementar la rentabilidad',
        perspective: 'Financial',
        kpis: [
            { name: 'Margen EBITDA', current: 22, target: 25, unit: '%' },
            { name: 'ROI', current: 18, target: 20, unit: '%' }
        ],
        initiatives: ['Optimización de costos', 'Expansión de líneas rentables'],
        projects: ['Automatización de procesos', 'Lanzamiento producto premium'],
        performance: 'medium',
        progress: 75,
        active: true,
        deleted: false
    },
    {
        id: 2,
        name: 'Aumentar satisfacción del cliente',
        perspective: 'Customer',
        kpis: [
            { name: 'NPS', current: 65, target: 75, unit: ' pts' },
            { name: 'CSAT', current: 82, target: 90, unit: '%' }
        ],
        initiatives: ['Programa de excelencia en servicio', 'Sistema CRM 360°'],
        projects: ['Implementación chatbot IA', 'Rediseño experiencia digital'],
        performance: 'medium',
        progress: 68,
        active: true,
        deleted: false
    },
    {
        id: 3,
        name: 'Mejorar eficiencia operativa',
        perspective: 'Process',
        kpis: [
            { name: 'Tiempo de ciclo', current: 8, target: 5, unit: ' días' },
            { name: 'Tasa de error', current: 3.2, target: 2, unit: '%' }
        ],
        initiatives: ['Lean Six Sigma', 'Digitalización de procesos'],
        projects: ['ERP Integrado', 'Automatización RPA'],
        performance: 'high',
        progress: 88,
        active: true,
        deleted: false
    },
    {
        id: 4,
        name: 'Desarrollar talento clave',
        perspective: 'Learning',
        kpis: [
            { name: 'Horas de capacitación', current: 32, target: 40, unit: ' hrs/año' },
            { name: 'Retención de talento', current: 85, target: 90, unit: '%' }
        ],
        initiatives: ['Academia corporativa', 'Plan de sucesión'],
        projects: ['Plataforma e-learning', 'Programa mentoring'],
        performance: 'medium',
        progress: 72,
        active: true,
        deleted: false
    },
    {
        id: 5,
        name: 'Reducir costos operativos',
        perspective: 'Financial',
        kpis: [
            { name: 'Costos/Ingresos', current: 68, target: 60, unit: '%' }
        ],
        initiatives: ['Eficiencia energética', 'Renegociación proveedores'],
        projects: ['Sistema gestión energética', 'Consolidación proveedores'],
        performance: 'medium',
        progress: 65,
        active: true,
        deleted: false
    },
    {
        id: 6,
        name: 'Expandir base de clientes',
        perspective: 'Customer',
        kpis: [
            { name: 'Nuevos clientes', current: 142, target: 200, unit: ' clientes' },
            { name: 'Market share', current: 12, target: 15, unit: '%' }
        ],
        initiatives: ['Estrategia go-to-market', 'Alianzas estratégicas'],
        projects: ['Campaña digital', 'Expansión regional'],
        performance: 'low',
        progress: 52,
        active: true,
        deleted: false
    }
])

// Perspectives configuration
const perspectives = [
    {
        key: 'Financial',
        label: 'Financiera',
        icon: 'trending_up',
        color: 'success',
        borderColor: 'border-success'
    },
    {
        key: 'Customer',
        label: 'Clientes',
        icon: 'group',
        color: 'info',
        borderColor: 'border-info'
    },
    {
        key: 'Process',
        label: 'Procesos Internos',
        icon: 'settings',
        color: 'warning',
        borderColor: 'border-warning'
    },
    {
        key: 'Learning',
        label: 'Aprendizaje y Crecimiento',
        icon: 'school',
        color: 'secondary',
        borderColor: 'border-secondary'
    }
]

// Group objectives by perspective
const groupedObjectives = computed(() => {
    const grouped: Record<string, StrategicObjective[]> = {}
    perspectives.forEach(p => {
        grouped[p.key] = objectives.value.filter(obj => obj.perspective === p.key)
    })
    return grouped
})

// Functions
const getPerformanceColor = (performance: string) => {
    const colors: Record<string, string> = {
        'high': 'bg-success',
        'medium': 'bg-warning',
        'low': 'bg-error'
    }
    return colors[performance] || 'bg-base-300'
}

const handleObjectiveClick = (objective: StrategicObjective) => {
    mapStore.openDrawer(objective)
}
</script>

<template>
    <div class="p-6 space-y-6">
        <BaseTitle
            title="Mapa Estratégico"
            subtitle="Balanced Scorecard - Perspectivas y objetivos interconectados"
        />

        <!-- Leyenda -->
        <div class="card bg-base-200/50 shadow-sm">
            <div class="card-body p-4">
                <h3 class="text-sm font-semibold mb-3">Leyenda de Desempeño</h3>
                <div class="flex items-center gap-6 text-sm flex-wrap">
                    <div class="flex items-center gap-2">
                        <div class="h-3 w-3 rounded-full bg-success"></div>
                        <span>Alto (≥85%)</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <div class="h-3 w-3 rounded-full bg-warning"></div>
                        <span>Medio (60-84%)</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <div class="h-3 w-3 rounded-full bg-error"></div>
                        <span>Bajo (<60%)</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Perspectivas -->
        <div class="space-y-8">
            <div
                v-for="perspective in perspectives"
                :key="perspective.key"
                class="space-y-4"
            >
                <!-- Perspective Header -->
                <div class="flex items-center gap-3 pb-2 border-b-2" :class="perspective.borderColor">
                    <div class="p-2 rounded-lg text-white" :class="`bg-${perspective.color}`">
                        <span class="material-symbols-outlined text-xl">{{ perspective.icon }}</span>
                    </div>
                    <h2 class="text-xl font-semibold">{{ perspective.label }}</h2>
                    <div class="badge badge-outline ml-auto">
                        {{ groupedObjectives[perspective.key].length }} objetivos
                    </div>
                </div>

                <!-- Objectives Grid -->
                <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <div
                        v-for="objective in groupedObjectives[perspective.key]"
                        :key="objective.id"
                        class="card bg-base-200 shadow-sm cursor-pointer hover:shadow-lg transition-shadow border-l-4"
                        :class="perspective.borderColor"
                        @click="handleObjectiveClick(objective)"
                    >
                        <div class="card-body">
                            <!-- Card Header -->
                            <div class="flex items-start justify-between mb-3">
                                <h3 class="card-title text-base leading-tight flex-1">
                                    {{ objective.name }}
                                </h3>
                                <div
                                    class="h-3 w-3 rounded-full animate-pulse flex-shrink-0"
                                    :class="getPerformanceColor(objective.performance)"
                                ></div>
                            </div>

                            <!-- Progress -->
                            <div class="space-y-2">
                                <div class="flex items-center justify-between text-xs">
                                    <span class="text-base-content/60">Avance general</span>
                                    <span class="font-medium">{{ objective.progress }}%</span>
                                </div>
                                <progress
                                    class="progress progress-primary w-full h-2"
                                    :value="objective.progress"
                                    max="100"
                                ></progress>
                            </div>

                            <!-- Stats -->
                            <div class="pt-3 border-t border-base-300">
                                <div class="flex items-center justify-between text-xs text-base-content/60">
                                    <span>{{ objective.kpis.length }} KPIs</span>
                                    <span>{{ objective.projects.length }} proyectos</span>
                                </div>
                            </div>

                            <!-- View Details Button -->
                            <button class="btn btn-ghost btn-sm w-full mt-2">
                                Ver detalles
                                <span class="material-symbols-outlined text-lg">chevron_right</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Drawer -->
        <ObjectiveDrawer />
    </div>
</template>
