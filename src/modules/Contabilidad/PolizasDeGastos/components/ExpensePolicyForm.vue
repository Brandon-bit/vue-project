<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import useExpensePoliciesStore from '@/modules/Contabilidad/PolizasDeGastos/store/expensePoliciesStore'
import { useExpensePoliciesActions } from '@/modules/Contabilidad/PolizasDeGastos/composables/useExpensePoliciesActions'
import type { SupplierInvoiceType } from '@/modules/Contabilidad/PolizasDeGastos/types/expensePoliciesTypes'

const expensePoliciesStore = useExpensePoliciesStore()
const { getSupplierInvoices } = useExpensePoliciesActions()

const availableInvoices = ref<SupplierInvoiceType[]>([])
const showInvoiceModal = ref(false)

const supplierOptions = [
    { id: 'prov1', label: 'Proveedor Industrial S.A.' },
    { id: 'prov2', label: 'Servicios Corporativos' },
    { id: 'prov3', label: 'Distribuidora Nacional' }
]

const expenseTypeOptions = [
    { id: 'operacion', label: 'Gastos de Operación' },
    { id: 'administrativo', label: 'Gastos Administrativos' },
    { id: 'venta', label: 'Gastos de Venta' },
    { id: 'financiero', label: 'Gastos Financieros' }
]

const costCenterOptions = [
    { id: 'produccion', label: 'Producción' },
    { id: 'administracion', label: 'Administración' },
    { id: 'ventas', label: 'Ventas' },
    { id: 'marketing', label: 'Marketing' }
]

const paymentMethodOptions = [
    { id: 'transferencia', label: 'Transferencia' },
    { id: 'cheque', label: 'Cheque' },
    { id: 'efectivo', label: 'Efectivo / Caja Chica' },
    { id: 'tarjeta', label: 'Tarjeta Corporativa' }
]

const bankAccountOptions = [
    { id: 'banco1', label: 'BBVA - 0123456789' },
    { id: 'banco2', label: 'Santander - 9876543210' },
    { id: 'caja', label: 'Caja Chica' }
]

const totalDebit = computed(() => expensePoliciesStore.totalDebit)
const totalCredit = computed(() => expensePoliciesStore.totalCredit)
const isBalanced = computed(() => expensePoliciesStore.isBalanced)
const difference = computed(() => Math.abs(totalDebit.value - totalCredit.value))

const formatCurrency = (amount: number) => {
    return amount.toLocaleString('es-MX', { minimumFractionDigits: 2 })
}

const openInvoiceModal = async () => {
    if (!expensePoliciesStore.selectedPolicy.supplier) {
        return
    }
    availableInvoices.value = await getSupplierInvoices()
    showInvoiceModal.value = true
}

const linkInvoice = (invoice: SupplierInvoiceType) => {
    expensePoliciesStore.linkSupplierInvoice(invoice)
    showInvoiceModal.value = false
}

onMounted(async () => {
    availableInvoices.value = await getSupplierInvoices()
})
</script>

<template>
    <div class="space-y-6">
        <!-- Información General -->
        <div class="card bg-base-100 border border-base-content/10">
            <div class="card-body">
                <h3 class="card-title text-lg">Información General</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <BaseFormInput
                        name="policyType"
                        type="text"
                        label="Tipo de Póliza"
                        :readonly="true"
                        :value="'Egreso / Gasto'"
                        class="bg-base-200"
                    />
                    <BaseFormInput
                        name="date"
                        type="date"
                        label="Fecha"
                        :required="true"
                    />
                    <BaseFormSelect
                        name="supplier"
                        label="Proveedor"
                        :options="supplierOptions"
                        :required="true"
                    />
                    <BaseFormSelect
                        name="expenseType"
                        label="Tipo de Gasto"
                        :options="expenseTypeOptions"
                        :required="true"
                    />
                    <BaseFormSelect
                        name="costCenter"
                        label="Centro de Costo"
                        :options="costCenterOptions"
                        :required="true"
                    />
                    <BaseFormSelect
                        name="paymentMethod"
                        label="Método de Pago"
                        :options="paymentMethodOptions"
                        :required="true"
                    />
                    <BaseFormSelect
                        name="bankAccount"
                        label="Cuenta Bancaria de Origen"
                        :options="bankAccountOptions"
                        :required="true"
                    />
                    <BaseFormInput
                        name="paymentReference"
                        type="text"
                        label="Referencia / Folio de Pago"
                        placeholder="Número de referencia o cheque"
                    />
                </div>
                <div class="col-span-2">
                    <label class="font-semibold mb-2 block">
                        Concepto <span class="text-error">*</span>
                    </label>
                    <textarea
                        v-model="expensePoliciesStore.selectedPolicy.concept"
                        class="textarea textarea-bordered w-full"
                        placeholder="Describa el gasto..."
                        rows="2"
                    ></textarea>
                </div>
                <div class="col-span-2">
                    <button
                        type="button"
                        @click="openInvoiceModal"
                        :disabled="!expensePoliciesStore.selectedPolicy.supplier"
                        class="btn btn-outline"
                    >
                        <span class="material-symbols-outlined">link</span>
                        Asociar factura de proveedor
                    </button>
                </div>
            </div>
        </div>

        <!-- Partidas Contables -->
        <div class="card bg-base-100 border border-base-content/10">
            <div class="card-body">
                <div class="flex items-center justify-between mb-4">
                    <div>
                        <h3 class="card-title text-lg">Partidas Contables</h3>
                        <p class="text-sm text-gray-500">
                            Las partidas se generan automáticamente al asociar facturas, o puede agregarlas manualmente
                        </p>
                    </div>
                    <button
                        type="button"
                        @click="expensePoliciesStore.addEntry()"
                        class="btn btn-outline btn-sm"
                    >
                        <span class="material-symbols-outlined">add</span>
                        Agregar partida
                    </button>
                </div>

                <!-- Tabla de partidas -->
                <div class="overflow-x-auto">
                    <table class="table table-sm">
                        <thead class="bg-base-200">
                            <tr>
                                <th>Cuenta</th>
                                <th>Descripción</th>
                                <th class="text-right">Debe</th>
                                <th class="text-right">Haber</th>
                                <th>Referencia</th>
                                <th class="w-[50px]"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="expensePoliciesStore.selectedPolicy.entries.length === 0">
                                <td colspan="6" class="text-center py-8 text-gray-500">
                                    Asocie una factura para generar partidas automáticas o agregue partidas manualmente.
                                </td>
                            </tr>
                            <tr
                                v-for="entry in expensePoliciesStore.selectedPolicy.entries"
                                :key="entry.id"
                            >
                                <td>
                                    <input
                                        type="text"
                                        v-model="entry.account"
                                        placeholder="Buscar cuenta..."
                                        class="input input-sm input-bordered w-full"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        v-model="entry.description"
                                        placeholder="Descripción"
                                        class="input input-sm input-bordered w-full"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        v-model.number="entry.debit"
                                        placeholder="0.00"
                                        step="0.01"
                                        class="input input-sm input-bordered w-full text-right"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        v-model.number="entry.credit"
                                        placeholder="0.00"
                                        step="0.01"
                                        class="input input-sm input-bordered w-full text-right"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        v-model="entry.reference"
                                        placeholder="Ref."
                                        class="input input-sm input-bordered w-full"
                                    />
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        @click="expensePoliciesStore.removeEntry(entry.id)"
                                        class="btn btn-ghost btn-sm text-error"
                                    >
                                        <span class="material-symbols-outlined">delete</span>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Totales y Validación -->
                <div
                    v-if="expensePoliciesStore.selectedPolicy.entries.length > 0"
                    class="mt-4 p-4 border rounded-lg"
                    :class="isBalanced ? 'bg-success/10 border-success' : 'bg-error/10 border-error'"
                >
                    <div class="flex items-center justify-between">
                        <div class="space-y-1">
                            <div class="flex items-center gap-4">
                                <span class="font-semibold">Total Debe:</span>
                                <span class="text-lg font-bold font-mono">
                                    ${{ formatCurrency(totalDebit) }}
                                </span>
                            </div>
                            <div class="flex items-center gap-4">
                                <span class="font-semibold">Total Haber:</span>
                                <span class="text-lg font-bold font-mono">
                                    ${{ formatCurrency(totalCredit) }}
                                </span>
                            </div>
                        </div>
                        <div class="flex items-center gap-2">
                            <span
                                v-if="isBalanced"
                                class="material-symbols-outlined text-success text-3xl"
                            >
                                check_circle
                            </span>
                            <span
                                v-else
                                class="material-symbols-outlined text-error text-3xl"
                            >
                                error
                            </span>
                            <div class="text-right">
                                <span
                                    v-if="isBalanced"
                                    class="font-semibold text-success"
                                >
                                    Póliza Cuadrada
                                </span>
                                <span v-else class="font-semibold text-error">
                                    Diferencia: ${{ formatCurrency(difference) }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal de asociación de facturas de proveedores -->
    <dialog :class="{ 'modal modal-open': showInvoiceModal }" class="modal">
        <div class="modal-box">
            <h3 class="font-bold text-lg mb-4">Asociar Factura de Proveedor</h3>
            <p class="text-sm text-gray-500 mb-4">
                Seleccione una factura pendiente para generar las partidas automáticamente
            </p>
            <div class="space-y-2">
                <div
                    v-for="invoice in availableInvoices"
                    :key="invoice.id"
                    @click="linkInvoice(invoice)"
                    class="card bg-base-200 cursor-pointer hover:bg-base-300 transition-colors"
                >
                    <div class="card-body p-4">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="font-semibold">{{ invoice.folio }}</p>
                                <p class="text-sm text-gray-500">{{ invoice.concept }}</p>
                                <p class="text-xs text-gray-400">
                                    {{ new Date(invoice.date).toLocaleDateString('es-MX') }}
                                </p>
                            </div>
                            <p class="text-lg font-bold">
                                ${{ invoice.amount.toLocaleString('es-MX') }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-action">
                <button @click="showInvoiceModal = false" class="btn">Cerrar</button>
            </div>
        </div>
        <form method="dialog" class="modal-backdrop" @click="showInvoiceModal = false">
            <button>close</button>
        </form>
    </dialog>
</template>
