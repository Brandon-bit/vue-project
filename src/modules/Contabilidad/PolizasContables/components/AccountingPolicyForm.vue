<script setup lang="ts">
import { computed } from 'vue'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import useAccountingPoliciesStore from '@/modules/Contabilidad/PolizasContables/store/accountingPoliciesStore'

const accountingPoliciesStore = useAccountingPoliciesStore()

const typeOptions = [
    { id: 'Diario', label: 'Diario' },
    { id: 'Ingreso', label: 'Ingreso' },
    { id: 'Egreso', label: 'Egreso' }
]

const accountOptions = [
    { id: '1101 - Caja', label: '1101 - Caja' },
    { id: '1102 - Bancos', label: '1102 - Bancos' },
    { id: '1201 - Equipo de Cómputo', label: '1201 - Equipo de Cómputo' },
    { id: '1202 - Mobiliario y Equipo', label: '1202 - Mobiliario y Equipo' },
    { id: '2101 - Proveedores', label: '2101 - Proveedores' },
    { id: '4000 - Ingresos', label: '4000 - Ingresos' },
    { id: '5000 - Gastos', label: '5000 - Gastos' }
]

const totalDebit = computed(() => accountingPoliciesStore.totalDebit)
const totalCredit = computed(() => accountingPoliciesStore.totalCredit)
const isBalanced = computed(() => accountingPoliciesStore.isBalanced)
const difference = computed(() => Math.abs(totalDebit.value - totalCredit.value))

const formatCurrency = (amount: number) => {
    return amount.toLocaleString('es-MX', { minimumFractionDigits: 2 })
}
</script>

<template>
    <div class="space-y-6">
        <!-- Encabezado -->
        <div class="card bg-base-100 border border-base-content/10">
            <div class="card-body">
                <h3 class="card-title text-lg">Encabezado</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <BaseFormSelect
                        name="type"
                        label="Tipo de Póliza"
                        :options="typeOptions"
                        :required="true"
                    />
                    <BaseFormInput
                        name="date"
                        type="date"
                        label="Fecha"
                        :required="true"
                    />
                    <BaseFormInput
                        name="folio"
                        type="text"
                        label="Folio"
                        placeholder="D-001"
                        :required="true"
                    />
                </div>
                <div class="col-span-3">
                    <label class="font-semibold mb-2 block">
                        Concepto General <span class="text-error">*</span>
                    </label>
                    <textarea
                        v-model="accountingPoliciesStore.selectedPolicy.concept"
                        class="textarea textarea-bordered w-full"
                        placeholder="Descripción general de la operación..."
                        rows="2"
                    ></textarea>
                </div>
            </div>
        </div>

        <!-- Partidas -->
        <div class="card bg-base-100 border border-base-content/10">
            <div class="card-body">
                <div class="flex items-center justify-between mb-4">
                    <div>
                        <h3 class="card-title text-lg">Partidas</h3>
                        <p class="text-sm text-gray-500">
                            Agregue los movimientos de la póliza
                        </p>
                    </div>
                    <button
                        type="button"
                        @click="accountingPoliciesStore.addEntry()"
                        class="btn btn-outline btn-sm"
                    >
                        <span class="material-symbols-outlined">add</span>
                        Agregar Partida
                    </button>
                </div>

                <!-- Tabla de partidas -->
                <div class="overflow-x-auto">
                    <table class="table table-sm">
                        <thead class="bg-base-200">
                            <tr>
                                <th class="w-[250px]">Cuenta</th>
                                <th>Descripción</th>
                                <th class="text-right w-[120px]">Debe</th>
                                <th class="text-right w-[120px]">Haber</th>
                                <th class="w-[120px]">Referencia</th>
                                <th class="w-[60px]"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="entry in accountingPoliciesStore.selectedPolicy.entries"
                                :key="entry.id"
                            >
                                <td>
                                    <select
                                        v-model="entry.account"
                                        class="select select-sm select-bordered w-full"
                                    >
                                        <option value="">Seleccione cuenta</option>
                                        <option v-for="acc in accountOptions" :key="acc.id" :value="acc.id">
                                            {{ acc.label }}
                                        </option>
                                    </select>
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        v-model="entry.description"
                                        placeholder="Descripción..."
                                        class="input input-sm input-bordered w-full"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        v-model.number="entry.debit"
                                        placeholder="0.00"
                                        step="0.01"
                                        class="input input-sm input-bordered w-full text-right font-mono"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        v-model.number="entry.credit"
                                        placeholder="0.00"
                                        step="0.01"
                                        class="input input-sm input-bordered w-full text-right font-mono"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        v-model="entry.reference"
                                        placeholder="REF-001"
                                        class="input input-sm input-bordered w-full"
                                    />
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        @click="accountingPoliciesStore.removeEntry(entry.id)"
                                        :disabled="accountingPoliciesStore.selectedPolicy.entries.length === 1"
                                        class="btn btn-ghost btn-sm text-error"
                                    >
                                        <span class="material-symbols-outlined">delete</span>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Validación en tiempo real -->
                <div class="flex items-center justify-between p-4 rounded-lg border bg-base-200 mt-4">
                    <div class="flex items-center gap-6">
                        <div>
                            <p class="text-sm font-medium text-gray-500">Total Debe</p>
                            <p class="text-2xl font-bold font-mono">
                                ${{ formatCurrency(totalDebit) }}
                            </p>
                        </div>
                        <div>
                            <p class="text-sm font-medium text-gray-500">Total Haber</p>
                            <p class="text-2xl font-bold font-mono">
                                ${{ formatCurrency(totalCredit) }}
                            </p>
                        </div>
                        <div>
                            <p class="text-sm font-medium text-gray-500">Diferencia</p>
                            <p 
                                class="text-2xl font-bold font-mono"
                                :class="difference === 0 ? 'text-success' : 'text-error'"
                            >
                                ${{ formatCurrency(difference) }}
                            </p>
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
                                Póliza Descuadrada
                            </span>
                        </div>
                    </div>
                </div>

                <div class="flex items-center gap-2 mt-4">
                    <button type="button" class="btn btn-outline">
                        <span class="material-symbols-outlined">attach_file</span>
                        Adjuntar Documentos
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
