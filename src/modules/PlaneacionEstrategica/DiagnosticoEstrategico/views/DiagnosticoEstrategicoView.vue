<script setup lang="ts">
import { ref } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import SWOTModal from '../components/SWOTModal.vue'
import PESTELModal from '../components/PESTELModal.vue'
import RiskModal from '../components/RiskModal.vue'
import useDiagnosticStore from '../store/diagnosticStore'
import { useModalStore } from '@/shared/stores/modal.store'

const diagnosticStore = useDiagnosticStore()
const modalStore = useModalStore()

// Active tab
const activeTab = ref('foda')

// Mock data
const swotItems = ref([
    { id: 1, text: 'Equipo altamente capacitado', category: 'strengths' },
    { id: 2, text: 'Expansión al mercado internacional', category: 'opportunities' },
    { id: 3, text: 'Procesos operativos lentos', category: 'weaknesses' },
    { id: 4, text: 'Nueva competencia emergente', category: 'threats' }
])

const pestelData = ref([
    { id: 1, category: 'Political', factor: 'Estabilidad gubernamental', impact: 7, trend: 'stable' },
    { id: 2, category: 'Economic', factor: 'Crecimiento del PIB', impact: 8, trend: 'growing' },
    { id: 3, category: 'Social', factor: 'Cambios demográficos', impact: 6, trend: 'growing' },
    { id: 4, category: 'Technological', factor: 'Digitalización', impact: 9, trend: 'growing' },
    { id: 5, category: 'Environmental', factor: 'Regulaciones ambientales', impact: 7, trend: 'growing' },
    { id: 6, category: 'Legal', factor: 'Nuevas normativas', impact: 6, trend: 'stable' }
])

const risks = ref([
    { id: 1, name: 'Interrupción de cadena de suministro', probability: 7, impact: 9, strategy: 'Mitigate' },
    { id: 2, name: 'Ciberseguridad', probability: 8, impact: 8, strategy: 'Prevent' },
    { id: 3, name: 'Rotación de personal clave', probability: 5, impact: 7, strategy: 'Mitigate' }
])

// Functions
const openSWOTModal = () => {
    modalStore.open(diagnosticStore.swotModalId, 'CREATE', 'Nuevo Elemento FODA')
}

const openPESTELModal = () => {
    modalStore.open(diagnosticStore.pestelModalId, 'CREATE', 'Nuevo Factor PESTEL')
}

const openRiskModal = () => {
    modalStore.open(diagnosticStore.riskModalId, 'CREATE', 'Nuevo Riesgo')
}

const removeSWOTItem = (id: number) => {
    swotItems.value = swotItems.value.filter(item => item.id !== id)
}

const getCategoryTitle = (category: string) => {
    const titles: Record<string, string> = {
        strengths: 'Fortalezas',
        opportunities: 'Oportunidades',
        weaknesses: 'Debilidades',
        threats: 'Amenazas'
    }
    return titles[category] || category
}

const getTrendIcon = (trend: string) => {
    if (trend === 'growing') return '↗'
    if (trend === 'declining') return '↘'
    return '→'
}

const getTrendBadgeClass = (trend: string) => {
    if (trend === 'growing') return 'badge-success'
    if (trend === 'declining') return 'badge-error'
    return 'badge-ghost'
}

const getRiskColor = (probability: number, impact: number) => {
    const score = probability * impact
    if (score >= 49) return 'border-error'
    if (score >= 25) return 'border-warning'
    return 'border-success'
}

const getRiskSeverity = (probability: number, impact: number) => {
    const score = probability * impact
    if (score >= 49) return { label: 'ALTO', class: 'badge-error' }
    if (score >= 25) return { label: 'MEDIO', class: 'badge-warning' }
    return { label: 'BAJO', class: 'badge-success' }
}
</script>

<template>
    <div class="p-6 space-y-6">
        <BaseTitle
            title="Diagnóstico Estratégico"
            subtitle="Análisis del entorno y evaluación de riesgos organizacionales"
        />

        <!-- Tabs -->
        <div role="tablist" class="tabs tabs-lifted">
            <!-- Tab FODA -->
            <input
                type="radio"
                name="diagnostico_tabs"
                role="tab"
                class="tab"
                aria-label="Análisis FODA"
                :checked="activeTab === 'foda'"
                @click="activeTab = 'foda'"
            />
            <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
                <div class="flex justify-between items-center mb-6">
                    <p class="text-sm text-base-content/60">Matriz interactiva de análisis FODA</p>
                    <button @click="openSWOTModal" class="btn btn-primary btn-sm">
                        <span class="material-symbols-outlined text-lg">add</span>
                        Agregar Elemento
                    </button>
                </div>

                <div class="grid grid-cols-2 gap-6">
                    <div
                        v-for="category in ['strengths', 'opportunities', 'weaknesses', 'threats']"
                        :key="category"
                        class="card bg-base-200 shadow-sm"
                        :class="category === 'strengths' || category === 'opportunities' ? 'border-l-4 border-l-success' : 'border-l-4 border-l-error'"
                    >
                        <div class="card-body">
                            <h3 class="card-title text-lg">{{ getCategoryTitle(category) }}</h3>
                            <div class="space-y-3 mt-4">
                                <div
                                    v-for="item in swotItems.filter(i => i.category === category)"
                                    :key="item.id"
                                    class="group relative rounded-lg border bg-base-100 p-3 hover:shadow-md transition-shadow"
                                >
                                    <p class="text-sm pr-6">{{ item.text }}</p>
                                    <button
                                        @click="removeSWOTItem(item.id)"
                                        class="btn btn-ghost btn-xs absolute top-2 right-2 opacity-0 group-hover:opacity-100"
                                    >
                                        <span class="material-symbols-outlined text-base">close</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Tab PESTEL -->
            <input
                type="radio"
                name="diagnostico_tabs"
                role="tab"
                class="tab"
                aria-label="Análisis PESTEL"
                :checked="activeTab === 'pestel'"
                @click="activeTab = 'pestel'"
            />
            <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
                <div class="flex justify-between items-center mb-6">
                    <p class="text-sm text-base-content/60">Análisis del entorno macro</p>
                    <button @click="openPESTELModal" class="btn btn-primary btn-sm">
                        <span class="material-symbols-outlined text-lg">add</span>
                        Agregar Factor
                    </button>
                </div>

                <div class="grid gap-4">
                    <div
                        v-for="item in pestelData"
                        :key="item.id"
                        class="card bg-base-200 shadow-sm"
                    >
                        <div class="card-body">
                            <div class="flex items-center justify-between">
                                <h3 class="card-title text-base">{{ item.category }}</h3>
                                <div class="badge" :class="getTrendBadgeClass(item.trend)">
                                    {{ getTrendIcon(item.trend) }} {{ item.trend }}
                                </div>
                            </div>
                            <p class="text-sm text-base-content/60">{{ item.factor }}</p>
                            <div class="space-y-2 mt-4">
                                <div class="flex items-center justify-between text-sm">
                                    <span class="text-base-content/60">Impacto</span>
                                    <span class="font-medium">{{ item.impact }}/10</span>
                                </div>
                                <progress
                                    class="progress progress-primary w-full"
                                    :value="item.impact * 10"
                                    max="100"
                                ></progress>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Tab Riesgos -->
            <input
                type="radio"
                name="diagnostico_tabs"
                role="tab"
                class="tab"
                aria-label="Mapa de Riesgos"
                :checked="activeTab === 'riesgos'"
                @click="activeTab = 'riesgos'"
            />
            <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
                <div class="flex justify-between items-center mb-6">
                    <p class="text-sm text-base-content/60">Matriz de probabilidad e impacto</p>
                    <button @click="openRiskModal" class="btn btn-primary btn-sm">
                        <span class="material-symbols-outlined text-lg">add</span>
                        Agregar Riesgo
                    </button>
                </div>

                <div class="grid gap-4">
                    <div
                        v-for="risk in risks"
                        :key="risk.id"
                        class="card bg-base-200 shadow-sm border-l-4"
                        :class="getRiskColor(risk.probability, risk.impact)"
                    >
                        <div class="card-body">
                            <div class="flex items-center justify-between">
                                <h3 class="card-title text-base">{{ risk.name }}</h3>
                                <div class="flex gap-2">
                                    <div class="badge badge-outline">{{ risk.strategy }}</div>
                                    <div class="badge" :class="getRiskSeverity(risk.probability, risk.impact).class">
                                        {{ getRiskSeverity(risk.probability, risk.impact).label }}
                                    </div>
                                </div>
                            </div>
                            <div class="grid grid-cols-2 gap-4 mt-4">
                                <div class="space-y-1">
                                    <p class="text-xs text-base-content/60">Probabilidad</p>
                                    <div class="flex items-center gap-2">
                                        <progress
                                            class="progress progress-primary flex-1"
                                            :value="risk.probability * 10"
                                            max="100"
                                        ></progress>
                                        <span class="text-sm font-medium">{{ risk.probability }}/10</span>
                                    </div>
                                </div>
                                <div class="space-y-1">
                                    <p class="text-xs text-base-content/60">Impacto</p>
                                    <div class="flex items-center gap-2">
                                        <progress
                                            class="progress progress-error flex-1"
                                            :value="risk.impact * 10"
                                            max="100"
                                        ></progress>
                                        <span class="text-sm font-medium">{{ risk.impact }}/10</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Leyenda -->
                <div class="card bg-base-200/50 shadow-sm mt-6">
                    <div class="card-body">
                        <h4 class="text-sm font-semibold">Matriz de Riesgos</h4>
                        <div class="grid grid-cols-3 gap-2 text-xs text-center mt-3">
                            <div class="rounded bg-success/20 p-2 border border-success/50">Bajo</div>
                            <div class="rounded bg-warning/20 p-2 border border-warning/50">Medio</div>
                            <div class="rounded bg-error/20 p-2 border border-error/50">Alto</div>
                        </div>
                        <p class="mt-3 text-xs text-base-content/60">
                            Los riesgos en zona roja (score ≥ 49) requieren atención inmediata
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modals -->
        <SWOTModal />
        <PESTELModal />
        <RiskModal />
    </div>
</template>
