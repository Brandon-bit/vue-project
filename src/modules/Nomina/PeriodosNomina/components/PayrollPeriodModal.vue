<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import usePayrollPeriodStore from '@/modules/Nomina/PeriodosNomina/store/payrollPeriodStore'
import DeletePayrollPeriod from '@/modules/Nomina/PeriodosNomina/components/DeletePayrollPeriod.vue'
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import PayrollPeriodForm from '@/modules/Nomina/PeriodosNomina/components/PayrollPeriodForm.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { createUpdatePayrollPeriodSchema, deletePayrollPeriodSchema } from '@/modules/Nomina/PeriodosNomina/validations/payrollPeriodValidation'
import { toTypedSchema } from '@vee-validate/zod'
import { usePayrollPeriodActions } from '@/modules/Nomina/PeriodosNomina/composables/usePayrollPeriodActions'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    onRefresh?: () => void
}>()

const payrollPeriodStore = usePayrollPeriodStore()
const modalStore = useModalStore()
const { createPayrollPeriod, updatePayrollPeriod, deletePayrollPeriod } = usePayrollPeriodActions()
const mode = computed(() => modalStore.modals[payrollPeriodStore.modalId]?.type)

const modalMap = {
    CREATE: {
        component: PayrollPeriodForm,
        action: createPayrollPeriod,
        schemaValidation: createUpdatePayrollPeriodSchema
    },
    UPDATE: {
        component: PayrollPeriodForm,
        action: updatePayrollPeriod,
        schemaValidation: createUpdatePayrollPeriodSchema
    },
    DELETE: {
        component: DeletePayrollPeriod,
        action: deletePayrollPeriod,
        schemaValidation: deletePayrollPeriodSchema
    }
}

const currentSchema = computed(() => {
    const modalType = mode.value as keyof typeof modalMap
    return modalMap[modalType]?.schemaValidation || modalMap.CREATE.schemaValidation
})

const initialValues = {
    name: payrollPeriodStore.selectedPayrollPeriod?.name || '',
    type: payrollPeriodStore.selectedPayrollPeriod?.type || 'quincenal',
    startDate: payrollPeriodStore.selectedPayrollPeriod?.startDate || '',
    endDate: payrollPeriodStore.selectedPayrollPeriod?.endDate || '',
    status: payrollPeriodStore.selectedPayrollPeriod?.status || 'borrador',
    payrollType: payrollPeriodStore.selectedPayrollPeriod?.payrollType || 'ordinaria',
    notes: payrollPeriodStore.selectedPayrollPeriod?.notes || '',
    active: payrollPeriodStore.selectedPayrollPeriod?.active ?? true
}

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: computed(() => toTypedSchema(currentSchema.value)),
    initialValues: initialValues,
    validateOnMount: false
})

watch(
    () => payrollPeriodStore.selectedPayrollPeriod,
    (current) => {
        if (mode.value === 'UPDATE' && current) {
            setValues({ ...current })
        } else if (mode.value === 'CREATE') {
            resetForm()
            setValues({ 
                name: '', 
                type: 'quincenal', 
                startDate: '', 
                endDate: '', 
                status: 'borrador', 
                payrollType: 'ordinaria', 
                notes: '', 
                active: true 
            })
        }
    }
)

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[payrollPeriodStore.modalId]?.type as keyof typeof modalMap
    return modalMap[modalType]?.component
})

const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[payrollPeriodStore.modalId]?.type as keyof typeof modalMap
    const action = modalMap[modalType]?.action

    try {
        const dataToSend = {
            ...formValues,
            id: payrollPeriodStore.selectedPayrollPeriod?.id
        }

        const { message, status } = await action(dataToSend as any)
        showNotification(message, status)
        if (status === 'success') props.onRefresh?.()
        modalStore.close(payrollPeriodStore.modalId)
    } catch (error) {
        console.error(error)
    }
})

const onClose = () => {
    resetForm()
    payrollPeriodStore.setData()
}
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="payrollPeriodStore.modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>
