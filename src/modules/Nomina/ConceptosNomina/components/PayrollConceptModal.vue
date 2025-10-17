<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import usePayrollConceptStore from '@/modules/Nomina/ConceptosNomina/store/payrollConceptStore'
import DeletePayrollConcept from '@/modules/Nomina/ConceptosNomina/components/DeletePayrollConcept.vue'
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import PayrollConceptForm from '@/modules/Nomina/ConceptosNomina/components/PayrollConceptForm.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { createUpdatePayrollConceptSchema, deletePayrollConceptSchema } from '@/modules/Nomina/ConceptosNomina/validations/payrollConceptValidation'
import { toTypedSchema } from '@vee-validate/zod'
import { usePayrollConceptActions } from '@/modules/Nomina/ConceptosNomina/composables/usePayrollConceptActions'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    onRefresh?: () => void
}>()

const payrollConceptStore = usePayrollConceptStore()
const modalStore = useModalStore()
const { createPayrollConcept, updatePayrollConcept, deletePayrollConcept } = usePayrollConceptActions()
const mode = computed(() => modalStore.modals[payrollConceptStore.modalId]?.type)

const modalMap = {
    CREATE: {
        component: PayrollConceptForm,
        action: createPayrollConcept,
        schemaValidation: createUpdatePayrollConceptSchema
    },
    UPDATE: {
        component: PayrollConceptForm,
        action: updatePayrollConcept,
        schemaValidation: createUpdatePayrollConceptSchema
    },
    DELETE: {
        component: DeletePayrollConcept,
        action: deletePayrollConcept,
        schemaValidation: deletePayrollConceptSchema
    }
}

const currentSchema = computed(() => {
    const modalType = mode.value as keyof typeof modalMap
    return modalMap[modalType]?.schemaValidation || modalMap.CREATE.schemaValidation
})

const initialValues = {
    name: payrollConceptStore.selectedPayrollConcept?.name || '',
    code: payrollConceptStore.selectedPayrollConcept?.code || '',
    type: payrollConceptStore.selectedPayrollConcept?.type || 'percepcion',
    description: payrollConceptStore.selectedPayrollConcept?.description || '',
    isVariable: payrollConceptStore.selectedPayrollConcept?.isVariable ?? false,
    fixedAmount: payrollConceptStore.selectedPayrollConcept?.fixedAmount ?? 0,
    percentage: payrollConceptStore.selectedPayrollConcept?.percentage ?? 0,
    appliesISR: payrollConceptStore.selectedPayrollConcept?.appliesISR ?? false,
    appliesIMSS: payrollConceptStore.selectedPayrollConcept?.appliesIMSS ?? false,
    active: payrollConceptStore.selectedPayrollConcept?.active ?? true
}

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: computed(() => toTypedSchema(currentSchema.value)),
    initialValues: initialValues,
    validateOnMount: false
})

watch(
    () => payrollConceptStore.selectedPayrollConcept,
    (current) => {
        if (mode.value === 'UPDATE' && current) {
            setValues({ ...current })
        } else if (mode.value === 'CREATE') {
            resetForm()
            setValues({ 
                name: '', 
                code: '', 
                type: 'percepcion', 
                description: '', 
                isVariable: false, 
                fixedAmount: 0, 
                percentage: 0, 
                appliesISR: false, 
                appliesIMSS: false, 
                active: true 
            })
        }
    }
)

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[payrollConceptStore.modalId]?.type as keyof typeof modalMap
    return modalMap[modalType]?.component
})

const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[payrollConceptStore.modalId]?.type as keyof typeof modalMap
    const action = modalMap[modalType]?.action

    try {
        const dataToSend = {
            ...formValues,
            id: payrollConceptStore.selectedPayrollConcept?.id
        }

        const { message, status } = await action(dataToSend as any)
        showNotification(message, status)
        if (status === 'success') props.onRefresh?.()
        modalStore.close(payrollConceptStore.modalId)
    } catch (error) {
        console.error(error)
    }
})

const onClose = () => {
    resetForm()
    payrollConceptStore.setData()
}
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="payrollConceptStore.modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>
