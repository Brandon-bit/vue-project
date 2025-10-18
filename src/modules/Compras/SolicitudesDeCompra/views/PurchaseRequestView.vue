<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import PurchaseRequestModal from '@/modules/Compras/SolicitudesDeCompra/components/PurchaseRequestModal.vue'
import usePurchaseRequestStore from '@/modules/Compras/SolicitudesDeCompra/store/purchaseRequestStore'
import { usePurchaseRequestActions } from '@/modules/Compras/SolicitudesDeCompra/composables/usePurchaseRequestActions'
import type { PurchaseRequestType, PurchaseRequestStatsType } from '@/modules/Compras/SolicitudesDeCompra/types/purchaseRequestTypes'

const requestStore = usePurchaseRequestStore()
const modalStore = useModalStore()
const { getPurchaseRequests, getPurchaseRequestStats } = usePurchaseRequestActions()

const requests = ref<PurchaseRequestType[]>([])
const stats = ref<PurchaseRequestStatsType>({
    total: 0,
    pendientes: 0,
    aprobadas: 0,
    rechazadas: 0
})
const isLoading = ref(false)

const getStatusBadge = (status: string): string => {
    const badgeMap: Record<string, string> = {
        'Pendiente': 'badge-warning',
        'Aprobada': 'badge-success',
        'Rechazada': 'badge-error',
        'En Revisión': 'badge-info'
    }
    return badgeMap[status] || 'badge-neutral'
}

const getStatusIcon = (status: string): string => {
    const iconMap: Record<string, string> = {
        'Pendiente': 'schedule',
        'Aprobada': 'check_circle',
        'Rechazada': 'cancel',
        'En Revisión': 'pending'
    }
    return iconMap[status] || 'help'
}

const fetchData = async () => {
    isLoading.value = true
    try {
        const [requestsData, statsData] = await Promise.all([
            getPurchaseRequests(),
            getPurchaseRequestStats()
        ])
        requests.value = requestsData
        stats.value = statsData
    } catch (error) {
        console.error('Error fetching data:', error)
    } finally {
        isLoading.value = false
    }
}

const openCreateModal = () => {
    requestStore.reset()
    modalStore.open(requestStore.modalId, {
        type: 'CREATE',
        title: 'Nueva Solicitud de Compra'
    })
}

const openDetailModal = (request: PurchaseRequestType) => {
    requestStore.setSelectedRequest(request)
    modalStore.open(requestStore.modalId, {
        type: 'DETAIL',
        title: `Detalle de Solicitud - ${request.folio}`
    })
}

onMounted(() => {
    fetchData()
})
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <BaseTitle 
            title="Solicitudes de Compra" 
            subtitle="Gestión de solicitudes y flujo de aprobación"
        />
        <div class="flex items-center justify-end">
            <BaseButton text="Nueva Solicitud" @click="openCreateModal" icon="add" />
        </div>

        <!-- Estadísticas -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div class="card bg-base-100 border border-base-content/10">
                <div class="card-body">
                    <h3 class="text-sm font-medium text-gray-500 flex items-center gap-1">
                        <span class="material-symbols-outlined text-sm">description</span>
                        Total Solicitudes
                    </h3>
                    <div class="text-2xl font-bold">{{ stats.total }}</div>
                </div>
            </div>
            <div class="card bg-base-100 border border-base-content/10">
                <div class="card-body">
                    <h3 class="text-sm font-medium text-gray-500 flex items-center gap-1">
                        <span class="material-symbols-outlined text-sm">schedule</span>
                        Pendientes
                    </h3>
                    <div class="text-2xl font-bold text-yellow-500">{{ stats.pendientes }}</div>
                </div>
            </div>
            <div class="card bg-base-100 border border-base-content/10">
                <div class="card-body">
                    <h3 class="text-sm font-medium text-gray-500 flex items-center gap-1">
                        <span class="material-symbols-outlined text-sm">check_circle</span>
                        Aprobadas
                    </h3>
                    <div class="text-2xl font-bold text-green-500">{{ stats.aprobadas }}</div>
                </div>
            </div>
            <div class="card bg-base-100 border border-base-content/10">
                <div class="card-body">
                    <h3 class="text-sm font-medium text-gray-500 flex items-center gap-1">
                        <span class="material-symbols-outlined text-sm">cancel</span>
                        Rechazadas
                    </h3>
                    <div class="text-2xl font-bold text-red-500">{{ stats.rechazadas }}</div>
                </div>
            </div>
        </div>

        <!-- Listado de Solicitudes -->
        <div class="card bg-base-100 border border-base-content/10">
            <div class="card-body">
                <h3 class="card-title">Mis Solicitudes</h3>

                <div v-if="isLoading" class="space-y-3">
                    <div v-for="n in 4" :key="n" class="card bg-base-100 border border-base-content/10 animate-pulse">
                        <div class="card-body">
                            <div class="h-20 bg-gray-300 rounded"></div>
                        </div>
                    </div>
                </div>

                <div v-else-if="requests.length === 0" class="text-center py-12">
                    <span class="material-symbols-outlined text-6xl text-gray-300 mb-4">description</span>
                    <p class="text-gray-500">No hay solicitudes registradas</p>
                </div>

                <div v-else class="space-y-3">
                    <div
                        v-for="request in requests"
                        :key="request.id"
                        class="card bg-base-100 border border-base-content/10 hover:shadow-md transition-shadow"
                    >
                        <div class="card-body p-4">
                            <div class="flex justify-between items-center">
                                <!-- Info de la Solicitud -->
                                <div class="space-y-1 flex-1">
                                    <div class="flex items-center gap-2">
                                        <h3 class="font-semibold">{{ request.folio }}</h3>
                                        <span :class="['badge', getStatusBadge(request.estatus)]">
                                            <span class="material-symbols-outlined text-xs mr-1">{{ getStatusIcon(request.estatus) }}</span>
                                            {{ request.estatus }}
                                        </span>
                                    </div>
                                    <div class="flex items-center gap-4 text-sm text-gray-500">
                                        <span>{{ request.solicitante }}</span>
                                        <span>•</span>
                                        <span>{{ request.area }}</span>
                                        <span>•</span>
                                        <span>{{ request.items }} items</span>
                                        <span>•</span>
                                        <span>{{ new Date(request.fecha).toLocaleDateString('es-MX') }}</span>
                                    </div>
                                </div>

                                <!-- Monto y Acciones -->
                                <div class="text-right">
                                    <p class="text-xl font-bold">${{ request.total.toLocaleString() }}</p>
                                    <button @click="openDetailModal(request)" class="btn btn-outline btn-sm mt-2">
                                        <span class="material-symbols-outlined text-sm">visibility</span>
                                        Ver Detalle
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <PurchaseRequestModal :onRefresh="fetchData" />
    </div>
</template>
