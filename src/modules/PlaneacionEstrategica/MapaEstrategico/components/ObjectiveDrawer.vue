<script setup lang="ts">
import { computed } from 'vue'
import useMapStore from '../store/mapStore'

const mapStore = useMapStore()

const getPerformanceColor = (performance: string) => {
    const colors: Record<string, string> = {
        'high': 'bg-success',
        'medium': 'bg-warning',
        'low': 'bg-error'
    }
    return colors[performance] || 'bg-base-300'
}

const getPerformanceLabel = (performance: string) => {
    const labels: Record<string, string> = {
        'high': 'Alto',
        'medium': 'Medio',
        'low': 'Bajo'
    }
    return labels[performance] || performance
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

const getKPIProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100)
}
</script>

<template>
    <!-- Drawer overlay -->
    <div
        v-if="mapStore.isDrawerOpen"
        class="fixed inset-0 bg-black/50 z-40 transition-opacity"
        @click="mapStore.closeDrawer()"
    ></div>

    <!-- Drawer -->
    <div
        class="fixed top-0 right-0 h-full w-full sm:w-[600px] bg-base-100 shadow-2xl z-50 transform transition-transform duration-300 overflow-y-auto"
        :class="mapStore.isDrawerOpen ? 'translate-x-0' : 'translate-x-full'"
    >
        <div v-if="mapStore.selectedObjective" class="p-6 space-y-6">
            <!-- Header -->
            <div class="flex items-start justify-between">
                <div class="flex-1">
                    <div class="flex items-center gap-3 mb-2">
                        <div
                            class="h-3 w-3 rounded-full animate-pulse"
                            :class="getPerformanceColor(mapStore.selectedObjective.performance)"
                        ></div>
                        <h2 class="text-2xl font-bold">{{ mapStore.selectedObjective.name }}</h2>
                    </div>
                    <p class="text-sm text-base-content/60">
                        Perspectiva: {{ getPerspectiveLabel(mapStore.selectedObjective.perspective) }}
                    </p>
                </div>
                <button
                    @click="mapStore.closeDrawer()"
                    class="btn btn-sm btn-circle btn-ghost"
                >
                    <span class="material-symbols-outlined">close</span>
                </button>
            </div>

            <!-- KPIs -->
            <div>
                <h3 class="font-semibold text-lg mb-3">Indicadores Clave (KPIs)</h3>
                <div class="space-y-3">
                    <div
                        v-for="(kpi, index) in mapStore.selectedObjective.kpis"
                        :key="index"
                        class="card bg-base-200 shadow-sm"
                    >
                        <div class="card-body p-4">
                            <h4 class="text-sm font-semibold mb-3">{{ kpi.name }}</h4>
                            <div class="flex items-center justify-between mb-2">
                                <span class="text-xs text-base-content/60">Actual</span>
                                <span class="text-lg font-bold">{{ kpi.current }}{{ kpi.unit }}</span>
                            </div>
                            <div class="flex items-center justify-between mb-2">
                                <span class="text-xs text-base-content/60">Meta</span>
                                <span class="text-sm font-medium">{{ kpi.target }}{{ kpi.unit }}</span>
                            </div>
                            <progress
                                class="progress progress-primary w-full"
                                :value="getKPIProgress(kpi.current, kpi.target)"
                                max="100"
                            ></progress>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Iniciativas -->
            <div>
                <h3 class="font-semibold text-lg mb-3">Iniciativas Estratégicas</h3>
                <div class="space-y-2">
                    <div
                        v-for="(initiative, index) in mapStore.selectedObjective.initiatives"
                        :key="index"
                        class="flex items-center gap-3 p-3 rounded-lg bg-base-200"
                    >
                        <span class="material-symbols-outlined text-base-content/60">flag</span>
                        <span class="text-sm">{{ initiative }}</span>
                    </div>
                </div>
            </div>

            <!-- Proyectos -->
            <div>
                <h3 class="font-semibold text-lg mb-3">Proyectos Asociados</h3>
                <div class="space-y-2">
                    <div
                        v-for="(project, index) in mapStore.selectedObjective.projects"
                        :key="index"
                        class="flex items-center justify-between p-3 rounded-lg bg-base-200"
                    >
                        <span class="text-sm">{{ project }}</span>
                        <div class="badge badge-sm">En curso</div>
                    </div>
                </div>
            </div>

            <!-- Avance General -->
            <div class="card bg-primary/10 border border-primary/20">
                <div class="card-body">
                    <div class="space-y-3">
                        <div class="flex items-center justify-between">
                            <span class="text-sm font-medium">Avance General</span>
                            <span class="text-2xl font-bold">{{ mapStore.selectedObjective.progress }}%</span>
                        </div>
                        <progress
                            class="progress progress-primary w-full h-3"
                            :value="mapStore.selectedObjective.progress"
                            max="100"
                        ></progress>
                        <p class="text-xs text-base-content/60">
                            Actualizado en tiempo real desde los proyectos asociados
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
