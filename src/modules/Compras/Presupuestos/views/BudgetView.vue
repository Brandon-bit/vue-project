<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import BudgetModal from '@/modules/Compras/Presupuestos/components/BudgetModal.vue'
import useBudgetStore from '@/modules/Compras/Presupuestos/store/budgetStore'
import { useBudgetActions } from '@/modules/Compras/Presupuestos/composables/useBudgetActions'
import type { BudgetType, BudgetStatsType } from '@/modules/Compras/Presupuestos/types/budgetTypes'
import { showNotification } from '@/utils/toastNotifications'

const budgetStore = useBudgetStore()
const modalStore = useModalStore()
const { getBudgets, getBudgetStats, generateReport } = useBudgetActions()

const budgets = ref<BudgetType[]>([])
const stats = ref<BudgetStatsType>({
    totalAsignado: 0,
    totalGastado: 0,
    totalComprometido: 0,
    totalDisponible: 0,
    porcentajeEjecutado: 0,
    porcentajeComprometido: 0,
    porcentajeDisponible: 0
})
const isLoading = ref(false)

const fetchData = async () => {
    isLoading.value = true
    try {
        const [budgetsData, statsData] = await Promise.all([
            getBudgets(),
            getBudgetStats()
        ])
        budgets.value = budgetsData
        stats.value = statsData
    } catch (error) {
        console.error('Error fetching data:', error)
    } finally {
        isLoading.value = false
    }
}

const openCreateModal = () => {
    budgetStore.reset()
    modalStore.open(budgetStore.modalId, {
        type: 'CREATE',
        title: 'Nuevo Presupuesto'
    })
}

const openDetailModal = (budget: BudgetType) => {
    budgetStore.setSelectedBudget(budget)
    modalStore.open(budgetStore.modalId, {
        type: 'DETAIL',
        title: `Detalle de Presupuesto - ${budget.proyecto}`
    })
}

const handleGenerateReport = async (budgetId: number) => {
    try {
        const result = await generateReport(budgetId)
        showNotification(result.message, result.status)
    } catch (error) {
        console.error(error)
        showNotification('Error al generar el reporte', 'error')
    }
}

const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
        return `$${(amount / 1000000).toFixed(1)}M`
    }
    if (amount >= 1000) {
        return `$${(amount / 1000).toFixed(0)}K`
    }
    return `$${amount.toLocaleString()}`
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
                <h2 class="text-3xl font-bold">Presupuestos de Compras</h2>
                <p class="text-gray-500 mt-1">
                    Control y seguimiento de presupuesto vs. gasto
                </p>
            </div>
            <BaseButton text="Crear Presupuesto" @click="openCreateModal" icon="add" />
        </div>

        <!-- Estadísticas Generales -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div class="card bg-base-100 border border-base-content/10">
                <div class="card-body">
                    <h3 class="text-sm font-medium text-gray-500 flex items-center gap-1">
                        <span class="material-symbols-outlined text-sm">account_balance</span>
                        Total Asignado
                    </h3>
                    <div class="text-2xl font-bold">{{ formatCurrency(stats.totalAsignado) }}</div>
                    <p class="text-xs text-gray-500">Presupuesto total</p>
                </div>
            </div>
            <div class="card bg-base-100 border border-base-content/10">
                <div class="card-body">
                    <h3 class="text-sm font-medium text-gray-500 flex items-center gap-1">
                        <span class="material-symbols-outlined text-sm">payments</span>
                        Gastado
                    </h3>
                    <div class="text-2xl font-bold text-blue-500">{{ formatCurrency(stats.totalGastado) }}</div>
                    <p class="text-xs text-gray-500">{{ stats.porcentajeEjecutado.toFixed(1) }}% ejecutado</p>
                </div>
            </div>
            <div class="card bg-base-100 border border-base-content/10">
                <div class="card-body">
                    <h3 class="text-sm font-medium text-gray-500 flex items-center gap-1">
                        <span class="material-symbols-outlined text-sm">pending_actions</span>
                        Comprometido
                    </h3>
                    <div class="text-2xl font-bold text-orange-500">{{ formatCurrency(stats.totalComprometido) }}</div>
                    <p class="text-xs text-gray-500">{{ stats.porcentajeComprometido.toFixed(1) }}% en OCs</p>
                </div>
            </div>
            <div class="card bg-base-100 border border-base-content/10">
                <div class="card-body">
                    <h3 class="text-sm font-medium text-gray-500 flex items-center gap-1">
                        <span class="material-symbols-outlined text-sm">savings</span>
                        Disponible
                    </h3>
                    <div class="text-2xl font-bold text-green-500">{{ formatCurrency(stats.totalDisponible) }}</div>
                    <p class="text-xs text-gray-500">{{ stats.porcentajeDisponible.toFixed(1) }}% libre</p>
                </div>
            </div>
        </div>

        <!-- Listado de Presupuestos -->
        <div class="card bg-base-100 border border-base-content/10">
            <div class="card-body">
                <h3 class="card-title">Detalle por Área/Proyecto</h3>

                <div v-if="isLoading" class="space-y-4">
                    <div v-for="n in 4" :key="n" class="card bg-base-100 border border-base-content/10 animate-pulse">
                        <div class="card-body">
                            <div class="h-24 bg-gray-300 rounded"></div>
                        </div>
                    </div>
                </div>

                <div v-else class="space-y-6">
                    <div
                        v-for="budget in budgets"
                        :key="budget.id"
                        class="space-y-3 pb-6 border-b border-base-content/10 last:border-0"
                    >
                        <!-- Header del Presupuesto -->
                        <div class="flex justify-between items-start">
                            <div>
                                <div class="flex items-center gap-2 mb-1">
                                    <h3 class="font-semibold text-lg">{{ budget.proyecto }}</h3>
                                    <span class="badge badge-outline">{{ budget.area }}</span>
                                    <span v-if="budget.excedido" class="badge badge-error gap-1">
                                        <span class="material-symbols-outlined text-xs">error</span>
                                        Excedido
                                    </span>
                                </div>
                                <p class="text-sm text-gray-500">
                                    Asignado: ${{ budget.asignado.toLocaleString() }} • {{ budget.periodo }}
                                </p>
                            </div>
                            <div class="text-right">
                                <div :class="['text-lg font-bold', budget.excedido ? 'text-red-500' : 'text-green-500']">
                                    ${{ budget.disponible.toLocaleString() }}
                                </div>
                                <p class="text-xs text-gray-500">Disponible</p>
                            </div>
                        </div>

                        <!-- Barra de Progreso -->
                        <div class="space-y-2">
                            <div class="relative h-8 w-full bg-base-200 rounded-full overflow-hidden">
                                <!-- Gastado -->
                                <div
                                    class="absolute h-full bg-blue-500 transition-all"
                                    :style="{ width: `${Math.min(budget.porcentajeGastado, 100)}%` }"
                                />
                                <!-- Comprometido -->
                                <div
                                    class="absolute h-full bg-orange-500 transition-all"
                                    :style="{
                                        left: `${Math.min(budget.porcentajeGastado, 100)}%`,
                                        width: `${Math.min(budget.porcentajeComprometido, 100 - budget.porcentajeGastado)}%`
                                    }"
                                />
                                <!-- Excedido -->
                                <div
                                    v-if="budget.porcentajeTotal > 100"
                                    class="absolute h-full bg-red-500 transition-all opacity-30"
                                    style="width: 100%"
                                />
                            </div>

                            <div class="flex justify-between text-xs">
                                <div class="flex gap-4">
                                    <div class="flex items-center gap-1">
                                        <div class="h-3 w-3 rounded-full bg-blue-500" />
                                        <span>Gastado: ${{ budget.gastado.toLocaleString() }}</span>
                                        <span class="text-gray-500">({{ budget.porcentajeGastado.toFixed(1) }}%)</span>
                                    </div>
                                    <div class="flex items-center gap-1">
                                        <div class="h-3 w-3 rounded-full bg-orange-500" />
                                        <span>Comprometido: ${{ budget.comprometido.toLocaleString() }}</span>
                                        <span class="text-gray-500">({{ budget.porcentajeComprometido.toFixed(1) }}%)</span>
                                    </div>
                                </div>
                                <div class="flex items-center gap-1">
                                    <span :class="['material-symbols-outlined text-xs', budget.porcentajeTotal > 90 ? 'text-red-500' : 'text-green-500']">
                                        {{ budget.porcentajeTotal > 90 ? 'trending_up' : 'trending_down' }}
                                    </span>
                                    <span :class="[budget.porcentajeTotal > 90 ? 'text-red-500' : 'text-green-500']">
                                        {{ budget.porcentajeTotal.toFixed(1) }}% utilizado
                                    </span>
                                </div>
                            </div>
                        </div>

                        <!-- Acciones -->
                        <div class="flex gap-2">
                            <button @click="openDetailModal(budget)" class="btn btn-outline btn-sm">
                                <span class="material-symbols-outlined text-sm">visibility</span>
                                Ver Detalle
                            </button>
                            <button @click="handleGenerateReport(budget.id)" class="btn btn-outline btn-sm">
                                <span class="material-symbols-outlined text-sm">description</span>
                                Generar Reporte
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <BudgetModal :onRefresh="fetchData" />
    </div>
</template>
