<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import usePurchaseOrderStore from '@/modules/Compras/OrdenesDeCompra/store/purchaseOrderStore'
import { usePurchaseOrderActions } from '@/modules/Compras/OrdenesDeCompra/composables/usePurchaseOrderActions'
import type { ApprovedRequestType } from '@/modules/Compras/OrdenesDeCompra/types/purchaseOrderTypes'

const purchaseOrderStore = usePurchaseOrderStore()
const { getApprovedRequests } = usePurchaseOrderActions()

const approvedRequests = ref<ApprovedRequestType[]>([])
const selectedRequestData = ref<ApprovedRequestType | null>(null)

const supplierOptions = [
    { id: '1', label: 'Distribuidora Nacional S.A.' },
    { id: '2', label: 'Servicios Industriales del Norte' },
    { id: '3', label: 'Tech Solutions México' }
]

const deliveryOptions = [
    { id: '7', label: '7 días' },
    { id: '15', label: '15 días' },
    { id: '30', label: '30 días' }
]

const areaOptions = [
    { id: 'marketing', label: 'Marketing' },
    { id: 'tecnologia', label: 'Tecnología' },
    { id: 'operaciones', label: 'Operaciones' }
]

const requestOptions = ref<Array<{ id: string; label: string }>>([])

const loadApprovedRequests = async () => {
    const requests = await getApprovedRequests()
    approvedRequests.value = requests
    requestOptions.value = requests.map(r => ({
        id: r.id.toString(),
        label: `${r.folio} - ${r.requester} - $${r.total.toLocaleString()}`
    }))
}

watch(() => purchaseOrderStore.selectedRequest, (request) => {
    selectedRequestData.value = request
})

onMounted(() => {
    loadApprovedRequests()
})
</script>

<template>
    <div class="space-y-4">
        <!-- Selector de Modo de Creación -->
        <div class="grid grid-cols-2 gap-4">
            <div
                @click="purchaseOrderStore.setCreationMode('solicitud')"
                :class="[
                    'card cursor-pointer border-2 transition-all',
                    purchaseOrderStore.creationMode === 'solicitud'
                        ? 'border-primary bg-primary/5'
                        : 'border-base-content/10 hover:border-primary/50'
                ]"
            >
                <div class="card-body p-6 text-center">
                    <span class="material-symbols-outlined text-5xl text-primary mb-3">
                        description
                    </span>
                    <h3 class="font-semibold mb-2">Desde Solicitud Aprobada</h3>
                    <p class="text-sm text-gray-500">
                        Convierte una solicitud aprobada en OC con un clic
                    </p>
                </div>
            </div>

            <div
                @click="purchaseOrderStore.setCreationMode('directa')"
                :class="[
                    'card cursor-pointer border-2 transition-all',
                    purchaseOrderStore.creationMode === 'directa'
                        ? 'border-primary bg-primary/5'
                        : 'border-base-content/10 hover:border-primary/50'
                ]"
            >
                <div class="card-body p-6 text-center">
                    <span class="material-symbols-outlined text-5xl text-primary mb-3">
                        add_circle
                    </span>
                    <h3 class="font-semibold mb-2">Orden Directa</h3>
                    <p class="text-sm text-gray-500">
                        Crea una OC desde cero sin solicitud previa
                    </p>
                </div>
            </div>
        </div>

        <input type="hidden" name="creationMode" :value="purchaseOrderStore.creationMode" />

        <!-- Formulario para Solicitud Aprobada -->
        <div v-if="purchaseOrderStore.creationMode === 'solicitud'" class="space-y-4">
            <BaseFormSelect
                name="requestId"
                label="Seleccionar Solicitud Aprobada"
                :options="requestOptions"
                :required="true"
            />

            <!-- Vista Previa -->
            <div v-if="selectedRequestData" class="card bg-base-200">
                <div class="card-body">
                    <h4 class="font-semibold mb-3">Vista Previa</h4>
                    <div class="grid grid-cols-2 gap-2 text-sm">
                        <span class="text-gray-500">Solicitante:</span>
                        <span class="font-medium">{{ selectedRequestData.requester }}</span>
                        <span class="text-gray-500">Área:</span>
                        <span class="font-medium">{{ selectedRequestData.area }}</span>
                        <span class="text-gray-500">Items:</span>
                        <span class="font-medium">{{ selectedRequestData.items }} productos</span>
                        <span class="text-gray-500">Total:</span>
                        <span class="font-bold text-primary">${{ selectedRequestData.total.toLocaleString() }}</span>
                    </div>
                </div>
            </div>

            <BaseFormSelect
                name="supplierId"
                label="Proveedor"
                :options="supplierOptions"
                :required="true"
            />

            <BaseFormSelect
                name="expectedDeliveryDays"
                label="Fecha de Entrega Esperada"
                :options="deliveryOptions"
                :required="true"
            />
        </div>

        <!-- Formulario para Orden Directa -->
        <div v-if="purchaseOrderStore.creationMode === 'directa'" class="space-y-4">
            <BaseFormSelect
                name="supplierId"
                label="Proveedor"
                :options="supplierOptions"
                :required="true"
            />

            <BaseFormSelect
                name="requestingArea"
                label="Área Solicitante"
                :options="areaOptions"
                :required="true"
            />

            <div class="alert alert-info">
                <span class="material-symbols-outlined">info</span>
                <span class="text-sm">
                    En el siguiente paso podrás agregar productos/servicios desde el catálogo
                </span>
            </div>
        </div>
    </div>
</template>
