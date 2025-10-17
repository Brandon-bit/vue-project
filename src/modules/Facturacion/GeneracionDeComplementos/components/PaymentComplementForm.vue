<script setup lang="ts">
import { computed } from 'vue'
import BaseInput from '@/shared/components/BaseFormInput.vue'
import BaseSelect from '@/shared/components/BaseFormSelect.vue'
import useComplementStore from '@/modules/Facturacion/GeneracionDeComplementos/store/complementStore'

const complementStore = useComplementStore()

const formasPago = [
    { id: '01', label: '01 - Efectivo' },
    { id: '02', label: '02 - Cheque nominativo' },
    { id: '03', label: '03 - Transferencia electrónica de fondos' },
    { id: '04', label: '04 - Tarjeta de crédito' },
    { id: '28', label: '28 - Tarjeta de débito' }
]

const monedas = [
    { id: 'MXN', label: 'MXN - Peso Mexicano' },
    { id: 'USD', label: 'USD - Dólar Americano' },
    { id: 'EUR', label: 'EUR - Euro' }
]

const cfdiSeleccionado = computed(() => complementStore.cfdiSeleccionado)
</script>

<template>
    <div class="space-y-4">
        <!-- CFDI Origen Pre-cargado -->
        <div class="card bg-base-200 border-2 border-primary/20">
            <div class="card-body">
                <h4 class="font-semibold mb-3 flex items-center gap-2">
                    <span class="material-symbols-outlined">description</span>
                    CFDI Origen (Pre-cargado)
                </h4>
                <p class="text-sm text-gray-600 mb-3">Información del CFDI al que se aplicará el pago</p>
                
                <div class="grid grid-cols-2 gap-4">
                    <BaseInput
                        name="folioOrigen"
                        label="Folio"
                        :value="cfdiSeleccionado?.folio"
                        disabled
                    />
                    <BaseInput
                        name="uuidOrigen"
                        label="UUID"
                        :value="cfdiSeleccionado?.uuid"
                        disabled
                    />
                    <BaseInput
                        name="receptorOrigen"
                        label="Receptor"
                        :value="cfdiSeleccionado?.receptor"
                        disabled
                    />
                    <BaseInput
                        name="totalOrigen"
                        label="Total CFDI"
                        :value="`$${cfdiSeleccionado?.total.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN`"
                        disabled
                    />
                </div>
            </div>
        </div>

        <!-- Información del Pago -->
        <div class="card bg-base-100 border border-base-content/10">
            <div class="card-body">
                <h4 class="font-semibold mb-3 flex items-center gap-2">
                    <span class="material-symbols-outlined">payments</span>
                    Información del Pago
                </h4>
                <p class="text-sm text-gray-600 mb-3">Completa solo los datos nuevos del pago recibido</p>

                <div class="grid grid-cols-2 gap-4">
                    <BaseInput
                        name="fechaPago"
                        label="Fecha de Pago"
                        type="date"
                        required
                    />
                    <BaseSelect
                        name="formaPago"
                        label="Forma de Pago"
                        placeholder="Selecciona..."
                        :options="formasPago"
                        required
                    />
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <BaseInput
                        name="montoPago"
                        label="Monto del Pago"
                        type="number"
                        placeholder="0.00"
                        step="0.01"
                        required
                    />
                    <BaseSelect
                        name="moneda"
                        label="Moneda"
                        :options="monedas"
                        required
                    />
                </div>

                <div class="divider">Información Bancaria (Opcional)</div>

                <div class="grid grid-cols-2 gap-4">
                    <BaseInput
                        name="bancoOrdenante"
                        label="Banco Ordenante"
                        placeholder="Nombre del banco"
                    />
                    <BaseInput
                        name="cuentaOrdenante"
                        label="Cuenta Ordenante"
                        placeholder="Últimos 4 dígitos"
                        maxlength="4"
                    />
                    <BaseInput
                        name="bancoBeneficiario"
                        label="Banco Beneficiario"
                        placeholder="Nombre del banco"
                    />
                    <BaseInput
                        name="cuentaBeneficiaria"
                        label="Cuenta Beneficiaria"
                        placeholder="Últimos 4 dígitos"
                        maxlength="4"
                    />
                </div>

                <div class="divider"></div>

                <BaseInput
                    name="numeroOperacion"
                    label="Número de Operación / Referencia"
                    placeholder="Referencia bancaria o número de transacción"
                />
            </div>
        </div>
    </div>
</template>
