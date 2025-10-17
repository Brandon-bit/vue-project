<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useModalStore } from '@/shared/stores/modal.store'
import SupplierEvaluationModal from '@/modules/Compras/EvaluacionDeProveedores/components/SupplierEvaluationModal.vue'
import useSupplierEvaluationStore from '@/modules/Compras/EvaluacionDeProveedores/store/supplierEvaluationStore'
import { useSupplierEvaluationActions } from '@/modules/Compras/EvaluacionDeProveedores/composables/useSupplierEvaluationActions'
import type { SupplierEvaluationType, EvaluationStatsType, PerformanceLevelType } from '@/modules/Compras/EvaluacionDeProveedores/types/supplierEvaluationTypes'
import { showNotification } from '@/utils/toastNotifications'

const supplierEvaluationStore = useSupplierEvaluationStore()
const modalStore = useModalStore()
const { getSuppliers, getEvaluationStats, generateComparativeReport } = useSupplierEvaluationActions()

const suppliers = ref<SupplierEvaluationType[]>([])
const stats = ref<EvaluationStatsType>({
    activeSuppliers: 0,
    averageScore: 0,
    totalOrders: 0,
    totalIncidents: 0
})
const isLoading = ref(false)

const sortedSuppliers = computed(() => {
    return [...suppliers.value].sort((a, b) => b.totalScore - a.totalScore)
})

const getPerformanceBadge = (score: number): { level: PerformanceLevelType; class: string } => {
    if (score >= 4.5) return { level: 'Excelente', class: 'badge-success' }
    if (score >= 4.0) return { level: 'Bueno', class: 'badge-info' }
    if (score >= 3.5) return { level: 'Regular', class: 'badge-warning' }
    return { level: 'Bajo', class: 'badge-error' }
}

const renderStars = (rating: number) => {
    return Math.round(rating)
}

const fetchData = async () => {
    isLoading.value = true
    try {
        const [suppliersData, statsData] = await Promise.all([
            getSuppliers(),
            getEvaluationStats()
        ])
        suppliers.value = suppliersData
        stats.value = statsData
    } catch (error) {
        console.error('Error fetching data:', error)
    } finally {
        isLoading.value = false
    }
}

const openIncidentModal = (supplier: SupplierEvaluationType) => {
    supplierEvaluationStore.setSelectedSupplier(supplier)
    modalStore.open(supplierEvaluationStore.modalId, {
        type: 'CREATE',
        title: `Registrar Incidencia - ${supplier.name}`
    })
}

const handleGenerateReport = async () => {
    try {
        const result = await generateComparativeReport()
        showNotification(result.message, result.status)
    } catch (error) {
        console.error(error)
        showNotification('Error al generar el reporte', 'error')
    }
}

onMounted(() => {
    fetchData()
})
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <div class="flex items-center justify-between">
            <div>
                <h2 class="text-3xl font-bold">Evaluación de Proveedores</h2>
                <p class="text-gray-500 mt-1">
                    Sistema de calificación y desempeño
                </p>
            </div>
            <button @click="handleGenerateReport" class="btn btn-outline">
                <span class="material-symbols-outlined">bar_chart</span>
                Generar Reporte Comparativo
            </button>
        </div>

        <!-- Estadísticas -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div class="card bg-base-100 border border-base-content/10">
                <div class="card-body">
                    <h3 class="text-sm font-medium text-gray-500">Proveedores Activos</h3>
                    <div class="text-2xl font-bold">{{ stats.activeSuppliers }}</div>
                </div>
            </div>
            <div class="card bg-base-100 border border-base-content/10">
                <div class="card-body">
                    <h3 class="text-sm font-medium text-gray-500 flex items-center gap-1">
                        <span class="material-symbols-outlined text-sm">emoji_events</span>
                        Puntuación Promedio
                    </h3>
                    <div class="flex items-center gap-2">
                        <div class="text-2xl font-bold text-yellow-500">{{ stats.averageScore }}</div>
                        <div class="flex gap-0.5">
                            <span
                                v-for="star in 5"
                                :key="star"
                                class="material-symbols-outlined text-sm"
                                :class="star <= renderStars(stats.averageScore) ? 'text-yellow-500' : 'text-gray-300'"
                            >
                                star
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card bg-base-100 border border-base-content/10">
                <div class="card-body">
                    <h3 class="text-sm font-medium text-gray-500">Total Órdenes</h3>
                    <div class="text-2xl font-bold text-primary">{{ stats.totalOrders }}</div>
                </div>
            </div>
            <div class="card bg-base-100 border border-base-content/10">
                <div class="card-body">
                    <h3 class="text-sm font-medium text-gray-500 flex items-center gap-1">
                        <span class="material-symbols-outlined text-sm">warning</span>
                        Incidencias
                    </h3>
                    <div class="text-2xl font-bold text-orange-500">{{ stats.totalIncidents }}</div>
                </div>
            </div>
        </div>

        <!-- Ranking de Proveedores -->
        <div class="card bg-base-100 border border-base-content/10">
            <div class="card-body">
                <h3 class="card-title">Ranking de Proveedores por Categoría</h3>

                <div v-if="isLoading" class="space-y-4">
                    <div v-for="n in 3" :key="n" class="card bg-base-100 border border-base-content/10 animate-pulse">
                        <div class="card-body">
                            <div class="h-20 bg-gray-300 rounded"></div>
                        </div>
                    </div>
                </div>

                <div v-else class="space-y-4">
                    <div
                        v-for="(supplier, index) in sortedSuppliers"
                        :key="supplier.id"
                        class="card bg-base-100 border border-base-content/10 hover:shadow-md transition-shadow"
                    >
                        <div class="card-body">
                            <div class="flex items-center gap-6">
                                <!-- Ranking Number -->
                                <div class="text-center min-w-[60px]">
                                    <div class="text-4xl font-bold text-gray-400">#{{ index + 1 }}</div>
                                </div>

                                <!-- Supplier Info -->
                                <div class="flex-1 space-y-3">
                                    <!-- Header -->
                                    <div class="flex justify-between items-start">
                                        <div>
                                            <div class="flex items-center gap-2 mb-1">
                                                <h3 class="text-lg font-semibold">{{ supplier.name }}</h3>
                                                <span class="badge badge-outline">{{ supplier.category }}</span>
                                                <span :class="['badge', getPerformanceBadge(supplier.totalScore).class]">
                                                    {{ getPerformanceBadge(supplier.totalScore).level }}
                                                </span>
                                            </div>
                                            <div class="flex items-center gap-4 text-sm text-gray-500">
                                                <span>{{ supplier.completedOrders }} órdenes completadas</span>
                                                <span>•</span>
                                                <span :class="supplier.incidents > 3 ? 'text-orange-500' : ''">
                                                    {{ supplier.incidents }} incidencias
                                                </span>
                                            </div>
                                        </div>
                                        <div class="text-center">
                                            <div class="flex items-center gap-2 mb-1">
                                                <div class="text-3xl font-bold text-yellow-500">{{ supplier.totalScore }}</div>
                                                <span class="material-symbols-outlined text-yellow-500 text-3xl">
                                                    star
                                                </span>
                                            </div>
                                            <p class="text-xs text-gray-500">Puntuación global</p>
                                        </div>
                                    </div>

                                    <!-- Score Breakdown -->
                                    <div class="grid grid-cols-4 gap-4">
                                        <div class="text-center p-3 bg-base-200 rounded-lg">
                                            <div class="flex items-center justify-center gap-1 mb-1">
                                                <span class="text-lg font-bold">{{ supplier.quality }}</span>
                                                <span class="material-symbols-outlined text-green-500 text-sm">
                                                    star
                                                </span>
                                            </div>
                                            <p class="text-xs text-gray-500">Calidad</p>
                                        </div>
                                        <div class="text-center p-3 bg-base-200 rounded-lg">
                                            <div class="flex items-center justify-center gap-1 mb-1">
                                                <span class="text-lg font-bold">{{ supplier.deliveryTime }}</span>
                                                <span class="material-symbols-outlined text-blue-500 text-sm">
                                                    star
                                                </span>
                                            </div>
                                            <p class="text-xs text-gray-500">Tiempo</p>
                                        </div>
                                        <div class="text-center p-3 bg-base-200 rounded-lg">
                                            <div class="flex items-center justify-center gap-1 mb-1">
                                                <span class="text-lg font-bold">{{ supplier.price }}</span>
                                                <span class="material-symbols-outlined text-orange-500 text-sm">
                                                    star
                                                </span>
                                            </div>
                                            <p class="text-xs text-gray-500">Precio</p>
                                        </div>
                                        <div class="text-center p-3 bg-base-200 rounded-lg">
                                            <div class="flex items-center justify-center gap-1 mb-1">
                                                <span class="text-lg font-bold">{{ supplier.support }}</span>
                                                <span class="material-symbols-outlined text-purple-500 text-sm">
                                                    star
                                                </span>
                                            </div>
                                            <p class="text-xs text-gray-500">Soporte</p>
                                        </div>
                                    </div>

                                    <!-- Action Buttons -->
                                    <div class="flex gap-2 pt-2">
                                        <button
                                            @click="openIncidentModal(supplier)"
                                            class="btn btn-outline btn-sm"
                                        >
                                            <span class="material-symbols-outlined text-sm">warning</span>
                                            Registrar Incidencia
                                        </button>
                                        <button class="btn btn-outline btn-sm">
                                            <span class="material-symbols-outlined text-sm">trending_up</span>
                                            Ver Tendencia
                                        </button>
                                        <button class="btn btn-outline btn-sm">
                                            Ver Historial Completo
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Cálculo Automático -->
        <div class="card bg-base-100 border border-base-content/10">
            <div class="card-body">
                <h3 class="card-title">Cálculo Automático de Puntuaciones</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="card bg-blue-50 border border-blue-200">
                        <div class="card-body">
                            <h4 class="font-semibold text-blue-700 mb-2 flex items-center gap-2">
                                <span class="material-symbols-outlined text-sm">trending_up</span>
                                Tiempo de Entrega
                            </h4>
                            <p class="text-sm text-blue-600">
                                Se calcula automáticamente comparando la fecha de entrega prometida vs. la fecha real de recepción registrada en cada OC.
                            </p>
                        </div>
                    </div>
                    <div class="card bg-green-50 border border-green-200">
                        <div class="card-body">
                            <h4 class="font-semibold text-green-700 mb-2 flex items-center gap-2">
                                <span class="material-symbols-outlined text-sm">star</span>
                                Calidad
                            </h4>
                            <p class="text-sm text-green-600">
                                Se ajusta automáticamente con base en las incidencias registradas (productos dañados, defectos, etc.).
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <SupplierEvaluationModal :onRefresh="fetchData" />
    </div>
</template>
