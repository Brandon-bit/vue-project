<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import useIncomePoliciesStore from '@/modules/Contabilidad/PolizasDeIngresos/store/incomePoliciesStore'
import { useIncomePoliciesActions } from '@/modules/Contabilidad/PolizasDeIngresos/composables/useIncomePoliciesActions'
import type { InvoiceType } from '@/modules/Contabilidad/PolizasDeIngresos/types/incomePoliciesTypes'

const incomePoliciesStore = useIncomePoliciesStore()
const { getAvailableInvoices } = useIncomePoliciesActions()

const availableInvoices = ref<InvoiceType[]>([])
const showInvoiceModal = ref(false)

const clientOptions = [
    { id: 'cliente1', label: 'Empresa ABC S.A.' },
    { id: 'cliente2', label: 'Cliente XYZ' },
    { id: 'cliente3', label: 'Corporativo DEF' }
]

const paymentMethodOptions = [
    { id: 'transferencia', label: 'Transferencia' },
    { id: 'cheque', label: 'Cheque' },
    { id: 'efectivo', label: 'Efectivo' },
    { id: 'tarjeta', label: 'Tarjeta' }
]

const bankAccountOptions = [
    { id: 'banco1', label: 'BBVA - 0123456789' },
    { id: 'banco2', label: 'Santander - 9876543210' },
    { id: 'banco3', label: 'Banorte - 5555666677' }
]

const totalDebit = computed(() => incomePoliciesStore.totalDebit)
const totalCredit = computed(() => incomePoliciesStore.totalCredit)
const isBalanced = computed(() => incomePoliciesStore.isBalanced)
const difference = computed(() => Math.abs(totalDebit.value - totalCredit.value))

const formatCurrency = (amount: number) => {
    return amount.toLocaleString('es-MX', { minimumFractionDigits: 2 })
}

const openInvoiceModal = async () => {
    if (!incomePoliciesStore.selectedPolicy.client) {
        return
    }
    availableInvoices.value = await getAvailableInvoices()
    showInvoiceModal.value = true
}

const linkInvoice = (invoice: InvoiceType) => {
    incomePoliciesStore.linkInvoice(invoice)
    showInvoiceModal.value = false
}

onMounted(async () => {
    availableInvoices.value = await getAvailableInvoices()
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
                        :value="'Ingreso'"
                        class="bg-base-200"
                    />
                    <BaseFormInput
                        name="date"
                        type="date"
                        label="Fecha"
                        :required="true"
                    />
                    <BaseFormSelect
                        name="client"
                        label="Cliente"
                        :options="clientOptions"
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
                        label="Cuenta Bancaria de Destino"
                        :options="bankAccountOptions"
                        :required="true"
                    />
                    <BaseFormInput
                        name="bankReference"
                        type="text"
                        label="Referencia Bancaria"
                        placeholder="Número de referencia"
                    />
                </div>
                <div class="col-span-2">
                    <label class="font-semibold mb-2 block">
                        Concepto <span class="text-error">*</span>
                    </label>
                    <textarea
                        v-model="incomePoliciesStore.selectedPolicy.concept"
                        class="textarea textarea-bordered w-full"
                        placeholder="Describa el ingreso..."
                        rows="2"
                    ></textarea>
                </div>
                <div class="col-span-2">
                    <button
                        type="button"
                        @click="openInvoiceModal"
                        :disabled="!incomePoliciesStore.selectedPolicy.client"
                        class="btn btn-outline"
                    >
                        <span class="material-symbols-outlined">link</span>
                        Vincular factura
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
                            Las partidas se generan automáticamente al vincular facturas, o puede agregarlas manualmente
                        </p>
                    </div>
                    <button
                        type="button"
                        @click="incomePoliciesStore.addEntry()"
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
                            <tr v-if="incomePoliciesStore.selectedPolicy.entries.length === 0">
                                <td colspan="6" class="text-center py-8 text-gray-500">
                                    Vincule una factura para generar partidas automáticas o agregue partidas manualmente.
                                </td>
                            </tr>
                            <tr
                                v-for="entry in incomePoliciesStore.selectedPolicy.entries"
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
                                        @click="incomePoliciesStore.removeEntry(entry.id)"
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
                    v-if="incomePoliciesStore.selectedPolicy.entries.length > 0"
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

    <!-- Modal de vinculación de facturas -->
    <dialog :class="{ 'modal modal-open': showInvoiceModal }" class="modal">
        <div class="modal-box">
            <h3 class="font-bold text-lg mb-4">Vincular Factura</h3>
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
                                <p class="text-sm text-gray-500">
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
