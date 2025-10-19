<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import LessonModal from '../components/LessonModal.vue'
import PeriodClosureModal from '../components/PeriodClosureModal.vue'
import useEvaluationStore from '../store/evaluationStore'
import { useModalStore } from '@/shared/stores/modal.store'
import type { Lesson, PeriodResults } from '../types/evaluationTypes'

const evaluationStore = useEvaluationStore()
const modalStore = useModalStore()

// Mock data
const lessons = ref<Lesson[]>([
    {
        id: 1,
        objective: 'Incrementar la rentabilidad',
        lesson: 'La implementación temprana de automatización generó ahorros significativos',
        type: 'success',
        impact: 'Reducción de costos operativos en 12%',
        actions: 'Expandir programa de automatización a otras áreas',
        active: true,
        deleted: false
    },
    {
        id: 2,
        objective: 'Aumentar satisfacción del cliente',
        lesson: 'El tiempo de respuesta en canales digitales excedió expectativas iniciales',
        type: 'problem',
        impact: 'NPS por debajo de la meta en Q1',
        actions: 'Implementar chatbot IA y reforzar equipo de soporte',
        active: true,
        deleted: false
    }
])

const periodResults = ref<PeriodResults>({
    evaluatedObjectives: 4,
    completedObjectives: 3,
    averageCompliance: 76,
    completedInitiatives: 1,
    ongoingInitiatives: 2,
    greenKPIs: 5,
    yellowKPIs: 3,
    redKPIs: 1
})

// Computed
const successLessons = computed(() => lessons.value.filter(l => l.type === 'success').length)
const improvementLessons = computed(() => lessons.value.filter(l => l.type === 'improvement').length)
const problemLessons = computed(() => lessons.value.filter(l => l.type === 'problem').length)
const totalLessons = computed(() => lessons.value.length)

// Functions
const openLessonModal = () => {
    modalStore.open(evaluationStore.lessonModalId, 'CREATE', 'Nueva Lección Aprendida')
}

const openClosureModal = () => {
    modalStore.open(evaluationStore.closureModalId, 'CREATE', 'Wizard de Cierre de Periodo Estratégico')
}

const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
        'success': 'border-success',
        'improvement': 'border-info',
        'problem': 'border-error'
    }
    return colors[type] || 'border-base-300'
}

const getTypeBadgeClass = (type: string) => {
    const classes: Record<string, string> = {
        'success': 'badge-success',
        'improvement': 'badge-info',
        'problem': 'badge-error'
    }
    return classes[type] || 'badge-ghost'
}

const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
        'success': 'Éxito',
        'improvement': 'Mejora',
        'problem': 'Problema'
    }
    return labels[type] || type
}

const getTypeIcon = (type: string) => {
    const icons: Record<string, string> = {
        'success': 'emoji_events',
        'improvement': 'trending_up',
        'problem': 'error'
    }
    return icons[type] || 'info'
}
</script>

<template>
    <div class="p-6 space-y-6">
        <div class="flex items-center justify-between">
            <BaseTitle
                title="Evaluación y Retroalimentación Estratégica"
                subtitle="Cierre de ciclo estratégico y captura de conocimiento"
            />
            <div class="flex gap-3">
                <button @click="openLessonModal" class="btn btn-outline">
                    <span class="material-symbols-outlined text-xl">description</span>
                    Registrar Lección
                </button>
                <button @click="openClosureModal" class="btn btn-primary btn-lg">
                    <span class="material-symbols-outlined text-xl">check_circle</span>
                    Cerrar Periodo
                </button>
            </div>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-4 gap-4">
            <div class="card bg-base-200 shadow-sm border-l-4 border-success">
                <div class="card-body p-4">
                    <p class="text-sm text-base-content/60">Lecciones de Éxito</p>
                    <p class="text-3xl font-bold text-success">{{ successLessons }}</p>
                </div>
            </div>
            
            <div class="card bg-base-200 shadow-sm border-l-4 border-info">
                <div class="card-body p-4">
                    <p class="text-sm text-base-content/60">Oportunidades de Mejora</p>
                    <p class="text-3xl font-bold text-info">{{ improvementLessons }}</p>
                </div>
            </div>
            
            <div class="card bg-base-200 shadow-sm border-l-4 border-error">
                <div class="card-body p-4">
                    <p class="text-sm text-base-content/60">Problemas Identificados</p>
                    <p class="text-3xl font-bold text-error">{{ problemLessons }}</p>
                </div>
            </div>
            
            <div class="card bg-base-200 shadow-sm border-l-4 border-secondary">
                <div class="card-body p-4">
                    <p class="text-sm text-base-content/60">Total Lecciones</p>
                    <p class="text-3xl font-bold">{{ totalLessons }}</p>
                </div>
            </div>
        </div>

        <!-- Period Results Card -->
        <div class="card bg-base-200 shadow-sm">
            <div class="card-body">
                <h3 class="card-title">Resultados del Periodo Actual</h3>
                <p class="text-sm text-base-content/60 mb-4">Vista consolidada del desempeño estratégico</p>
                
                <div class="grid md:grid-cols-3 gap-6">
                    <!-- Objectives Compliance -->
                    <div class="space-y-3">
                        <div class="flex items-center justify-between">
                            <span class="text-sm font-medium">Cumplimiento de Objetivos</span>
                            <span class="text-lg font-bold">{{ periodResults.averageCompliance }}%</span>
                        </div>
                        <progress
                            class="progress progress-primary w-full h-3"
                            :value="periodResults.averageCompliance"
                            max="100"
                        ></progress>
                        <p class="text-xs text-base-content/60">
                            {{ periodResults.completedObjectives }} de {{ periodResults.evaluatedObjectives }} objetivos cumplidos
                        </p>
                    </div>

                    <!-- KPIs Status -->
                    <div class="space-y-3">
                        <span class="text-sm font-medium">Estado de KPIs</span>
                        <div class="flex items-center gap-2">
                            <div class="flex-1 space-y-1">
                                <div class="flex items-center justify-between text-xs">
                                    <span class="text-success">En meta</span>
                                    <span class="font-medium">{{ periodResults.greenKPIs }}</span>
                                </div>
                                <div class="flex items-center justify-between text-xs">
                                    <span class="text-warning">Atención</span>
                                    <span class="font-medium">{{ periodResults.yellowKPIs }}</span>
                                </div>
                                <div class="flex items-center justify-between text-xs">
                                    <span class="text-error">Crítico</span>
                                    <span class="font-medium">{{ periodResults.redKPIs }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Strategic Initiatives -->
                    <div class="space-y-3">
                        <span class="text-sm font-medium">Iniciativas Estratégicas</span>
                        <div class="space-y-2">
                            <div class="flex items-center justify-between text-sm">
                                <span class="text-base-content/60">Completadas</span>
                                <span class="font-medium">{{ periodResults.completedInitiatives }}</span>
                            </div>
                            <div class="flex items-center justify-between text-sm">
                                <span class="text-base-content/60">En curso</span>
                                <span class="font-medium">{{ periodResults.ongoingInitiatives }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Lessons Learned -->
        <div class="space-y-4">
            <h2 class="text-xl font-semibold">Lecciones Aprendidas</h2>
            <div class="grid gap-4">
                <div
                    v-for="lesson in lessons"
                    :key="lesson.id"
                    class="card bg-base-200 shadow-sm border-l-4"
                    :class="getTypeColor(lesson.type)"
                >
                    <div class="card-body">
                        <div class="flex items-start justify-between mb-3">
                            <div class="space-y-2">
                                <div class="flex items-center gap-2">
                                    <span class="material-symbols-outlined text-xl">{{ getTypeIcon(lesson.type) }}</span>
                                    <h4 class="text-base font-semibold">{{ lesson.objective }}</h4>
                                </div>
                                <div class="badge badge-sm" :class="getTypeBadgeClass(lesson.type)">
                                    {{ getTypeLabel(lesson.type) }}
                                </div>
                            </div>
                        </div>
                        
                        <div class="space-y-3">
                            <div>
                                <p class="text-sm font-medium mb-1">Lección:</p>
                                <p class="text-sm text-base-content/60">{{ lesson.lesson }}</p>
                            </div>
                            
                            <div class="grid md:grid-cols-2 gap-4 pt-3 border-t border-base-300">
                                <div>
                                    <p class="text-xs font-medium mb-1">Impacto Observado:</p>
                                    <p class="text-xs text-base-content/60">{{ lesson.impact }}</p>
                                </div>
                                <div>
                                    <p class="text-xs font-medium mb-1">Acciones Recomendadas:</p>
                                    <p class="text-xs text-base-content/60">{{ lesson.actions }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modals -->
        <LessonModal />
        <PeriodClosureModal />
    </div>
</template>
