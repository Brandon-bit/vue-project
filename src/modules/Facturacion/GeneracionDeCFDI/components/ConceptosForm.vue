<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseSelect from '@/shared/components/BaseFormSelect.vue'
import BaseInput from '@/shared/components/BaseFormInput.vue'
import useCFDIStore from '@/modules/Facturacion/GeneracionDeCFDI/store/cfdiStore'
import { useCFDIActions } from '@/modules/Facturacion/GeneracionDeCFDI/composables/useCFDIActions'
import type { ConceptoType } from '@/modules/Facturacion/GeneracionDeCFDI/types/cfdiTypes'
import { showNotification } from '@/utils/toastNotifications'

const cfdiStore = useCFDIStore()
const { getClavesUnidad } = useCFDIActions()

const clavesUnidad = getClavesUnidad()

const nuevoConcepto = ref({
    claveProdServ: '',
    claveUnidad: 'E48',
    descripcion: '',
    cantidad: 1,
    valorUnitario: 0
})

const importeCalculado = computed(() => {
    return nuevoConcepto.value.cantidad * nuevoConcepto.value.valorUnitario
})

const agregarConcepto = () => {
    if (!nuevoConcepto.value.descripcion || nuevoConcepto.value.cantidad <= 0 || nuevoConcepto.value.valorUnitario <= 0) {
        showNotification('Por favor completa todos los campos del concepto', 'error')
        return
    }
    
    const importe = nuevoConcepto.value.cantidad * nuevoConcepto.value.valorUnitario
    const iva = importe * 0.16
    const total = importe + iva
    
    const concepto: ConceptoType = {
        id: Date.now().toString(),
        claveProdServ: nuevoConcepto.value.claveProdServ,
        claveUnidad: nuevoConcepto.value.claveUnidad,
        descripcion: nuevoConcepto.value.descripcion,
        cantidad: nuevoConcepto.value.cantidad,
        valorUnitario: nuevoConcepto.value.valorUnitario,
        importe,
        iva,
        total
    }
    
    cfdiStore.addConcepto(concepto)
    nuevoConcepto.value = {
        claveProdServ: '',
        claveUnidad: 'E48',
        descripcion: '',
        cantidad: 1,
        valorUnitario: 0
    }
    showNotification('Concepto agregado correctamente', 'success')
}

const eliminarConcepto = (id: string) => {
    cfdiStore.removeConcepto(id)
    showNotification('Concepto eliminado', 'info')
}

const totales = computed(() => cfdiStore.calculateTotales())
</script>

<template>
    <div class="space-y-4">
        <!-- Agregar Concepto -->
        <div class="card bg-base-100 border border-base-content/10">
            <div class="card-body">
                <h4 class="font-semibold mb-3 flex items-center gap-2">
                    <span class="material-symbols-outlined">add_circle</span>
                    Agregar Concepto
                </h4>
                <p class="text-sm text-gray-600 mb-3">
                    Busca productos o servicios guardados o ingresa uno nuevo
                </p>

                <!-- Buscador de Productos -->
                <div class="flex gap-2 mb-4">
                    <input
                        type="text"
                        placeholder="Buscar en catálogo de productos/servicios"
                        class="input input-bordered w-full"
                    />
                    <button class="btn btn-square btn-outline">
                        <span class="material-symbols-outlined">search</span>
                    </button>
                </div>

                <div class="divider"></div>

                <!-- Claves SAT -->
                <div class="grid grid-cols-2 gap-4">
                    <BaseInput
                        name="claveProdServ"
                        label="Clave Prod/Serv (SAT)"
                        placeholder="84111506"
                        v-model="nuevoConcepto.claveProdServ"
                        required
                    />
                    <BaseSelect
                        name="claveUnidad"
                        label="Clave Unidad"
                        :options="clavesUnidad"
                        v-model="nuevoConcepto.claveUnidad"
                        required
                    />
                </div>

                <!-- Descripción -->
                <BaseInput
                    name="descripcion"
                    label="Descripción"
                    placeholder="Descripción detallada del producto o servicio"
                    v-model="nuevoConcepto.descripcion"
                    required
                />

                <!-- Cantidad, Valor Unitario e Importe -->
                <div class="grid grid-cols-3 gap-4">
                    <BaseInput
                        name="cantidad"
                        label="Cantidad"
                        type="number"
                        min="1"
                        step="1"
                        v-model="nuevoConcepto.cantidad"
                        required
                    />
                    <BaseInput
                        name="valorUnitario"
                        label="Valor Unitario"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        v-model="nuevoConcepto.valorUnitario"
                        required
                    />
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Importe Calculado</span>
                        </label>
                        <input
                            type="text"
                            :value="`$${importeCalculado.toFixed(2)}`"
                            class="input input-bordered"
                            disabled
                        />
                    </div>
                </div>

                <button @click="agregarConcepto" class="btn btn-primary w-full mt-4">
                    <span class="material-symbols-outlined">add</span>
                    Agregar Concepto
                </button>
            </div>
        </div>

        <!-- Conceptos Agregados -->
        <div v-if="cfdiStore.formData.conceptos.length > 0" class="card bg-base-100 border border-base-content/10">
            <div class="card-body">
                <h4 class="font-semibold mb-3">
                    Conceptos Agregados ({{ cfdiStore.formData.conceptos.length }})
                </h4>

                <div class="overflow-x-auto">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Descripción</th>
                                <th class="text-right">Cantidad</th>
                                <th class="text-right">Valor Unit.</th>
                                <th class="text-right">Importe</th>
                                <th class="text-right">IVA (16%)</th>
                                <th class="text-right">Total</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="concepto in cfdiStore.formData.conceptos" :key="concepto.id">
                                <td class="font-medium">{{ concepto.descripcion }}</td>
                                <td class="text-right">{{ concepto.cantidad }}</td>
                                <td class="text-right">${{ concepto.valorUnitario.toFixed(2) }}</td>
                                <td class="text-right">${{ concepto.importe.toFixed(2) }}</td>
                                <td class="text-right">${{ concepto.iva.toFixed(2) }}</td>
                                <td class="text-right font-semibold">${{ concepto.total.toFixed(2) }}</td>
                                <td>
                                    <button
                                        @click="eliminarConcepto(concepto.id)"
                                        class="btn btn-ghost btn-sm btn-square text-error"
                                    >
                                        <span class="material-symbols-outlined text-sm">delete</span>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="divider"></div>

                <!-- Totales -->
                <div class="flex justify-end">
                    <div class="space-y-2 w-64">
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-600">Subtotal:</span>
                            <span class="font-medium">${{ totales.subtotal.toFixed(2) }}</span>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-600">IVA (16%):</span>
                            <span class="font-medium">${{ totales.totalIVA.toFixed(2) }}</span>
                        </div>
                        <div class="divider my-2"></div>
                        <div class="flex justify-between">
                            <span class="font-semibold">Total:</span>
                            <span class="text-xl font-bold text-primary">${{ totales.total.toFixed(2) }} MXN</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-else class="alert alert-warning">
            <span class="material-symbols-outlined">warning</span>
            <span>No has agregado ningún concepto. Agrega al menos uno para continuar.</span>
        </div>
    </div>
</template>
