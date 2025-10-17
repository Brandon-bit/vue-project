<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import usePayrollDetailStore from '@/modules/Nomina/DetalleNomina/store/payrollDetailStore'
import DeletePayrollDetail from '@/modules/Nomina/DetalleNomina/components/DeletePayrollDetail.vue'
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import PayrollDetailForm from '@/modules/Nomina/DetalleNomina/components/PayrollDetailForm.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { createUpdatePayrollDetailSchema, deletePayrollDetailSchema } from '@/modules/Nomina/DetalleNomina/validations/payrollDetailValidation'
import { toTypedSchema } from '@vee-validate/zod'
import { usePayrollDetailActions } from '@/modules/Nomina/DetalleNomina/composables/usePayrollDetailActions'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    onRefresh?: () => void
}>()

const payrollDetailStore = usePayrollDetailStore()
const modalStore = useModalStore()
const { createPayrollDetail, updatePayrollDetail, deletePayrollDetail } = usePayrollDetailActions()
const mode = computed(() => modalStore.modals[payrollDetailStore.modalId]?.type)

const modalMap = {
    CREATE: {
        component: PayrollDetailForm,
        action: createPayrollDetail,
        schemaValidation: createUpdatePayrollDetailSchema
    },
    UPDATE: {
        component: PayrollDetailForm,
        action: updatePayrollDetail,
        schemaValidation: createUpdatePayrollDetailSchema
    },
    DELETE: {
        component: DeletePayrollDetail,
        action: deletePayrollDetail,
        schemaValidation: deletePayrollDetailSchema
    }
}

const currentSchema = computed(() => {
    const modalType = mode.value as keyof typeof modalMap
    return modalMap[modalType]?.schemaValidation || modalMap.CREATE.schemaValidation
})

const initialValues = {
    payrollPeriodId: payrollDetailStore.currentPayrollPeriodId || 0,
    employeeId: payrollDetailStore.selectedEmployee?.employeeId || 0,
    conceptId: payrollDetailStore.selectedPayrollDetail?.conceptId || 0,
    amount: payrollDetailStore.selectedPayrollDetail?.amount || 0,
    type: payrollDetailStore.selectedPayrollDetail?.type || 'percepcion',
    notes: payrollDetailStore.selectedPayrollDetail?.notes || ''
}

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: computed(() => toTypedSchema(currentSchema.value)),
    initialValues: initialValues,
    validateOnMount: false
})

watch(
    () => payrollDetailStore.selectedPayrollDetail,
    (current) => {
        if (mode.value === 'UPDATE' && current) {
            setValues({ ...current })
        } else if (mode.value === 'CREATE') {
            resetForm()
            setValues({ 
                payrollPeriodId: payrollDetailStore.currentPayrollPeriodId || 0,
                employeeId: payrollDetailStore.selectedEmployee?.employeeId || 0,
                conceptId: 0,
                amount: 0,
                type: 'percepcion',
                notes: ''
            })
        }
    }
)

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[payrollDetailStore.modalId]?.type as keyof typeof modalMap
    return modalMap[modalType]?.component
})

const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[payrollDetailStore.modalId]?.type as keyof typeof modalMap
    const action = modalMap[modalType]?.action

    try {
        const dataToSend = {
            ...formValues,
            id: payrollDetailStore.selectedPayrollDetail?.id,
            payrollPeriodId: payrollDetailStore.currentPayrollPeriodId || 0,
            employeeId: payrollDetailStore.selectedEmployee?.employeeId || 0
        }

        const { message, status } = await action(dataToSend as any)
        showNotification(message, status)
        if (status === 'success') props.onRefresh?.()
        modalStore.close(payrollDetailStore.modalId)
    } catch (error) {
        console.error(error)
    }
})

const onClose = () => {
    resetForm()
    payrollDetailStore.setData()
}
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="payrollDetailStore.modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>
