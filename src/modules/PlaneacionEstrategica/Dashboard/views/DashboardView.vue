<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import type { BSCObjective, KeyInitiative, StrategicProject, FinancialKPI, ActiveRisk } from '../types/dashboardTypes'

// Mock data
const bscObjectives = ref<BSCObjective[]>([
    { name: 'Incrementar rentabilidad', perspective: 'Financiera', progress: 75, status: 'medium' },
    { name: 'Satisfacción del cliente', perspective: 'Clientes', progress: 68, status: 'medium' },
    { name: 'Eficiencia operativa', perspective: 'Procesos', progress: 88, status: 'high' },
    { name: 'Desarrollo de talento', perspective: 'Aprendizaje', progress: 72, status: 'medium' }
])

const keyInitiatives = ref<KeyInitiative[]>([
    { name: 'Transformación Digital', progress: 35, budget: '$2.5M', status: 'en-curso' },
    { name: 'Excelencia en Servicio', progress: 48, budget: '$1.2M', status: 'en-curso' },
    { name: 'Optimización de Costos', progress: 72, budget: '$500K', status: 'en-curso' }
])

const strategicProjects = ref<StrategicProject[]>([
    { name: 'ERP Integrado', progress: 45, responsible: 'Ana García', status: 'on-track' },
    { name: 'Campaña Digital 2025', progress: 62, responsible: 'Carlos Mendoza', status: 'on-track' },
    { name: 'Automatización RPA', progress: 28, responsible: 'María López', status: 'at-risk' },
    { name: 'Plataforma e-learning', progress: 55, responsible: 'Roberto Silva', status: 'on-track' }
])

const financialKPIs = ref<FinancialKPI[]>([
    { name: 'Margen EBITDA', current: 22, target: 25, unit: '%' },
    { name: 'ROI', current: 18, target: 20, unit: '%' },
    { name: 'Costos/Ingresos', current: 68, target: 60, unit: '%' }
])

const activeRisks = ref<ActiveRisk[]>([
    { name: 'Cadena de suministro', severity: 'high', probability: 7, impact: 9 },
    { name: 'Ciberseguridad', severity: 'high', probability: 8, impact: 8 },
    { name: 'Rotación de personal', severity: 'medium', probability: 5, impact: 7 }
])

// Computed
const bscAverage = computed(() => {
    const sum = bscObjectives.value.reduce((acc, obj) => acc + obj.progress, 0)
    return Math.round(sum / bscObjectives.value.length)
})

const totalBudget = computed(() => {
    return '$4.2M'
})

const onTrackProjects = computed(() => {
    return strategicProjects.value.filter(p => p.status === 'on-track').length
})

const criticalRisks = computed(() => {
    return activeRisks.value.filter(r => r.severity === 'high').length
})

const currentDate = computed(() => {
    return new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
})

// Functions
const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
        'high': 'bg-success',
        'medium': 'bg-warning',
        'low': 'bg-error'
    }
    return colors[status] || 'bg-base-300'
}

const getProjectStatusColor = (status: string) => {
    const colors: Record<string, string> = {
        'on-track': 'text-success',
        'at-risk': 'text-warning',
        'delayed': 'text-error'
    }
    return colors[status] || 'text-base-content/60'
}

const getProjectStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
        'on-track': 'On Track',
        'at-risk': 'At Risk',
        'delayed': 'Delayed'
    }
    return labels[status] || status
}

const getSeverityBadgeClass = (severity: string) => {
    const classes: Record<string, string> = {
        'high': 'badge-error',
        'medium': 'badge-ghost',
        'low': 'badge-ghost'
    }
    return classes[severity] || 'badge-ghost'
}

const getSeverityLabel = (severity: string) => {
    const labels: Record<string, string> = {
        'high': 'ALTA',
        'medium': 'MEDIA',
        'low': 'BAJA'
    }
    return labels[severity] || severity.toUpperCase()
}

const getKPIProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100)
}
</script>

<template>
    <div class="p-6 space-y-6">
        <div class="flex items-center justify-between">
            <BaseTitle
                title="Dashboard Estratégico"
                subtitle="Centro de comando ejecutivo - Vista consolidada de la estrategia"
            />
            <div class="badge badge-outline">
                Actualizado: {{ currentDate }}
            </div>
        </div>

        <!-- Top Stats Cards -->
        <div class="grid grid-cols-4 gap-4">
            <!-- BSC Compliance -->
            <div class="card bg-gradient-to-br from-success/10 to-success/5 border-success/20 shadow-sm">
                <div class="card-body p-4">
                    <div class="flex items-center justify-between mb-2">
                        <p class="text-sm text-base-content/60">Cumplimiento BSC</p>
                        <span class="material-symbols-outlined text-success">trending_up</span>
                    </div>
                    <p class="text-3xl font-bold">{{ bscAverage }}%</p>
                    <p class="text-xs text-base-content/60 mt-2">Promedio de 4 perspectivas</p>
                </div>
            </div>

            <!-- Active Initiatives -->
            <div class="card bg-gradient-to-br from-info/10 to-info/5 border-info/20 shadow-sm">
                <div class="card-body p-4">
                    <div class="flex items-center justify-between mb-2">
                        <p class="text-sm text-base-content/60">Iniciativas Activas</p>
                        <span class="material-symbols-outlined text-info">work</span>
                    </div>
                    <p class="text-3xl font-bold">{{ keyInitiatives.length }}</p>
                    <p class="text-xs text-base-content/60 mt-2">{{ totalBudget }} presupuesto total</p>
                </div>
            </div>

            <!-- Projects in Progress -->
            <div class="card bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20 shadow-sm">
                <div class="card-body p-4">
                    <div class="flex items-center justify-between mb-2">
                        <p class="text-sm text-base-content/60">Proyectos en Curso</p>
                        <span class="material-symbols-outlined text-secondary">vital_signs</span>
                    </div>
                    <p class="text-3xl font-bold">{{ strategicProjects.length }}</p>
                    <p class="text-xs text-base-content/60 mt-2">{{ onTrackProjects }} on track</p>
                </div>
            </div>

            <!-- Critical Risks -->
            <div class="card bg-gradient-to-br from-error/10 to-error/5 border-error/20 shadow-sm">
                <div class="card-body p-4">
                    <div class="flex items-center justify-between mb-2">
                        <p class="text-sm text-base-content/60">Riesgos Críticos</p>
                        <span class="material-symbols-outlined text-error">warning</span>
                    </div>
                    <p class="text-3xl font-bold">{{ criticalRisks }}</p>
                    <p class="text-xs text-base-content/60 mt-2">Requieren atención inmediata</p>
                </div>
            </div>
        </div>

        <!-- BSC Objectives & Key Initiatives -->
        <div class="grid md:grid-cols-2 gap-6">
            <!-- BSC Objectives -->
            <div class="card bg-base-200 shadow-sm">
                <div class="card-body">
                    <h3 class="card-title flex items-center gap-2">
                        <span class="material-symbols-outlined">flag</span>
                        Cumplimiento de Objetivos BSC
                    </h3>
                    <p class="text-sm text-base-content/60 mb-4">Estado por perspectiva del Balanced Scorecard</p>
                    
                    <div class="space-y-4">
                        <div v-for="(objective, index) in bscObjectives" :key="index" class="space-y-2">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-2">
                                    <div
                                        class="h-2 w-2 rounded-full animate-pulse"
                                        :class="getStatusColor(objective.status)"
                                    ></div>
                                    <span class="text-sm font-medium">{{ objective.name }}</span>
                                </div>
                                <span class="text-sm font-bold">{{ objective.progress }}%</span>
                            </div>
                            <progress
                                class="progress progress-primary w-full h-2"
                                :value="objective.progress"
                                max="100"
                            ></progress>
                            <p class="text-xs text-base-content/60">{{ objective.perspective }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Key Initiatives -->
            <div class="card bg-base-200 shadow-sm">
                <div class="card-body">
                    <h3 class="card-title flex items-center gap-2">
                        <span class="material-symbols-outlined">work</span>
                        Estado de Iniciativas Clave
                    </h3>
                    <p class="text-sm text-base-content/60 mb-4">Programas estratégicos en ejecución</p>
                    
                    <div class="space-y-4">
                        <div
                            v-for="(initiative, index) in keyInitiatives"
                            :key="index"
                            class="space-y-2 pb-4 border-b border-base-300 last:border-0"
                        >
                            <div class="flex items-center justify-between">
                                <span class="text-sm font-medium">{{ initiative.name }}</span>
                                <div class="badge badge-outline badge-sm">{{ initiative.status }}</div>
                            </div>
                            <div class="flex items-center justify-between text-xs">
                                <span class="text-base-content/60">Progreso</span>
                                <span class="font-medium">{{ initiative.progress }}%</span>
                            </div>
                            <progress
                                class="progress progress-primary w-full h-2"
                                :value="initiative.progress"
                                max="100"
                            ></progress>
                            <div class="flex items-center justify-between text-xs">
                                <span class="text-base-content/60">Presupuesto</span>
                                <span class="font-medium">{{ initiative.budget }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Strategic Projects & Financial KPIs -->
        <div class="grid md:grid-cols-2 gap-6">
            <!-- Strategic Projects -->
            <div class="card bg-base-200 shadow-sm">
                <div class="card-body">
                    <h3 class="card-title flex items-center gap-2">
                        <span class="material-symbols-outlined">vital_signs</span>
                        Avance de Proyectos Estratégicos
                    </h3>
                    <p class="text-sm text-base-content/60 mb-4">Proyectos vinculados a iniciativas</p>
                    
                    <div class="space-y-4">
                        <div v-for="(project, index) in strategicProjects" :key="index" class="space-y-2">
                            <div class="flex items-center justify-between">
                                <div class="space-y-1">
                                    <p class="text-sm font-medium">{{ project.name }}</p>
                                    <p class="text-xs text-base-content/60">PM: {{ project.responsible }}</p>
                                </div>
                                <div class="flex items-center gap-2">
                                    <span
                                        class="text-xs font-medium"
                                        :class="getProjectStatusColor(project.status)"
                                    >
                                        {{ getProjectStatusLabel(project.status) }}
                                    </span>
                                    <span class="text-sm font-bold">{{ project.progress }}%</span>
                                </div>
                            </div>
                            <progress
                                class="progress progress-primary w-full h-2"
                                :value="project.progress"
                                max="100"
                            ></progress>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Financial KPIs -->
            <div class="card bg-base-200 shadow-sm">
                <div class="card-body">
                    <h3 class="card-title flex items-center gap-2">
                        <span class="material-symbols-outlined">attach_money</span>
                        KPIs Financieros vs. Meta
                    </h3>
                    <p class="text-sm text-base-content/60 mb-4">Indicadores económicos clave</p>
                    
                    <div class="space-y-4">
                        <div v-for="(kpi, index) in financialKPIs" :key="index" class="space-y-2">
                            <div class="flex items-center justify-between">
                                <span class="text-sm font-medium">{{ kpi.name }}</span>
                                <div class="text-right">
                                    <p class="text-sm font-bold">
                                        {{ kpi.current }}{{ kpi.unit }} / {{ kpi.target }}{{ kpi.unit }}
                                    </p>
                                </div>
                            </div>
                            <progress
                                class="progress progress-primary w-full h-2"
                                :value="getKPIProgress(kpi.current, kpi.target)"
                                max="100"
                            ></progress>
                            <div class="flex items-center justify-between text-xs text-base-content/60">
                                <span>Avance</span>
                                <span>{{ Math.round(getKPIProgress(kpi.current, kpi.target)) }}%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Active Risks -->
        <div class="card bg-base-200 shadow-sm">
            <div class="card-body">
                <h3 class="card-title flex items-center gap-2">
                    <span class="material-symbols-outlined">warning</span>
                    Top 5 Riesgos Activos
                </h3>
                <p class="text-sm text-base-content/60 mb-4">Riesgos estratégicos que requieren monitoreo</p>
                
                <div class="space-y-3">
                    <div
                        v-for="(risk, index) in activeRisks"
                        :key="index"
                        class="flex items-center justify-between p-3 rounded-lg border border-base-300"
                    >
                        <div class="space-y-1">
                            <p class="text-sm font-medium">{{ risk.name }}</p>
                            <div class="flex items-center gap-2 text-xs text-base-content/60">
                                <span>Probabilidad: {{ risk.probability }}/10</span>
                                <span>•</span>
                                <span>Impacto: {{ risk.impact }}/10</span>
                            </div>
                        </div>
                        <div class="badge" :class="getSeverityBadgeClass(risk.severity)">
                            {{ getSeverityLabel(risk.severity) }}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Real-time Info -->
        <div class="card bg-base-200/50 border-dashed shadow-sm">
            <div class="card-body">
                <div class="flex items-center justify-between">
                    <div class="space-y-1">
                        <p class="text-sm font-medium">Dashboard en Tiempo Real</p>
                        <p class="text-xs text-base-content/60">
                            Los datos se actualizan automáticamente desde los módulos de Proyectos, Finanzas y RH
                        </p>
                    </div>
                    <span class="material-symbols-outlined text-4xl text-success">check_circle</span>
                </div>
            </div>
        </div>
    </div>
</template>
