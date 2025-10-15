<script setup lang="ts">
import { computed } from 'vue'
import useAccountingPoliciesStore from '@/modules/Contabilidad/PolizasContables/store/accountingPoliciesStore'
import { useModalStore } from '@/shared/stores/modal.store'

const accountingPoliciesStore = useAccountingPoliciesStore()
const modalStore = useModalStore()

const policy = computed(() => accountingPoliciesStore.selectedPolicy)
const totalDebit = computed(() => accountingPoliciesStore.totalDebit)
const totalCredit = computed(() => accountingPoliciesStore.totalCredit)

const formatCurrency = (amount: number) => {
    return amount.toLocaleString('es-MX', { minimumFractionDigits: 2 })
}

const handleEdit = () => {
    accountingPoliciesStore.setEditMode(true)
    modalStore.updateModal(accountingPoliciesStore.modalId, {
        type: 'EDIT',
        title: 'Editar Póliza'
    })
}
</script>

<template>
    <div class="space-y-6">
        <!-- Botón Editar -->
        <div class="flex justify-end">
            <button @click="handleEdit" class="btn btn-primary">
                <span class="material-symbols-outlined">edit</span>
                Editar Póliza
            </button>
        </div>

        <!-- Información General -->
        <div class="card bg-base-100 border border-base-content/10">
            <div class="card-body">
                <h3 class="card-title text-lg">Información General</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p class="text-sm font-medium text-gray-500">Folio</p>
                        <p class="text-lg font-semibold">{{ policy.folio }}</p>
                    </div>
                    <div>
                        <p class="text-sm font-medium text-gray-500">Fecha</p>
                        <p class="text-lg font-semibold">
                            {{ new Date(policy.date).toLocaleDateString('es-MX') }}
                        </p>
                    </div>
                    <div>
                        <p class="text-sm font-medium text-gray-500">Tipo de Póliza</p>
                        <span 
                            class="badge badge-lg"
                            :class="{
                                'badge-neutral': policy.type === 'Diario',
                                'badge-success': policy.type === 'Ingreso',
                                'badge-error': policy.type === 'Egreso'
                            }"
                        >
                            {{ policy.type }}
                        </span>
                    </div>
                    <div>
                        <p class="text-sm font-medium text-gray-500">Estatus</p>
                        <span 
                            class="badge badge-lg gap-1"
                            :class="policy.status === 'Cuadrada' ? 'badge-success' : 'badge-error'"
                        >
                            <span class="material-symbols-outlined text-xs">
                                {{ policy.status === 'Cuadrada' ? 'check_circle' : 'error' }}
                            </span>
                            {{ policy.status }}
                        </span>
                    </div>
                    <div class="col-span-2">
                        <p class="text-sm font-medium text-gray-500">Concepto</p>
                        <p class="text-base">{{ policy.concept }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Partidas -->
        <div class="card bg-base-100 border border-base-content/10">
            <div class="card-body">
                <h3 class="card-title text-lg">Partidas Contables</h3>
                
                <div class="overflow-x-auto">
                    <table class="table table-sm">
                        <thead class="bg-base-200">
                            <tr>
                                <th>Cuenta</th>
                                <th>Descripción</th>
                                <th class="text-right">Debe</th>
                                <th class="text-right">Haber</th>
                                <th>Referencia</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="entry in policy.entries" :key="entry.id">
                                <td class="font-medium">{{ entry.account }}</td>
                                <td>{{ entry.description }}</td>
                                <td class="text-right font-mono">
                                    <span v-if="entry.debit > 0">
                                        ${{ formatCurrency(entry.debit) }}
                                    </span>
                                    <span v-else class="text-gray-400">-</span>
                                </td>
                                <td class="text-right font-mono">
                                    <span v-if="entry.credit > 0">
                                        ${{ formatCurrency(entry.credit) }}
                                    </span>
                                    <span v-else class="text-gray-400">-</span>
                                </td>
                                <td>
                                    <span class="badge badge-outline badge-sm">{{ entry.reference }}</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Totales -->
                <div class="mt-4 p-4 border rounded-lg bg-base-200">
                    <div class="flex justify-between items-center">
                        <div class="flex items-center gap-8">
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
                        </div>
                        <div class="flex items-center gap-2">
                            <span
                                class="material-symbols-outlined text-3xl"
                                :class="policy.status === 'Cuadrada' ? 'text-success' : 'text-error'"
                            >
                                {{ policy.status === 'Cuadrada' ? 'check_circle' : 'error' }}
                            </span>
                            <span 
                                class="font-semibold text-lg"
                                :class="policy.status === 'Cuadrada' ? 'text-success' : 'text-error'"
                            >
                                {{ policy.status }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
