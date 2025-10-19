<script setup lang="ts">
import { ref } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import ObjectiveModal from '../components/ObjectiveModal.vue'
import useStrategyStore from '../store/strategyStore'
import { useModalStore } from '@/shared/stores/modal.store'
import { showNotification } from '@/utils/toastNotifications'

const strategyStore = useStrategyStore()
const modalStore = useModalStore()

// Active tab
const activeTab = ref('identidad')

// Identity data
const identity = ref({
    mission: 'Proporcionar soluciones innovadoras que transformen la manera en que las empresas operan, impulsando su crecimiento sostenible.',
    vision: 'Ser líderes globales en transformación digital empresarial para 2030, reconocidos por nuestra excelencia e innovación.',
    values: 'Integridad, Innovación, Excelencia, Colaboración, Sostenibilidad'
})

// Objectives data
const objectives = ref([
    {
        id: 1,
        name: 'Incrementar la rentabilidad',
        description: 'Aumentar el margen EBITDA en 5 puntos porcentuales',
        specific: true,
        measurable: true,
        achievable: true,
        relevant: true,
        timeBound: true,
        perspective: 'Financial',
        kpi: 'Margen EBITDA',
        target: '25%',
        deadline: 'Diciembre 2025'
    }
])

// Functions
const openObjectiveModal = () => {
    modalStore.open(strategyStore.objectiveModalId, 'CREATE', 'Constructor de Objetivo SMART')
}

const handleSaveIdentity = () => {
    strategyStore.setEditingIdentity(false)
    showNotification('Identidad actualizada correctamente', 'success')
}

const getSMARTScore = (obj: any) => {
    return [obj.specific, obj.measurable, obj.achievable, obj.relevant, obj.timeBound].filter(Boolean).length
}

const getPerspectiveColor = (perspective: string) => {
    const colors: Record<string, string> = {
        'Financial': 'border-success',
        'Customer': 'border-info',
        'Process': 'border-warning',
        'Learning': 'border-secondary'
    }
    return colors[perspective] || 'border-base-300'
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
</script>

<template>
    <div class="p-6 space-y-6">
        <BaseTitle
            title="Definición de Estrategia"
            subtitle="Identidad corporativa y objetivos estratégicos"
        />

        <!-- Tabs -->
        <div role="tablist" class="tabs tabs-lifted">
            <!-- Tab Identidad Corporativa -->
            <input
                type="radio"
                name="strategy_tabs"
                role="tab"
                class="tab"
                aria-label="Identidad Corporativa"
                :checked="activeTab === 'identidad'"
                @click="activeTab = 'identidad'"
            />
            <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
                <div class="flex justify-end mb-6">
                    <button
                        v-if="strategyStore.isEditingIdentity"
                        @click="handleSaveIdentity"
                        class="btn btn-primary btn-sm"
                    >
                        <span class="material-symbols-outlined text-lg">save</span>
                        Guardar Cambios
                    </button>
                    <button
                        v-else
                        @click="strategyStore.setEditingIdentity(true)"
                        class="btn btn-outline btn-sm"
                    >
                        Editar
                    </button>
                </div>

                <div class="grid gap-6">
                    <!-- Misión -->
                    <div class="card bg-base-200 shadow-sm border-l-4 border-l-info">
                        <div class="card-body">
                            <div class="flex items-center gap-2 mb-2">
                                <span class="material-symbols-outlined text-info">flag</span>
                                <h3 class="card-title text-lg">Misión</h3>
                            </div>
                            <p class="text-sm text-base-content/60 mb-3">¿Cuál es nuestro propósito?</p>
                            <textarea
                                v-if="strategyStore.isEditingIdentity"
                                v-model="identity.mission"
                                rows="4"
                                class="textarea textarea-bordered resize-none"
                            ></textarea>
                            <p v-else class="text-sm leading-relaxed">{{ identity.mission }}</p>
                        </div>
                    </div>

                    <!-- Visión -->
                    <div class="card bg-base-200 shadow-sm border-l-4 border-l-secondary">
                        <div class="card-body">
                            <div class="flex items-center gap-2 mb-2">
                                <span class="material-symbols-outlined text-secondary">visibility</span>
                                <h3 class="card-title text-lg">Visión</h3>
                            </div>
                            <p class="text-sm text-base-content/60 mb-3">¿Hacia dónde vamos?</p>
                            <textarea
                                v-if="strategyStore.isEditingIdentity"
                                v-model="identity.vision"
                                rows="4"
                                class="textarea textarea-bordered resize-none"
                            ></textarea>
                            <p v-else class="text-sm leading-relaxed">{{ identity.vision }}</p>
                        </div>
                    </div>

                    <!-- Valores -->
                    <div class="card bg-base-200 shadow-sm border-l-4 border-l-success">
                        <div class="card-body">
                            <div class="flex items-center gap-2 mb-2">
                                <span class="material-symbols-outlined text-success">favorite</span>
                                <h3 class="card-title text-lg">Valores</h3>
                            </div>
                            <p class="text-sm text-base-content/60 mb-3">¿Qué nos define?</p>
                            <textarea
                                v-if="strategyStore.isEditingIdentity"
                                v-model="identity.values"
                                rows="3"
                                class="textarea textarea-bordered resize-none"
                            ></textarea>
                            <div v-else class="flex flex-wrap gap-2">
                                <div
                                    v-for="(value, index) in identity.values.split(',')"
                                    :key="index"
                                    class="badge badge-lg"
                                >
                                    {{ value.trim() }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Tab Objetivos Estratégicos -->
            <input
                type="radio"
                name="strategy_tabs"
                role="tab"
                class="tab"
                aria-label="Objetivos Estratégicos"
                :checked="activeTab === 'objetivos'"
                @click="activeTab = 'objetivos'"
            />
            <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
                <div class="flex justify-between items-center mb-6">
                    <p class="text-sm text-base-content/60">Constructor de objetivos SMART</p>
                    <button @click="openObjectiveModal" class="btn btn-primary btn-sm">
                        <span class="material-symbols-outlined text-lg">add</span>
                        Nuevo Objetivo
                    </button>
                </div>

                <div class="grid gap-4">
                    <div
                        v-for="objective in objectives"
                        :key="objective.id"
                        class="card bg-base-200 shadow-sm border-l-4"
                        :class="getPerspectiveColor(objective.perspective)"
                    >
                        <div class="card-body">
                            <div class="flex items-center justify-between">
                                <div class="space-y-1 flex-1">
                                    <h3 class="card-title text-lg">{{ objective.name }}</h3>
                                    <p class="text-sm text-base-content/60">{{ objective.description }}</p>
                                </div>
                                <div class="badge badge-outline">{{ getPerspectiveLabel(objective.perspective) }}</div>
                            </div>

                            <div class="grid grid-cols-3 gap-4 text-sm mt-4">
                                <div>
                                    <p class="text-xs text-base-content/60">KPI</p>
                                    <p class="font-medium">{{ objective.kpi }}</p>
                                </div>
                                <div>
                                    <p class="text-xs text-base-content/60">Meta</p>
                                    <p class="font-medium">{{ objective.target }}</p>
                                </div>
                                <div>
                                    <p class="text-xs text-base-content/60">Plazo</p>
                                    <p class="font-medium">{{ objective.deadline }}</p>
                                </div>
                            </div>

                            <div class="flex items-center gap-2 mt-4">
                                <span class="text-xs text-base-content/60">SMART Score:</span>
                                <div class="flex gap-1">
                                    <div
                                        v-for="(criteria, index) in [
                                            objective.specific,
                                            objective.measurable,
                                            objective.achievable,
                                            objective.relevant,
                                            objective.timeBound
                                        ]"
                                        :key="index"
                                        class="h-2 w-8 rounded"
                                        :class="criteria ? 'bg-success' : 'bg-base-300'"
                                    ></div>
                                </div>
                                <span class="text-xs font-medium">{{ getSMARTScore(objective) }}/5</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <ObjectiveModal />
    </div>
</template>
