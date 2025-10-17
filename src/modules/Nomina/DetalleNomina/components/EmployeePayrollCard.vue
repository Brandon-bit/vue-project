<script setup lang="ts">
import { computed } from 'vue'
import { EmployeePayrollSummary } from '@/modules/Nomina/DetalleNomina/types/payrollDetailTypes'
import usePayrollDetailStore from '@/modules/Nomina/DetalleNomina/store/payrollDetailStore'
import { useModalStore } from '@/shared/stores/modal.store'

const props = defineProps<{
    employee: EmployeePayrollSummary
}>()

const payrollDetailStore = usePayrollDetailStore()
const modalStore = useModalStore()

const perceptions = computed(() => 
    props.employee.details.filter(d => d.type === 'percepcion')
)

const deductions = computed(() => 
    props.employee.details.filter(d => d.type === 'deduccion')
)

const addConcept = () => {
    payrollDetailStore.setEmployee(props.employee)
    payrollDetailStore.setData()
    modalStore.open(payrollDetailStore.modalId, {
        type: 'CREATE',
        title: 'Agregar concepto'
    })
}

const editConcept = (detail: any) => {
    payrollDetailStore.setEmployee(props.employee)
    payrollDetailStore.setData(detail)
    modalStore.open(payrollDetailStore.modalId, {
        type: 'UPDATE',
        title: 'Editar concepto'
    })
}

const deleteConcept = (detail: any) => {
    payrollDetailStore.setEmployee(props.employee)
    payrollDetailStore.setData(detail)
    modalStore.open(payrollDetailStore.modalId, {
        type: 'DELETE',
        title: 'Eliminar concepto'
    })
}
</script>

<template>
    <div class="card bg-base-100 shadow-xl mb-6">
        <div class="card-body">
            <!-- Employee Header -->
            <div class="flex justify-between items-start mb-4">
                <div>
                    <h3 class="card-title text-lg">{{ employee.employeeName }}</h3>
                    <p class="text-sm text-gray-500">
                        {{ employee.employeeNumber }} | {{ employee.position }}
                    </p>
                    <p class="text-sm text-gray-600">
                        Salario Base: ${{ employee.baseSalary.toLocaleString('es-MX', { minimumFractionDigits: 2 }) }}
                    </p>
                </div>
                <button @click="addConcept" class="btn btn-primary btn-sm">
                    + Agregar Concepto
                </button>
            </div>

            <!-- Concepts Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Perceptions -->
                <div>
                    <h4 class="font-semibold text-green-600 mb-2">Percepciones</h4>
                    <div class="space-y-2">
                        <div 
                            v-for="detail in perceptions" 
                            :key="detail.id"
                            class="flex justify-between items-center bg-green-50 p-2 rounded"
                        >
                            <div class="flex-1">
                                <p class="text-sm font-medium">{{ detail.conceptName }}</p>
                                <p class="text-xs text-gray-500">{{ detail.conceptCode }}</p>
                            </div>
                            <div class="flex items-center gap-2">
                                <span class="text-sm font-semibold text-green-700">
                                    ${{ detail.amount.toLocaleString('es-MX', { minimumFractionDigits: 2 }) }}
                                </span>
                                <button @click="editConcept(detail)" class="btn btn-ghost btn-xs">✏️</button>
                                <button @click="deleteConcept(detail)" class="btn btn-ghost btn-xs text-red-500">🗑️</button>
                            </div>
                        </div>
                        <div v-if="perceptions.length === 0" class="text-sm text-gray-400 italic">
                            Sin percepciones
                        </div>
                    </div>
                </div>

                <!-- Deductions -->
                <div>
                    <h4 class="font-semibold text-red-600 mb-2">Deducciones</h4>
                    <div class="space-y-2">
                        <div 
                            v-for="detail in deductions" 
                            :key="detail.id"
                            class="flex justify-between items-center bg-red-50 p-2 rounded"
                        >
                            <div class="flex-1">
                                <p class="text-sm font-medium">{{ detail.conceptName }}</p>
                                <p class="text-xs text-gray-500">{{ detail.conceptCode }}</p>
                            </div>
                            <div class="flex items-center gap-2">
                                <span class="text-sm font-semibold text-red-700">
                                    ${{ detail.amount.toLocaleString('es-MX', { minimumFractionDigits: 2 }) }}
                                </span>
                                <button @click="editConcept(detail)" class="btn btn-ghost btn-xs">✏️</button>
                                <button @click="deleteConcept(detail)" class="btn btn-ghost btn-xs text-red-500">🗑️</button>
                            </div>
                        </div>
                        <div v-if="deductions.length === 0" class="text-sm text-gray-400 italic">
                            Sin deducciones
                        </div>
                    </div>
                </div>
            </div>

            <!-- Totals -->
            <div class="divider"></div>
            <div class="grid grid-cols-3 gap-4 text-center">
                <div>
                    <p class="text-xs text-gray-500">Total Percepciones</p>
                    <p class="text-lg font-bold text-green-600">
                        ${{ employee.totalPerceptions.toLocaleString('es-MX', { minimumFractionDigits: 2 }) }}
                    </p>
                </div>
                <div>
                    <p class="text-xs text-gray-500">Total Deducciones</p>
                    <p class="text-lg font-bold text-red-600">
                        ${{ employee.totalDeductions.toLocaleString('es-MX', { minimumFractionDigits: 2 }) }}
                    </p>
                </div>
                <div>
                    <p class="text-xs text-gray-500">Neto a Pagar</p>
                    <p class="text-xl font-bold text-blue-600">
                        ${{ employee.netAmount.toLocaleString('es-MX', { minimumFractionDigits: 2 }) }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
