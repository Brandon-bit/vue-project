<script setup lang="ts">
import { computed } from 'vue'
import useCFDIStore from '@/modules/Facturacion/GeneracionDeCFDI/store/cfdiStore'

const cfdiStore = useCFDIStore()

const formData = computed(() => cfdiStore.formData)
const totales = computed(() => cfdiStore.calculateTotales())
</script>

<template>
    <div class="space-y-4">
        <div class="alert alert-info">
            <span class="material-symbols-outlined">visibility</span>
            <span>Revisa los datos antes de generar y timbrar el CFDI</span>
        </div>

        <div class="card bg-base-100 border border-base-content/10">
            <div class="card-body space-y-6">
                <!-- Emisor y Receptor -->
                <div class="grid grid-cols-2 gap-6">
                    <div>
                        <h4 class="font-semibold mb-3 flex items-center gap-2">
                            <span class="material-symbols-outlined">business</span>
                            Emisor
                        </h4>
                        <div class="bg-base-200 p-4 rounded-lg space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span class="text-gray-600">RFC:</span>
                                <span class="font-semibold">{{ formData.emisor.rfc }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Razón Social:</span>
                                <span class="font-semibold">{{ formData.emisor.razonSocial }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Régimen:</span>
                                <span class="font-semibold">{{ formData.emisor.regimenFiscal }}</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 class="font-semibold mb-3 flex items-center gap-2">
                            <span class="material-symbols-outlined">person</span>
                            Receptor
                        </h4>
                        <div class="bg-base-200 p-4 rounded-lg space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span class="text-gray-600">RFC:</span>
                                <span class="font-semibold">{{ formData.receptor.rfc }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Razón Social:</span>
                                <span class="font-semibold">{{ formData.receptor.razonSocial }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Uso CFDI:</span>
                                <span class="font-semibold">{{ formData.receptor.usoCFDI }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="divider"></div>

                <!-- Comprobante -->
                <div>
                    <h4 class="font-semibold mb-3 flex items-center gap-2">
                        <span class="material-symbols-outlined">receipt_long</span>
                        Comprobante
                    </h4>
                    <div class="bg-base-200 p-4 rounded-lg space-y-2 text-sm">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Método de Pago:</span>
                            <span class="font-semibold">{{ formData.comprobante.metodoPago }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Forma de Pago:</span>
                            <span class="font-semibold">{{ formData.comprobante.formaPago }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Moneda:</span>
                            <span class="font-semibold">{{ formData.comprobante.moneda }}</span>
                        </div>
                    </div>
                </div>

                <div class="divider"></div>

                <!-- Conceptos -->
                <div>
                    <h4 class="font-semibold mb-3 flex items-center gap-2">
                        <span class="material-symbols-outlined">inventory_2</span>
                        Conceptos ({{ formData.conceptos.length }})
                    </h4>
                    <div class="bg-base-200 p-4 rounded-lg space-y-2">
                        <div
                            v-for="concepto in formData.conceptos"
                            :key="concepto.id"
                            class="flex justify-between items-center py-2 border-b border-base-content/10 last:border-0"
                        >
                            <div>
                                <p class="font-medium">{{ concepto.descripcion }}</p>
                                <p class="text-xs text-gray-600">
                                    Cantidad: {{ concepto.cantidad }} | Valor Unit: ${{ concepto.valorUnitario.toFixed(2) }}
                                </p>
                            </div>
                            <div class="text-right">
                                <p class="font-semibold">${{ concepto.total.toFixed(2) }}</p>
                                <p class="text-xs text-gray-600">
                                    IVA: ${{ concepto.iva.toFixed(2) }}
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
                            <span class="text-gray-700">Subtotal:</span>
                            <span class="font-semibold">${{ totales.subtotal.toFixed(2) }}</span>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-700">IVA (16%):</span>
                            <span class="font-semibold">${{ totales.totalIVA.toFixed(2) }}</span>
                        </div>
                        <div class="divider my-2"></div>
                        <div class="flex justify-between items-center">
                            <span class="text-xl font-bold">Total:</span>
                            <span class="text-3xl font-bold text-primary">
                                ${{ totales.total.toFixed(2) }}
                            </span>
                        </div>
                        <p class="text-center text-sm text-gray-600">{{ formData.comprobante.moneda }}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="alert alert-warning">
            <span class="material-symbols-outlined">warning</span>
            <div>
                <p class="font-semibold">Importante</p>
                <p class="text-sm">
                    Una vez generado el CFDI, se timbrará automáticamente con el PAC. 
                    Asegúrate de que todos los datos sean correctos.
                </p>
            </div>
        </div>
    </div>
</template>
