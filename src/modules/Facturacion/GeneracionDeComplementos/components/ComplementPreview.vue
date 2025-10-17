<script setup lang="ts">
import { computed } from 'vue'
import useComplementStore from '@/modules/Facturacion/GeneracionDeComplementos/store/complementStore'

const complementStore = useComplementStore()

const cfdiSeleccionado = computed(() => complementStore.cfdiSeleccionado)
const formData = computed(() => complementStore.formDataPago)
</script>

<template>
    <div class="space-y-4">
        <div class="alert alert-info">
            <span class="material-symbols-outlined">visibility</span>
            <span>Revisa los datos antes de generar y timbrar el complemento</span>
        </div>

        <div class="card bg-base-100 border border-base-content/10">
            <div class="card-body space-y-6">
                <!-- CFDI Relacionado -->
                <div>
                    <h4 class="font-semibold mb-3 flex items-center gap-2">
                        <span class="material-symbols-outlined">link</span>
                        CFDI Relacionado
                    </h4>
                    <div class="bg-base-200 p-4 rounded-lg space-y-2 text-sm">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Folio:</span>
                            <span class="font-semibold">{{ cfdiSeleccionado?.folio }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">UUID:</span>
                            <span class="font-mono text-xs">{{ cfdiSeleccionado?.uuid }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Total Original:</span>
                            <span class="font-semibold">${{ cfdiSeleccionado?.total.toLocaleString('es-MX', { minimumFractionDigits: 2 }) }} MXN</span>
                        </div>
                    </div>
                </div>

                <div class="divider"></div>

                <!-- Información del Pago -->
                <div>
                    <h4 class="font-semibold mb-3 flex items-center gap-2">
                        <span class="material-symbols-outlined">payments</span>
                        Información del Pago
                    </h4>
                    <div class="bg-base-200 p-4 rounded-lg space-y-2 text-sm">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Fecha de Pago:</span>
                            <span class="font-semibold">
                                {{ formData.fechaPago ? new Date(formData.fechaPago).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A' }}
                            </span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Forma de Pago:</span>
                            <span class="font-semibold">{{ formData.formaPago || 'N/A' }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Monto del Pago:</span>
                            <span class="font-bold text-primary text-lg">
                                ${{ formData.montoPago.toLocaleString('es-MX', { minimumFractionDigits: 2 }) }} {{ formData.moneda }}
                            </span>
                        </div>
                        <div v-if="formData.numeroOperacion" class="flex justify-between">
                            <span class="text-gray-600">Referencia:</span>
                            <span class="font-semibold">{{ formData.numeroOperacion }}</span>
                        </div>
                    </div>
                </div>

                <!-- Información Bancaria (si existe) -->
                <div v-if="formData.bancoOrdenante || formData.bancoBeneficiario">
                    <div class="divider"></div>
                    <h4 class="font-semibold mb-3 flex items-center gap-2">
                        <span class="material-symbols-outlined">account_balance</span>
                        Información Bancaria
                    </h4>
                    <div class="bg-base-200 p-4 rounded-lg space-y-2 text-sm">
                        <div v-if="formData.bancoOrdenante" class="flex justify-between">
                            <span class="text-gray-600">Banco Ordenante:</span>
                            <span class="font-semibold">{{ formData.bancoOrdenante }}</span>
                        </div>
                        <div v-if="formData.cuentaOrdenante" class="flex justify-between">
                            <span class="text-gray-600">Cuenta Ordenante:</span>
                            <span class="font-semibold">****{{ formData.cuentaOrdenante }}</span>
                        </div>
                        <div v-if="formData.bancoBeneficiario" class="flex justify-between">
                            <span class="text-gray-600">Banco Beneficiario:</span>
                            <span class="font-semibold">{{ formData.bancoBeneficiario }}</span>
                        </div>
                        <div v-if="formData.cuentaBeneficiaria" class="flex justify-between">
                            <span class="text-gray-600">Cuenta Beneficiaria:</span>
                            <span class="font-semibold">****{{ formData.cuentaBeneficiaria }}</span>
                        </div>
                    </div>
                </div>

                <div class="divider"></div>

                <!-- Resumen -->
                <div class="bg-primary/10 p-4 rounded-lg">
                    <div class="flex justify-between items-center">
                        <div>
                            <p class="text-sm text-gray-600">Monto a Aplicar</p>
                            <p class="text-3xl font-bold text-primary">
                                ${{ formData.montoPago.toLocaleString('es-MX', { minimumFractionDigits: 2 }) }}
                            </p>
                            <p class="text-sm text-gray-600">{{ formData.moneda }}</p>
                        </div>
                        <div class="text-right">
                            <p class="text-sm text-gray-600">Saldo Pendiente</p>
                            <p class="text-2xl font-bold">
                                ${{ ((cfdiSeleccionado?.total || 0) - formData.montoPago).toLocaleString('es-MX', { minimumFractionDigits: 2 }) }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="alert alert-warning">
            <span class="material-symbols-outlined">warning</span>
            <div>
                <p class="font-semibold">Importante</p>
                <p class="text-sm">
                    Una vez generado el complemento, se timbrará automáticamente con el PAC. 
                    Asegúrate de que todos los datos sean correctos.
                </p>
            </div>
        </div>
    </div>
</template>
