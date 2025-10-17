<script setup lang="ts">
import { computed } from 'vue'
import usePurchaseOrderStore from '@/modules/Compras/OrdenesDeCompra/store/purchaseOrderStore'
import type { OrderStatusType } from '@/modules/Compras/OrdenesDeCompra/types/purchaseOrderTypes'

const purchaseOrderStore = usePurchaseOrderStore()

const order = computed(() => purchaseOrderStore.selectedOrder)

const getStatusBadge = (status: OrderStatusType): string => {
    const badgeMap: Record<OrderStatusType, string> = {
        'Emitida': 'badge-info',
        'Confirmada': 'badge-secondary',
        'Entregada': 'badge-warning',
        'Cerrada': 'badge-neutral'
    }
    return badgeMap[status]
}
</script>

<template>
    <div v-if="order" class="space-y-4">
        <!-- Header con Folio y Estado -->
        <div class="card bg-base-200">
            <div class="card-body">
                <div class="flex justify-between items-center">
                    <div>
                        <h4 class="text-2xl font-bold">{{ order.folio }}</h4>
                        <p class="text-sm text-gray-500">Orden de Compra</p>
                    </div>
                    <span :class="['badge badge-lg', getStatusBadge(order.status)]">
                        {{ order.status }}
                    </span>
                </div>
            </div>
        </div>

        <!-- Información General -->
        <div class="card bg-base-100 border border-base-content/10">
            <div class="card-body">
                <h4 class="font-semibold mb-3 flex items-center gap-2">
                    <span class="material-symbols-outlined">info</span>
                    Información General
                </h4>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <p class="text-sm text-gray-500">Proveedor</p>
                        <p class="font-semibold">{{ order.supplier }}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Fecha de Emisión</p>
                        <p class="font-semibold">{{ new Date(order.date).toLocaleDateString('es-MX') }}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Cantidad de Items</p>
                        <p class="font-semibold">{{ order.items }} productos/servicios</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Monto Total</p>
                        <p class="text-xl font-bold text-primary">${{ order.total.toLocaleString() }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Estado y Seguimiento -->
        <div class="card bg-base-100 border border-base-content/10">
            <div class="card-body">
                <h4 class="font-semibold mb-3 flex items-center gap-2">
                    <span class="material-symbols-outlined">timeline</span>
                    Estado y Seguimiento
                </h4>
                
                <!-- Timeline de Estados -->
                <ul class="steps steps-vertical lg:steps-horizontal w-full">
                    <li :class="['step', order.status === 'Emitida' || order.status === 'Confirmada' || order.status === 'Entregada' || order.status === 'Cerrada' ? 'step-primary' : '']">
                        <div class="text-left">
                            <div class="font-semibold">Emitida</div>
                            <div class="text-xs text-gray-500">Orden generada</div>
                        </div>
                    </li>
                    <li :class="['step', order.status === 'Confirmada' || order.status === 'Entregada' || order.status === 'Cerrada' ? 'step-primary' : '']">
                        <div class="text-left">
                            <div class="font-semibold">Confirmada</div>
                            <div class="text-xs text-gray-500">Por proveedor</div>
                        </div>
                    </li>
                    <li :class="['step', order.status === 'Entregada' || order.status === 'Cerrada' ? 'step-primary' : '']">
                        <div class="text-left">
                            <div class="font-semibold">Entregada</div>
                            <div class="text-xs text-gray-500">Productos recibidos</div>
                        </div>
                    </li>
                    <li :class="['step', order.status === 'Cerrada' ? 'step-primary' : '']">
                        <div class="text-left">
                            <div class="font-semibold">Cerrada</div>
                            <div class="text-xs text-gray-500">Completada</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <!-- Alertas según Estado -->
        <div v-if="order.status === 'Emitida'" class="alert alert-info">
            <span class="material-symbols-outlined">info</span>
            <span>Esta orden está lista para ser enviada al proveedor.</span>
        </div>
        <div v-if="order.status === 'Confirmada'" class="alert alert-success">
            <span class="material-symbols-outlined">check_circle</span>
            <span>El proveedor ha confirmado la recepción de esta orden.</span>
        </div>
        <div v-if="order.status === 'Entregada'" class="alert alert-warning">
            <span class="material-symbols-outlined">inventory_2</span>
            <span>Los productos han sido recibidos. Puedes cerrar esta orden.</span>
        </div>
        <div v-if="order.status === 'Cerrada'" class="alert">
            <span class="material-symbols-outlined">task_alt</span>
            <span>Esta orden ha sido completada y cerrada.</span>
        </div>

        <!-- Información Adicional -->
        <div class="card bg-base-100 border border-base-content/10">
            <div class="card-body">
                <h4 class="font-semibold mb-3 flex items-center gap-2">
                    <span class="material-symbols-outlined">description</span>
                    Detalles Adicionales
                </h4>
                <div class="space-y-2 text-sm">
                    <div class="flex justify-between">
                        <span class="text-gray-500">Folio de Orden:</span>
                        <span class="font-semibold">{{ order.folio }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-500">Proveedor:</span>
                        <span class="font-semibold">{{ order.supplier }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-500">Fecha de Emisión:</span>
                        <span class="font-semibold">{{ new Date(order.date).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' }) }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-500">Cantidad de Items:</span>
                        <span class="font-semibold">{{ order.items }}</span>
                    </div>
                    <div class="divider my-2"></div>
                    <div class="flex justify-between items-center">
                        <span class="text-gray-500 font-semibold">Monto Total:</span>
                        <span class="text-2xl font-bold text-primary">${{ order.total.toLocaleString('es-MX', { minimumFractionDigits: 2 }) }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
