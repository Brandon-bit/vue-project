<script setup lang="ts">
import { computed } from 'vue'
import useBudgetStore from '@/modules/Compras/Presupuestos/store/budgetStore'

const budgetStore = useBudgetStore()

const budget = computed(() => budgetStore.selectedBudget)

const getStatusBadge = (excedido: boolean, porcentajeTotal: number): string => {
    if (excedido) return 'badge-error'
    if (porcentajeTotal > 90) return 'badge-warning'
    if (porcentajeTotal > 70) return 'badge-info'
    return 'badge-success'
}

const getStatusText = (excedido: boolean, porcentajeTotal: number): string => {
    if (excedido) return 'Excedido'
    if (porcentajeTotal > 90) return 'Crítico'
    if (porcentajeTotal > 70) return 'En Progreso'
    return 'Saludable'
}
</script>

<template>
    <div v-if="budget" class="space-y-4">
        <!-- Header con Proyecto y Estado -->
        <div class="card bg-base-200">
            <div class="card-body">
                <div class="flex justify-between items-center">
                    <div>
                        <h4 class="text-2xl font-bold">{{ budget.proyecto }}</h4>
                        <p class="text-sm text-gray-500 flex items-center gap-2">
                            <span class="badge badge-outline">{{ budget.area }}</span>
                            <span>{{ budget.periodo }}</span>
                        </p>
                    </div>
                    <span :class="['badge badge-lg', getStatusBadge(budget.excedido, budget.porcentajeTotal)]">
                        {{ getStatusText(budget.excedido, budget.porcentajeTotal) }}
                    </span>
                </div>
            </div>
        </div>

        <!-- Resumen Financiero -->
        <div class="card bg-base-100 border border-base-content/10">
            <div class="card-body">
                <h4 class="font-semibold mb-3 flex items-center gap-2">
                    <span class="material-symbols-outlined">account_balance</span>
                    Resumen Financiero
                </h4>
                <div class="grid grid-cols-2 gap-4">
                    <div class="card bg-base-200">
                        <div class="card-body p-4">
                            <p class="text-sm text-gray-500">Monto Asignado</p>
                            <p class="text-2xl font-bold">${{ budget.asignado.toLocaleString() }}</p>
                        </div>
                    </div>
                    <div class="card bg-blue-50">
                        <div class="card-body p-4">
                            <p class="text-sm text-gray-500">Gastado</p>
                            <p class="text-2xl font-bold text-blue-500">${{ budget.gastado.toLocaleString() }}</p>
                            <p class="text-xs text-gray-500">{{ budget.porcentajeGastado.toFixed(1) }}%</p>
                        </div>
                    </div>
                    <div class="card bg-orange-50">
                        <div class="card-body p-4">
                            <p class="text-sm text-gray-500">Comprometido</p>
                            <p class="text-2xl font-bold text-orange-500">${{ budget.comprometido.toLocaleString() }}</p>
                            <p class="text-xs text-gray-500">{{ budget.porcentajeComprometido.toFixed(1) }}%</p>
                        </div>
                    </div>
                    <div :class="['card', budget.disponible < 0 ? 'bg-red-50' : 'bg-green-50']">
                        <div class="card-body p-4">
                            <p class="text-sm text-gray-500">Disponible</p>
                            <p :class="['text-2xl font-bold', budget.disponible < 0 ? 'text-red-500' : 'text-green-500']">
                                ${{ budget.disponible.toLocaleString() }}
                            </p>
                            <p class="text-xs text-gray-500">
                                {{ (100 - budget.porcentajeTotal).toFixed(1) }}%
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Barra de Progreso Visual -->
        <div class="card bg-base-100 border border-base-content/10">
            <div class="card-body">
                <h4 class="font-semibold mb-3 flex items-center gap-2">
                    <span class="material-symbols-outlined">trending_up</span>
                    Ejecución Presupuestal
                </h4>
                
                <div class="space-y-2">
                    <div class="relative h-10 w-full bg-base-200 rounded-full overflow-hidden">
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

                    <div class="flex justify-between text-sm">
                        <div class="flex gap-4">
                            <div class="flex items-center gap-2">
                                <div class="h-4 w-4 rounded-full bg-blue-500" />
                                <span>Gastado: {{ budget.porcentajeGastado.toFixed(1) }}%</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <div class="h-4 w-4 rounded-full bg-orange-500" />
                                <span>Comprometido: {{ budget.porcentajeComprometido.toFixed(1) }}%</span>
                            </div>
                        </div>
                        <div :class="['font-semibold', budget.porcentajeTotal > 90 ? 'text-red-500' : 'text-green-500']">
                            {{ budget.porcentajeTotal.toFixed(1) }}% utilizado
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Información del Proyecto -->
        <div class="card bg-base-100 border border-base-content/10">
            <div class="card-body">
                <h4 class="font-semibold mb-3 flex items-center gap-2">
                    <span class="material-symbols-outlined">info</span>
                    Información del Proyecto
                </h4>
                <div class="space-y-2 text-sm">
                    <div class="flex justify-between">
                        <span class="text-gray-500">Área/Departamento:</span>
                        <span class="font-semibold">{{ budget.area }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-500">Proyecto:</span>
                        <span class="font-semibold">{{ budget.proyecto }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-500">Periodo:</span>
                        <span class="font-semibold">{{ budget.periodo }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-500">Fecha de Creación:</span>
                        <span class="font-semibold">{{ new Date(budget.fechaCreacion).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' }) }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-500">Última Actualización:</span>
                        <span class="font-semibold">{{ new Date(budget.fechaActualizacion).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' }) }}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Alertas según Estado -->
        <div v-if="budget.excedido" class="alert alert-error">
            <span class="material-symbols-outlined">error</span>
            <div>
                <p class="font-semibold">Presupuesto Excedido</p>
                <p class="text-sm">Este presupuesto ha superado el monto asignado. Se recomienda revisar los gastos y ajustar el presupuesto.</p>
            </div>
        </div>
        <div v-else-if="budget.porcentajeTotal > 90" class="alert alert-warning">
            <span class="material-symbols-outlined">warning</span>
            <div>
                <p class="font-semibold">Presupuesto Crítico</p>
                <p class="text-sm">El presupuesto está cerca de agotarse. Solo queda {{ (100 - budget.porcentajeTotal).toFixed(1) }}% disponible.</p>
            </div>
        </div>
        <div v-else-if="budget.porcentajeTotal > 70" class="alert alert-info">
            <span class="material-symbols-outlined">info</span>
            <div>
                <p class="font-semibold">Presupuesto en Progreso</p>
                <p class="text-sm">El presupuesto está siendo ejecutado normalmente. Quedan ${{ budget.disponible.toLocaleString() }} disponibles.</p>
            </div>
        </div>
        <div v-else class="alert alert-success">
            <span class="material-symbols-outlined">check_circle</span>
            <div>
                <p class="font-semibold">Presupuesto Saludable</p>
                <p class="text-sm">El presupuesto tiene una ejecución adecuada con {{ (100 - budget.porcentajeTotal).toFixed(1) }}% disponible.</p>
            </div>
        </div>

        <!-- Análisis y Recomendaciones -->
        <div class="card bg-base-100 border border-base-content/10">
            <div class="card-body">
                <h4 class="font-semibold mb-3 flex items-center gap-2">
                    <span class="material-symbols-outlined">analytics</span>
                    Análisis y Recomendaciones
                </h4>
                <div class="space-y-3 text-sm">
                    <div class="flex items-start gap-2">
                        <span class="material-symbols-outlined text-blue-500">insights</span>
                        <div>
                            <p class="font-semibold">Velocidad de Gasto</p>
                            <p class="text-gray-500">
                                Se ha gastado el {{ budget.porcentajeGastado.toFixed(1) }}% del presupuesto asignado.
                            </p>
                        </div>
                    </div>
                    <div class="flex items-start gap-2">
                        <span class="material-symbols-outlined text-orange-500">pending_actions</span>
                        <div>
                            <p class="font-semibold">Compromisos Pendientes</p>
                            <p class="text-gray-500">
                                Hay ${{ budget.comprometido.toLocaleString() }} comprometidos en órdenes de compra pendientes.
                            </p>
                        </div>
                    </div>
                    <div class="flex items-start gap-2">
                        <span :class="['material-symbols-outlined', budget.disponible < 0 ? 'text-red-500' : 'text-green-500']">
                            {{ budget.disponible < 0 ? 'trending_down' : 'trending_up' }}
                        </span>
                        <div>
                            <p class="font-semibold">Saldo Disponible</p>
                            <p class="text-gray-500">
                                {{ budget.disponible < 0 ? 'Déficit de' : 'Quedan' }} 
                                ${{ Math.abs(budget.disponible).toLocaleString() }} 
                                {{ budget.disponible < 0 ? 'por cubrir' : 'disponibles para nuevas compras' }}.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
