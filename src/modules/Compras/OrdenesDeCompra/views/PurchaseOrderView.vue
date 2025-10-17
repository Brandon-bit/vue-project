<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import PurchaseOrderModal from '@/modules/Compras/OrdenesDeCompra/components/PurchaseOrderModal.vue'
import usePurchaseOrderStore from '@/modules/Compras/OrdenesDeCompra/store/purchaseOrderStore'
import { usePurchaseOrderActions } from '@/modules/Compras/OrdenesDeCompra/composables/usePurchaseOrderActions'
import type { PurchaseOrderType, OrderStatsType, OrderStatusType } from '@/modules/Compras/OrdenesDeCompra/types/purchaseOrderTypes'
import { showNotification } from '@/utils/toastNotifications'

const purchaseOrderStore = usePurchaseOrderStore()
const modalStore = useModalStore()
const { getPurchaseOrders, getOrderStats, sendPurchaseOrder, closePurchaseOrder } = usePurchaseOrderActions()

const orders = ref<PurchaseOrderType[]>([])
const stats = ref<OrderStatsType>({
    emitidas: 0,
    confirmadas: 0,
    entregadas: 0,
    totalComprometido: 0
})
const isLoading = ref(false)

const getStatusBadge = (status: OrderStatusType): string => {
    const badgeMap: Record<OrderStatusType, string> = {
        'Emitida': 'badge-info',
        'Confirmada': 'badge-secondary',
        'Entregada': 'badge-warning',
        'Cerrada': 'badge-neutral'
    }
    return badgeMap[status]
}

const fetchData = async () => {
    isLoading.value = true
    try {
        const [ordersData, statsData] = await Promise.all([
            getPurchaseOrders(),
            getOrderStats()
        ])
        orders.value = ordersData
        stats.value = statsData
    } catch (error) {
        console.error('Error fetching data:', error)
    } finally {
        isLoading.value = false
    }
}

const openCreateModal = () => {
    purchaseOrderStore.reset()
    modalStore.open(purchaseOrderStore.modalId, {
        type: 'CREATE',
        title: 'Nueva Orden de Compra'
    })
}

const openDetailModal = (order: PurchaseOrderType) => {
    purchaseOrderStore.setSelectedOrder(order)
    modalStore.open(purchaseOrderStore.modalId, {
        type: 'DETAIL',
        title: `Detalle de Orden - ${order.folio}`
    })
}

const handleSendOrder = async (orderId: number) => {
    try {
        const result = await sendPurchaseOrder(orderId)
        showNotification(result.message, result.status)
        if (result.status === 'success') fetchData()
    } catch (error) {
        console.error(error)
        showNotification('Error al enviar la orden', 'error')
    }
}

const handleCloseOrder = async (orderId: number) => {
    try {
        const result = await closePurchaseOrder(orderId)
        showNotification(result.message, result.status)
        if (result.status === 'success') fetchData()
    } catch (error) {
        console.error(error)
        showNotification('Error al cerrar la orden', 'error')
    }
}

const formatCurrency = (amount: number) => {
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
                <h2 class="text-3xl font-bold">Órdenes de Compra</h2>
                <p class="text-gray-500 mt-1">
                    Gestión y seguimiento de órdenes emitidas
                </p>
            </div>
            <BaseButton text="Generar Orden de Compra" @click="openCreateModal" icon="add" />
        </div>

        <!-- Estadísticas -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div class="card bg-base-100 border border-base-content/10">
                <div class="card-body">
                    <h3 class="text-sm font-medium text-gray-500 flex items-center gap-1">
                        <span class="material-symbols-outlined text-sm">description</span>
                        Emitidas
                    </h3>
                    <div class="text-2xl font-bold text-blue-500">{{ stats.emitidas }}</div>
                </div>
            </div>
            <div class="card bg-base-100 border border-base-content/10">
                <div class="card-body">
                    <h3 class="text-sm font-medium text-gray-500 flex items-center gap-1">
                        <span class="material-symbols-outlined text-sm">check_circle</span>
                        Confirmadas
                    </h3>
                    <div class="text-2xl font-bold text-purple-500">{{ stats.confirmadas }}</div>
                </div>
            </div>
            <div class="card bg-base-100 border border-base-content/10">
                <div class="card-body">
                    <h3 class="text-sm font-medium text-gray-500 flex items-center gap-1">
                        <span class="material-symbols-outlined text-sm">inventory_2</span>
                        Entregadas
                    </h3>
                    <div class="text-2xl font-bold text-orange-500">{{ stats.entregadas }}</div>
                </div>
            </div>
            <div class="card bg-base-100 border border-base-content/10">
                <div class="card-body">
                    <h3 class="text-sm font-medium text-gray-500">Total Comprometido</h3>
                    <div class="text-2xl font-bold text-primary">
                        {{ formatCurrency(stats.totalComprometido) }}
                    </div>
                </div>
            </div>
        </div>

        <!-- Listado de Órdenes -->
        <div class="card bg-base-100 border border-base-content/10">
            <div class="card-body">
                <h3 class="card-title">Órdenes de Compra</h3>

                <div v-if="isLoading" class="space-y-3">
                    <div v-for="n in 4" :key="n" class="card bg-base-100 border border-base-content/10 animate-pulse">
                        <div class="card-body">
                            <div class="h-16 bg-gray-300 rounded"></div>
                        </div>
                    </div>
                </div>

                <div v-else class="space-y-3">
                    <div
                        v-for="order in orders"
                        :key="order.id"
                        class="card bg-base-100 border border-base-content/10 hover:shadow-md transition-shadow"
                    >
                        <div class="card-body p-4">
                            <div class="flex justify-between items-center">
                                <!-- Info de la Orden -->
                                <div class="space-y-1 flex-1">
                                    <div class="flex items-center gap-2">
                                        <h3 class="font-semibold">{{ order.folio }}</h3>
                                        <span :class="['badge', getStatusBadge(order.status)]">
                                            {{ order.status }}
                                        </span>
                                    </div>
                                    <div class="flex items-center gap-4 text-sm text-gray-500">
                                        <span>{{ order.supplier }}</span>
                                        <span>•</span>
                                        <span>{{ order.items }} items</span>
                                        <span>•</span>
                                        <span>{{ order.date }}</span>
                                    </div>
                                </div>

                                <!-- Monto y Acciones -->
                                <div class="text-right flex items-center gap-4">
                                    <div>
                                        <p class="text-xl font-bold">${{ order.total.toLocaleString() }}</p>
                                        <p class="text-xs text-gray-500">Monto total</p>
                                    </div>
                                    <div class="flex flex-col gap-2">
                                        <button @click="openDetailModal(order)" class="btn btn-outline btn-sm">
                                            Ver Detalle
                                        </button>
                                        <button
                                            v-if="order.status === 'Emitida'"
                                            @click="handleSendOrder(order.id)"
                                            class="btn btn-sm"
                                        >
                                            <span class="material-symbols-outlined text-sm">send</span>
                                            Enviar
                                        </button>
                                        <button
                                            v-if="order.status === 'Entregada'"
                                            @click="handleCloseOrder(order.id)"
                                            class="btn btn-outline btn-sm"
                                        >
                                            <span class="material-symbols-outlined text-sm">check_circle</span>
                                            Cerrar OC
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <PurchaseOrderModal :onRefresh="fetchData" />
    </div>
</template>
