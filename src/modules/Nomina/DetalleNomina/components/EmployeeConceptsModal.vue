<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import EmployeePayrollCard from '@/modules/Nomina/DetalleNomina/components/EmployeePayrollCard.vue'
import usePayrollDetailStore from '@/modules/Nomina/DetalleNomina/store/payrollDetailStore'
import { useModalStore } from '@/shared/stores/modal.store'

defineProps<{
    onRefresh?: () => void
}>()

const payrollDetailStore = usePayrollDetailStore()
const modalStore = useModalStore()
const modalId = 'employee-concepts-modal'

const onSubmit = () => {
    // No hay submit, solo vista
    modalStore.close(modalId)
}

const onClose = () => {
    payrollDetailStore.setEmployee(null)
}
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="modalId"
        :isSubmitting="false"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <EmployeePayrollCard 
                v-if="payrollDetailStore.selectedEmployee"
                :employee="payrollDetailStore.selectedEmployee"
                :readOnly="true"
            />
        </template>
    </BaseModal>
</template>
