<script setup lang="ts">
import { computed } from 'vue'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import useJournalPoliciesStore from '@/modules/Contabilidad/PolizasDeDiario/store/journalPoliciesStore'

const journalPoliciesStore = useJournalPoliciesStore()

const totalDebit = computed(() => journalPoliciesStore.totalDebit)
const totalCredit = computed(() => journalPoliciesStore.totalCredit)
const isBalanced = computed(() => journalPoliciesStore.isBalanced)
const difference = computed(() => Math.abs(totalDebit.value - totalCredit.value))

const formatCurrency = (amount: number) => {
    return amount.toLocaleString('es-MX', { minimumFractionDigits: 2 })
}
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
                        :value="'Diario'"
                        class="bg-base-200"
                    />
                    <BaseFormInput
                        name="date"
                        type="date"
                        label="Fecha"
                        :required="true"
                    />
                </div>
                <div class="col-span-2">
                    <label class="font-semibold mb-2 block">
                        Concepto <span class="text-error">*</span>
                    </label>
                    <textarea
                        v-model="journalPoliciesStore.selectedPolicy.concept"
                        class="textarea textarea-bordered w-full"
                        placeholder="Describa el motivo de la póliza..."
                        rows="3"
                    ></textarea>
                </div>
            </div>
        </div>

        <!-- Partidas Contables -->
        <div class="card bg-base-100 border border-base-content/10">
            <div class="card-body">
                <div class="flex items-center justify-between mb-4">
                    <div>
                        <h3 class="card-title text-lg">Partidas Contables</h3>
                        <p class="text-sm text-gray-500">Agregue las cuentas afectadas por esta operación</p>
                    </div>
                    <button
                        type="button"
                        @click="journalPoliciesStore.addEntry()"
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
                            <tr v-if="journalPoliciesStore.selectedPolicy.entries.length === 0">
                                <td colspan="6" class="text-center py-8 text-gray-500">
                                    No hay partidas agregadas. Haga clic en "Agregar partida" para comenzar.
                                </td>
                            </tr>
                            <tr
                                v-for="entry in journalPoliciesStore.selectedPolicy.entries"
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
                                        @click="journalPoliciesStore.removeEntry(entry.id)"
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
                    v-if="journalPoliciesStore.selectedPolicy.entries.length > 0"
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
</template>
