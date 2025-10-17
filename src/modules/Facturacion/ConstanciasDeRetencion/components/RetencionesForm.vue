<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseSelect from '@/shared/components/BaseFormSelect.vue'
import BaseInput from '@/shared/components/BaseFormInput.vue'
import useRetencionStore from '@/modules/Facturacion/ConstanciasDeRetencion/store/retencionStore'
import { useRetencionActions } from '@/modules/Facturacion/ConstanciasDeRetencion/composables/useRetencionActions'
import type { RetencionType } from '@/modules/Facturacion/ConstanciasDeRetencion/types/retencionTypes'
import { showNotification } from '@/utils/toastNotifications'

const retencionStore = useRetencionStore()
const { getConceptosRetenciones } = useRetencionActions()

const conceptosRetenciones = getConceptosRetenciones()
const conceptosOptions = conceptosRetenciones.map(c => ({ id: c.value, label: c.label }))

const nuevaRetencion = ref({
    concepto: '',
    baseCalculo: 0
})

const conceptoSeleccionado = computed(() => {
    return conceptosRetenciones.find(c => c.value === nuevaRetencion.value.concepto)
})

const calculoAutomatico = computed(() => {
    if (!conceptoSeleccionado.value || nuevaRetencion.value.baseCalculo <= 0) {
        return null
    }
    
    const montoISR = nuevaRetencion.value.baseCalculo * conceptoSeleccionado.value.tasaISR
    const montoIVA = nuevaRetencion.value.baseCalculo * conceptoSeleccionado.value.tasaIVA
    const total = montoISR + montoIVA
    
    return { montoISR, montoIVA, total }
})

const agregarRetencion = () => {
    if (!nuevaRetencion.value.concepto || nuevaRetencion.value.baseCalculo <= 0) {
        showNotification('Por favor completa todos los campos', 'error')
        return
    }
    
    if (!conceptoSeleccionado.value) return
    
    const montoISR = nuevaRetencion.value.baseCalculo * conceptoSeleccionado.value.tasaISR
    const montoIVA = nuevaRetencion.value.baseCalculo * conceptoSeleccionado.value.tasaIVA
    const total = montoISR + montoIVA
    
    const retencion: RetencionType = {
        id: Date.now().toString(),
        concepto: conceptoSeleccionado.value.label,
        baseCalculo: nuevaRetencion.value.baseCalculo,
        tasaISR: conceptoSeleccionado.value.tasaISR,
        montoISR,
        tasaIVA: conceptoSeleccionado.value.tasaIVA,
        montoIVA,
        total
    }
    
    retencionStore.addRetencion(retencion)
    nuevaRetencion.value = { concepto: '', baseCalculo: 0 }
    showNotification('Retención agregada correctamente', 'success')
}

const eliminarRetencion = (id: string) => {
    retencionStore.removeRetencion(id)
    showNotification('Retención eliminada', 'info')
}

const totales = computed(() => retencionStore.calculateTotales())
</script>

<template>
    <div class="space-y-4">
        <!-- Agregar Retención -->
        <div class="card bg-base-100 border border-base-content/10">
            <div class="card-body">
                <h4 class="font-semibold mb-3 flex items-center gap-2">
                    <span class="material-symbols-outlined">add_circle</span>
                    Agregar Retención
                </h4>
                <p class="text-sm text-gray-600 mb-3">
                    Selecciona el concepto y el sistema calculará automáticamente las retenciones
                </p>

                <div class="grid grid-cols-2 gap-4">
                    <BaseSelect
                        name="conceptoRetencion"
                        label="Concepto de Retención"
                        placeholder="Selecciona..."
                        :options="conceptosOptions"
                        v-model="nuevaRetencion.concepto"
                        required
                    />
                    <BaseInput
                        name="baseCalculo"
                        label="Base de Cálculo (Monto)"
                        type="number"
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        v-model="nuevaRetencion.baseCalculo"
                        required
                    />
                </div>

                <!-- Cálculo Automático -->
                <div v-if="calculoAutomatico" class="bg-base-200 p-4 rounded-lg mt-4">
                    <p class="text-sm font-semibold mb-3">Cálculo Automático:</p>
                    <div class="grid grid-cols-3 gap-4 text-sm">
                        <div>
                            <p class="text-gray-600">Retención ISR:</p>
                            <p class="font-semibold text-lg">${{ calculoAutomatico.montoISR.toFixed(2) }}</p>
                        </div>
                        <div>
                            <p class="text-gray-600">Retención IVA:</p>
                            <p class="font-semibold text-lg">${{ calculoAutomatico.montoIVA.toFixed(2) }}</p>
                        </div>
                        <div>
                            <p class="text-gray-600">Total Retenido:</p>
                            <p class="font-bold text-lg text-primary">${{ calculoAutomatico.total.toFixed(2) }}</p>
                        </div>
                    </div>
                </div>

                <button @click="agregarRetencion" class="btn btn-primary w-full mt-4">
                    <span class="material-symbols-outlined">add</span>
                    Agregar Retención
                </button>
            </div>
        </div>

        <!-- Retenciones Agregadas -->
        <div v-if="retencionStore.formData.retenciones.length > 0" class="card bg-base-100 border border-base-content/10">
            <div class="card-body">
                <h4 class="font-semibold mb-3">
                    Retenciones Agregadas ({{ retencionStore.formData.retenciones.length }})
                </h4>

                <div class="overflow-x-auto">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Concepto</th>
                                <th class="text-right">Base de Cálculo</th>
                                <th class="text-right">ISR (10%)</th>
                                <th class="text-right">IVA Ret.</th>
                                <th class="text-right">Total Retenido</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="retencion in retencionStore.formData.retenciones" :key="retencion.id">
                                <td class="font-medium">{{ retencion.concepto }}</td>
                                <td class="text-right">${{ retencion.baseCalculo.toFixed(2) }}</td>
                                <td class="text-right">${{ retencion.montoISR.toFixed(2) }}</td>
                                <td class="text-right">${{ retencion.montoIVA.toFixed(2) }}</td>
                                <td class="text-right font-semibold">${{ retencion.total.toFixed(2) }}</td>
                                <td>
                                    <button
                                        @click="eliminarRetencion(retencion.id)"
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
                            <span class="text-gray-600">Total ISR:</span>
                            <span class="font-medium">${{ totales.totalISR.toFixed(2) }}</span>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-600">Total IVA Ret.:</span>
                            <span class="font-medium">${{ totales.totalIVA.toFixed(2) }}</span>
                        </div>
                        <div class="divider my-2"></div>
                        <div class="flex justify-between">
                            <span class="font-semibold">Total Retenido:</span>
                            <span class="text-xl font-bold text-primary">${{ totales.total.toFixed(2) }} MXN</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-else class="alert alert-warning">
            <span class="material-symbols-outlined">warning</span>
            <span>No has agregado ninguna retención. Agrega al menos una para continuar.</span>
        </div>
    </div>
</template>
