<script setup lang="ts">
import { computed } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import usePayrollDetailStore from '@/modules/Nomina/DetalleNomina/store/payrollDetailStore'
import { useModalStore } from '@/shared/stores/modal.store'
import { editTableButton, deleteTableButton } from '@/utils/tableButtons'

defineProps<{
    onRefresh?: () => void
}>()

const payrollDetailStore = usePayrollDetailStore()
const modalStore = useModalStore()

const employee = computed(() => payrollDetailStore.selectedEmployee)

const perceptions = computed(() => 
    employee.value?.details.filter(d => d.type === 'percepcion') || []
)

const deductions = computed(() => 
    employee.value?.details.filter(d => d.type === 'deduccion') || []
)

const addConcept = () => {
    payrollDetailStore.setData()
    modalStore.open(payrollDetailStore.modalId, {
        type: 'CREATE',
        title: 'Agregar concepto'
    })
}

const editConcept = (detail: any) => {
    payrollDetailStore.setData(detail)
    modalStore.open(payrollDetailStore.modalId, {
        type: 'UPDATE',
        title: 'Editar concepto'
    })
}

const deleteConcept = (detail: any) => {
    payrollDetailStore.setData(detail)
    modalStore.open(payrollDetailStore.modalId, {
        type: 'DELETE',
        title: 'Eliminar concepto'
    })
}

const createEditButton = (detail: any) => {
    return editTableButton(() => editConcept(detail))
}

const createDeleteButton = (detail: any) => {
    return deleteTableButton(() => deleteConcept(detail))
}

const onClose = () => {
    payrollDetailStore.setEmployee(null)
}
</script>

<template>
    <BaseModal
        modalId="employee-concepts-modal"
        :onClose="onClose"
        :onSubmit="onClose"
        :isSubmitting="false"
    >
        <template v-slot:modalBody>
            <div v-if="employee" class="space-y-4">
                <!-- Employee Info -->
                <div class="bg-base-200 p-4 rounded-lg">
                    <h3 class="font-bold text-lg">{{ employee.employeeName }}</h3>
                    <p class="text-sm text-gray-600">{{ employee.employeeNumber }} | {{ employee.position }}</p>
                    <p class="text-sm">Salario Base: ${{ employee.baseSalary.toLocaleString('es-MX', { minimumFractionDigits: 2 }) }}</p>
                </div>

                <!-- Add Concept Button -->
                <div class="text-right" v-if="payrollDetailStore.canEdit">
                    <button @click="addConcept" class="btn btn-primary btn-sm">
                        + Agregar Concepto
                    </button>
                </div>

                <!-- Perceptions -->
                <div>
                    <h4 class="font-semibold text-success mb-3 flex items-center gap-2 text-lg">
                        <span class="material-symbols-outlined">trending_up</span>
                        Percepciones
                    </h4>
                    <div class="grid grid-cols-1 gap-3">
                        <div 
                            v-for="detail in perceptions" 
                            :key="detail.id"
                            class="concept-card perception-card"
                        >
                            <div class="concept-icon-wrapper bg-success/10">
                                <span class="material-symbols-outlined text-success">add_circle</span>
                            </div>
                            <div class="concept-content">
                                <div class="flex justify-between items-start">
                                    <div>
                                        <span class="concept-code">{{ detail.conceptCode }}</span>
                                        <h5 class="concept-name">{{ detail.conceptName }}</h5>
                                    </div>
                                    <div class="concept-amount text-success">
                                        ${{ detail.amount.toLocaleString('es-MX', { minimumFractionDigits: 2 }) }}
                                    </div>
                                </div>
                            </div>
                            <div class="concept-actions" v-if="payrollDetailStore.canEdit">
                                <component :is="createEditButton(detail)" />
                                <component :is="createDeleteButton(detail)" />
                            </div>
                        </div>
                        <div v-if="perceptions.length === 0" class="text-center text-gray-400 italic py-4">
                            Sin percepciones
                        </div>
                    </div>
                </div>

                <!-- Deductions -->
                <div>
                    <h4 class="font-semibold text-error mb-3 flex items-center gap-2 text-lg">
                        <span class="material-symbols-outlined">trending_down</span>
                        Deducciones
                    </h4>
                    <div class="grid grid-cols-1 gap-3">
                        <div 
                            v-for="detail in deductions" 
                            :key="detail.id"
                            class="concept-card deduction-card"
                        >
                            <div class="concept-icon-wrapper bg-error/10">
                                <span class="material-symbols-outlined text-error">remove_circle</span>
                            </div>
                            <div class="concept-content">
                                <div class="flex justify-between items-start">
                                    <div>
                                        <span class="concept-code">{{ detail.conceptCode }}</span>
                                        <h5 class="concept-name">{{ detail.conceptName }}</h5>
                                    </div>
                                    <div class="concept-amount text-error">
                                        ${{ detail.amount.toLocaleString('es-MX', { minimumFractionDigits: 2 }) }}
                                    </div>
                                </div>
                            </div>
                            <div class="concept-actions" v-if="payrollDetailStore.canEdit">
                                <component :is="createEditButton(detail)" />
                                <component :is="createDeleteButton(detail)" />
                            </div>
                        </div>
                        <div v-if="deductions.length === 0" class="text-center text-gray-400 italic py-4">
                            Sin deducciones
                        </div>
                    </div>
                </div>

                <!-- Totals -->
                <div class="divider"></div>
                <div class="grid grid-cols-3 gap-4 bg-base-200 p-4 rounded-lg">
                    <div class="text-center">
                        <p class="text-xs text-gray-500">Total Percepciones</p>
                        <p class="text-lg font-bold text-green-600">
                            ${{ employee.totalPerceptions.toLocaleString('es-MX', { minimumFractionDigits: 2 }) }}
                        </p>
                    </div>
                    <div class="text-center">
                        <p class="text-xs text-gray-500">Total Deducciones</p>
                        <p class="text-lg font-bold text-red-600">
                            ${{ employee.totalDeductions.toLocaleString('es-MX', { minimumFractionDigits: 2 }) }}
                        </p>
                    </div>
                    <div class="text-center">
                        <p class="text-xs text-gray-500">Neto a Pagar</p>
                        <p class="text-xl font-bold text-blue-600">
                            ${{ employee.netAmount.toLocaleString('es-MX', { minimumFractionDigits: 2 }) }}
                        </p>
                    </div>
                </div>
            </div>
        </template>
    </BaseModal>
</template>

<style scoped>
.concept-card {
    position: relative;
    display: flex;
    align-items: center;
    gap: 1rem;
    background: hsl(var(--b1));
    border-radius: 0.75rem;
    border: 1px solid hsl(var(--bc) / 0.1);
    padding: 1rem;
    transition: all 0.3s ease-in-out;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05);
}

.concept-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
    border-color: hsl(var(--bc) / 0.2);
}

.perception-card:hover {
    border-color: hsl(var(--su) / 0.3);
}

.deduction-card:hover {
    border-color: hsl(var(--er) / 0.3);
}

.concept-icon-wrapper {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.concept-content {
    flex: 1;
}

.concept-code {
    font-size: 0.75rem;
    font-weight: 600;
    color: hsl(var(--bc) / 0.5);
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.concept-name {
    font-size: 0.95rem;
    font-weight: 600;
    color: hsl(var(--bc));
    margin-top: 0.125rem;
}

.concept-amount {
    font-size: 1.25rem;
    font-weight: 700;
}

.concept-actions {
    display: flex;
    gap: 0.5rem;
    flex-shrink: 0;
    align-items: center;
}

.concept-actions :deep(.action-btn-table) {
    opacity: 0.7;
    transition: all 0.2s;
}

.concept-card:hover .concept-actions :deep(.action-btn-table) {
    opacity: 1;
}

.concept-actions :deep(.material-symbols-outlined) {
    font-size: 1.125rem;
}
</style>
