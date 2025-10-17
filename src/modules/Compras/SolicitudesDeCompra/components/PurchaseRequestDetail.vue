<script setup lang="ts">
import { computed } from 'vue'
import usePurchaseRequestStore from '@/modules/Compras/SolicitudesDeCompra/store/purchaseRequestStore'
import type { PurchaseRequestStatusType } from '@/modules/Compras/SolicitudesDeCompra/types/purchaseRequestTypes'

const requestStore = usePurchaseRequestStore()

const request = computed(() => requestStore.selectedRequest)

const getStatusBadge = (status: PurchaseRequestStatusType): string => {
    const badgeMap: Record<PurchaseRequestStatusType, string> = {
        'Pendiente': 'badge-warning',
        'Aprobada': 'badge-success',
        'Rechazada': 'badge-error',
        'En Revisión': 'badge-info'
    }
    return badgeMap[status]
}

const getStatusIcon = (status: PurchaseRequestStatusType): string => {
    const iconMap: Record<PurchaseRequestStatusType, string> = {
        'Pendiente': 'schedule',
        'Aprobada': 'check_circle',
        'Rechazada': 'cancel',
        'En Revisión': 'pending'
    }
    return iconMap[status]
}
</script>

<template>
    <div v-if="request" class="space-y-4">
        <!-- Header con Folio y Estado -->
        <div class="card bg-base-200">
            <div class="card-body">
                <div class="flex justify-between items-center">
                    <div>
                        <h4 class="text-2xl font-bold">{{ request.folio }}</h4>
                        <p class="text-sm text-gray-500">Solicitud de Compra</p>
                    </div>
                    <div class="text-right">
                        <span :class="['badge badge-lg', getStatusBadge(request.estatus)]">
                            <span class="material-symbols-outlined text-sm mr-1">{{ getStatusIcon(request.estatus) }}</span>
                            {{ request.estatus }}
                        </span>
                    </div>
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
                <div class="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <p class="text-gray-500">Solicitante</p>
                        <p class="font-semibold">{{ request.solicitante }}</p>
                    </div>
                    <div>
                        <p class="text-gray-500">Área/Departamento</p>
                        <p class="font-semibold">{{ request.area }}</p>
                    </div>
                    <div>
                        <p class="text-gray-500">Fecha de Solicitud</p>
                        <p class="font-semibold">{{ new Date(request.fecha).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' }) }}</p>
                    </div>
                    <div>
                        <p class="text-gray-500">Cantidad de Items</p>
                        <p class="font-semibold">{{ request.items }} productos/servicios</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Justificación -->
        <div v-if="request.justificacion" class="card bg-base-100 border border-base-content/10">
            <div class="card-body">
                <h4 class="font-semibold mb-3 flex items-center gap-2">
                    <span class="material-symbols-outlined">description</span>
                    Justificación
                </h4>
                <p class="text-sm text-gray-700">{{ request.justificacion }}</p>
            </div>
        </div>

        <!-- Información Financiera -->
        <div class="card bg-base-100 border border-base-content/10">
            <div class="card-body">
                <h4 class="font-semibold mb-3 flex items-center gap-2">
                    <span class="material-symbols-outlined">account_balance</span>
                    Información Financiera
                </h4>
                <div class="space-y-3">
                    <div v-if="request.presupuestoDisponible" class="flex justify-between items-center">
                        <span class="text-sm text-gray-500">Presupuesto Disponible:</span>
                        <span class="font-semibold">${{ request.presupuestoDisponible.toLocaleString() }}</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-sm text-gray-500">Monto Total de la Solicitud:</span>
                        <span class="text-xl font-bold text-primary">${{ request.total.toLocaleString() }}</span>
                    </div>
                    <div v-if="request.presupuestoDisponible" class="flex justify-between items-center pt-2 border-t">
                        <span class="font-semibold">Saldo Restante:</span>
                        <span :class="['text-lg font-bold', (request.presupuestoDisponible - request.total) >= 0 ? 'text-green-500' : 'text-red-500']">
                            ${{ (request.presupuestoDisponible - request.total).toLocaleString() }}
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Información de Aprobación/Rechazo -->
        <div v-if="request.estatus === 'Aprobada' || request.estatus === 'Rechazada'" class="card bg-base-100 border border-base-content/10">
            <div class="card-body">
                <h4 class="font-semibold mb-3 flex items-center gap-2">
                    <span class="material-symbols-outlined">{{ request.estatus === 'Aprobada' ? 'check_circle' : 'cancel' }}</span>
                    Información de {{ request.estatus === 'Aprobada' ? 'Aprobación' : 'Rechazo' }}
                </h4>
                <div class="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <p class="text-gray-500">{{ request.estatus === 'Aprobada' ? 'Aprobado por' : 'Rechazado por' }}</p>
                        <p class="font-semibold">{{ request.aprobador || 'N/A' }}</p>
                    </div>
                    <div>
                        <p class="text-gray-500">Fecha de {{ request.estatus === 'Aprobada' ? 'Aprobación' : 'Rechazo' }}</p>
                        <p class="font-semibold">
                            {{ request.fechaAprobacion ? new Date(request.fechaAprobacion).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A' }}
                        </p>
                    </div>
                </div>
                <div v-if="request.comentarios" class="mt-3 pt-3 border-t">
                    <p class="text-gray-500 text-sm mb-1">Comentarios:</p>
                    <p class="text-sm">{{ request.comentarios }}</p>
                </div>
            </div>
        </div>

        <!-- Timeline de Estados -->
        <div class="card bg-base-100 border border-base-content/10">
            <div class="card-body">
                <h4 class="font-semibold mb-3 flex items-center gap-2">
                    <span class="material-symbols-outlined">timeline</span>
                    Estado de la Solicitud
                </h4>
                
                <ul class="steps steps-vertical w-full">
                    <li class="step step-primary">
                        <div class="text-left">
                            <div class="font-semibold">Creada</div>
                            <div class="text-xs text-gray-500">Solicitud generada</div>
                        </div>
                    </li>
                    <li :class="['step', request.estatus !== 'Pendiente' ? 'step-primary' : '']">
                        <div class="text-left">
                            <div class="font-semibold">En Revisión</div>
                            <div class="text-xs text-gray-500">Pendiente de aprobación</div>
                        </div>
                    </li>
                    <li :class="['step', request.estatus === 'Aprobada' ? 'step-primary' : request.estatus === 'Rechazada' ? 'step-error' : '']">
                        <div class="text-left">
                            <div class="font-semibold">
                                {{ request.estatus === 'Aprobada' ? 'Aprobada' : request.estatus === 'Rechazada' ? 'Rechazada' : 'Decisión' }}
                            </div>
                            <div class="text-xs text-gray-500">
                                {{ request.estatus === 'Aprobada' ? 'Lista para generar OC' : request.estatus === 'Rechazada' ? 'Solicitud rechazada' : 'Pendiente' }}
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <!-- Alertas según Estado -->
        <div v-if="request.estatus === 'Pendiente'" class="alert alert-warning">
            <span class="material-symbols-outlined">schedule</span>
            <span>Esta solicitud está pendiente de revisión por tu supervisor.</span>
        </div>
        <div v-if="request.estatus === 'En Revisión'" class="alert alert-info">
            <span class="material-symbols-outlined">pending</span>
            <span>Esta solicitud está siendo revisada. Recibirás una notificación pronto.</span>
        </div>
        <div v-if="request.estatus === 'Aprobada'" class="alert alert-success">
            <span class="material-symbols-outlined">check_circle</span>
            <span>Esta solicitud ha sido aprobada. Se puede proceder a generar la orden de compra.</span>
        </div>
        <div v-if="request.estatus === 'Rechazada'" class="alert alert-error">
            <span class="material-symbols-outlined">cancel</span>
            <div>
                <p class="font-semibold">Esta solicitud ha sido rechazada.</p>
                <p v-if="request.comentarios" class="text-sm">Motivo: {{ request.comentarios }}</p>
            </div>
        </div>

        <!-- Información Adicional -->
        <div class="card bg-base-100 border border-base-content/10">
            <div class="card-body">
                <h4 class="font-semibold mb-3 flex items-center gap-2">
                    <span class="material-symbols-outlined">more_horiz</span>
                    Información Adicional
                </h4>
                <div class="space-y-2 text-sm">
                    <div class="flex justify-between">
                        <span class="text-gray-500">Folio:</span>
                        <span class="font-semibold">{{ request.folio }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-500">Solicitante:</span>
                        <span class="font-semibold">{{ request.solicitante }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-500">Área:</span>
                        <span class="font-semibold">{{ request.area }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-500">Fecha:</span>
                        <span class="font-semibold">{{ new Date(request.fecha).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' }) }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-500">Items:</span>
                        <span class="font-semibold">{{ request.items }}</span>
                    </div>
                    <div class="divider my-2"></div>
                    <div class="flex justify-between items-center">
                        <span class="text-gray-500 font-semibold">Monto Total:</span>
                        <span class="text-2xl font-bold text-primary">${{ request.total.toLocaleString('es-MX', { minimumFractionDigits: 2 }) }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
