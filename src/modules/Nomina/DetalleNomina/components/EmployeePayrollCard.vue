<script setup lang="ts">
import { computed } from 'vue'
import { EmployeePayrollSummary } from '@/modules/Nomina/DetalleNomina/types/payrollDetailTypes'

const props = defineProps<{
    employee: EmployeePayrollSummary
    readOnly?: boolean
}>()

const perceptions = computed(() => 
    props.employee.details.filter(d => d.type === 'percepcion')
)

const deductions = computed(() => 
    props.employee.details.filter(d => d.type === 'deduccion')
)
</script>

<template>
    <div class="space-y-6">
        <!-- Employee Header -->
        <div class="mb-6">
            <h3 class="text-2xl font-bold">{{ employee.employeeName }}</h3>
            <p class="text-sm text-gray-500">
                {{ employee.employeeNumber }} | {{ employee.position }}
            </p>
            <p class="text-sm text-gray-600">
                Salario Base: ${{ employee.baseSalary.toLocaleString('es-MX', { minimumFractionDigits: 2 }) }}
            </p>
        </div>

        <!-- Concepts Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Perceptions -->
                <div class="card bg-base-100 shadow-lg">
                    <div class="card-body">
                        <h4 class="card-title text-green-600 mb-4">Percepciones</h4>
                        <div class="space-y-2">
                            <div 
                                v-for="detail in perceptions" 
                                :key="detail.id"
                                class="flex justify-between items-center bg-green-50 p-3 rounded-lg"
                            >
                                <div class="flex-1">
                                    <p class="text-sm font-medium">{{ detail.conceptName }}</p>
                                    <p class="text-xs text-gray-500">{{ detail.conceptCode }}</p>
                                </div>
                                <span class="text-sm font-semibold text-green-700">
                                    ${{ detail.amount.toLocaleString('es-MX', { minimumFractionDigits: 2 }) }}
                                </span>
                            </div>
                            <div v-if="perceptions.length === 0" class="text-sm text-gray-400 italic text-center py-4">
                                Sin percepciones
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Deductions -->
                <div class="card bg-base-100 shadow-lg">
                    <div class="card-body">
                        <h4 class="card-title text-red-600 mb-4">Deducciones</h4>
                        <div class="space-y-2">
                            <div 
                                v-for="detail in deductions" 
                                :key="detail.id"
                                class="flex justify-between items-center bg-red-50 p-3 rounded-lg"
                            >
                                <div class="flex-1">
                                    <p class="text-sm font-medium">{{ detail.conceptName }}</p>
                                    <p class="text-xs text-gray-500">{{ detail.conceptCode }}</p>
                                </div>
                                <span class="text-sm font-semibold text-red-700">
                                    ${{ detail.amount.toLocaleString('es-MX', { minimumFractionDigits: 2 }) }}
                                </span>
                            </div>
                            <div v-if="deductions.length === 0" class="text-sm text-gray-400 italic text-center py-4">
                                Sin deducciones
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        <!-- Totals Card -->
        <div class="card bg-base-100 shadow-lg">
            <div class="card-body">
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
    </div>
</template>
