<script setup lang="ts">
import { computed } from 'vue'
import useRetencionStore from '@/modules/Facturacion/ConstanciasDeRetencion/store/retencionStore'

const retencionStore = useRetencionStore()

const formData = computed(() => retencionStore.formData)
const totales = computed(() => retencionStore.calculateTotales())

const getMesLabel = (mes: string): string => {
    const meses: Record<string, string> = {
        '01': 'Enero', '02': 'Febrero', '03': 'Marzo', '04': 'Abril',
        '05': 'Mayo', '06': 'Junio', '07': 'Julio', '08': 'Agosto',
        '09': 'Septiembre', '10': 'Octubre', '11': 'Noviembre', '12': 'Diciembre'
    }
    return meses[mes] || mes
}
</script>

<template>
    <div class="space-y-4">
        <div class="alert alert-info">
            <span class="material-symbols-outlined">visibility</span>
            <span>Revisa los datos antes de generar y timbrar la constancia</span>
        </div>

        <div class="card bg-base-100 border border-base-content/10">
            <div class="card-body space-y-6">
                <!-- Receptor -->
                <div>
                    <h4 class="font-semibold mb-3 flex items-center gap-2">
                        <span class="material-symbols-outlined">person</span>
                        Receptor
                    </h4>
                    <div class="bg-base-200 p-4 rounded-lg space-y-2 text-sm">
                        <div class="flex justify-between">
                            <span class="text-gray-600">RFC:</span>
                            <span class="font-semibold">{{ formData.rfc }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Razón Social:</span>
                            <span class="font-semibold">{{ formData.razonSocial }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Régimen Fiscal:</span>
                            <span class="font-semibold">{{ formData.regimenFiscal }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Código Postal:</span>
                            <span class="font-semibold">{{ formData.codigoPostal }}</span>
                        </div>
                    </div>
                </div>

                <div class="divider"></div>

                <!-- Periodo -->
                <div>
                    <h4 class="font-semibold mb-3 flex items-center gap-2">
                        <span class="material-symbols-outlined">calendar_month</span>
                        Periodo
                    </h4>
                    <div class="bg-base-200 p-4 rounded-lg">
                        <p class="text-lg font-semibold">
                            {{ getMesLabel(formData.mes) }} {{ formData.anio }}
                        </p>
                    </div>
                </div>

                <div class="divider"></div>

                <!-- Retenciones -->
                <div>
                    <h4 class="font-semibold mb-3 flex items-center gap-2">
                        <span class="material-symbols-outlined">receipt_long</span>
                        Retenciones ({{ formData.retenciones.length }})
                    </h4>
                    <div class="bg-base-200 p-4 rounded-lg space-y-2">
                        <div
                            v-for="retencion in formData.retenciones"
                            :key="retencion.id"
                            class="flex justify-between items-center py-2 border-b border-base-content/10 last:border-0"
                        >
                            <div>
                                <p class="font-medium">{{ retencion.concepto }}</p>
                                <p class="text-xs text-gray-600">
                                    Base: ${{ retencion.baseCalculo.toFixed(2) }}
                                </p>
                            </div>
                            <div class="text-right">
                                <p class="font-semibold">${{ retencion.total.toFixed(2) }}</p>
                                <p class="text-xs text-gray-600">
                                    ISR: ${{ retencion.montoISR.toFixed(2) }} | IVA: ${{ retencion.montoIVA.toFixed(2) }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="divider"></div>

                <!-- Totales -->
                <div class="bg-primary/10 p-6 rounded-lg">
                    <div class="space-y-3">
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-700">Total ISR Retenido:</span>
                            <span class="font-semibold">${{ totales.totalISR.toFixed(2) }}</span>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-700">Total IVA Retenido:</span>
                            <span class="font-semibold">${{ totales.totalIVA.toFixed(2) }}</span>
                        </div>
                        <div class="divider my-2"></div>
                        <div class="flex justify-between items-center">
                            <span class="text-xl font-bold">Total Retenido:</span>
                            <span class="text-3xl font-bold text-primary">
                                ${{ totales.total.toFixed(2) }}
                            </span>
                        </div>
                        <p class="text-center text-sm text-gray-600">MXN</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="alert alert-warning">
            <span class="material-symbols-outlined">warning</span>
            <div>
                <p class="font-semibold">Importante</p>
                <p class="text-sm">
                    Una vez generada la constancia, se timbrará automáticamente con el PAC. 
                    Asegúrate de que todos los datos sean correctos.
                </p>
            </div>
        </div>
    </div>
</template>
