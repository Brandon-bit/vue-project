<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import useExpensePoliciesStore from '@/modules/Contabilidad/PolizasDeGastos/store/expensePoliciesStore'
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import DeleteExpensePolicy from '@/modules/Contabilidad/PolizasDeGastos/components/DeleteExpensePolicy.vue'
import ExpensePolicyForm from '@/modules/Contabilidad/PolizasDeGastos/components/ExpensePolicyForm.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { expensePolicySchema } from '@/modules/Contabilidad/PolizasDeGastos/validations/expensePoliciesValidation'
import { toTypedSchema } from '@vee-validate/zod'
import { useExpensePoliciesActions } from '@/modules/Contabilidad/PolizasDeGastos/composables/useExpensePoliciesActions'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    onRefresh?: () => void
}>()

const expensePoliciesStore = useExpensePoliciesStore()
const modalStore = useModalStore()
const { createExpensePolicy, updateExpensePolicy, deleteExpensePolicy } = useExpensePoliciesActions()

const initialValues = {
    date: expensePoliciesStore.selectedPolicy?.date || new Date().toISOString().split('T')[0],
    supplier: expensePoliciesStore.selectedPolicy?.supplier || '',
    concept: expensePoliciesStore.selectedPolicy?.concept || '',
    expenseType: expensePoliciesStore.selectedPolicy?.expenseType || '',
    costCenter: expensePoliciesStore.selectedPolicy?.costCenter || '',
    paymentMethod: expensePoliciesStore.selectedPolicy?.paymentMethod || '',
    bankAccount: expensePoliciesStore.selectedPolicy?.bankAccount || '',
    paymentReference: expensePoliciesStore.selectedPolicy?.paymentReference || '',
    entries: expensePoliciesStore.selectedPolicy?.entries || []
}

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: toTypedSchema(expensePolicySchema),
    validateOnMount: false,
    initialValues: initialValues
})

watch(
    () => expensePoliciesStore.selectedPolicy,
    (policy) => {
        if (policy) {
            setValues({
                date: policy?.date || new Date().toISOString().split('T')[0],
                supplier: policy?.supplier || '',
                concept: policy?.concept || '',
                expenseType: policy?.expenseType || '',
                costCenter: policy?.costCenter || '',
                paymentMethod: policy?.paymentMethod || '',
                bankAccount: policy?.bankAccount || '',
                paymentReference: policy?.paymentReference || '',
                entries: policy?.entries || []
            })
        }
    },
    { immediate: true }
)

const modalMap = {
    CREATE: {
        component: ExpensePolicyForm,
        action: createExpensePolicy
    },
    EDIT: {
        component: ExpensePolicyForm,
        action: updateExpensePolicy
    },
    DELETE: {
        component: DeleteExpensePolicy,
        action: deleteExpensePolicy
    }
}

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[expensePoliciesStore.modalId]?.type
    return modalMap[modalType]?.component
})

const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[expensePoliciesStore.modalId]?.type
    const action = modalMap[modalType]?.action
    
    try {
        let result
        if (modalType === 'EDIT') {
            const id = expensePoliciesStore.selectedPolicy?.id || 0
            result = await action(id, formValues)
        } else if (modalType === 'DELETE') {
            const id = expensePoliciesStore.selectedPolicy?.id || 0
            result = await action(id)
        } else {
            result = await action(formValues)
        }
        
        showNotification(result.message, result.status)
        if (result.status === 'success') props.onRefresh?.()
        modalStore.close(expensePoliciesStore.modalId)
    } catch (error) {
        console.error(error)
        showNotification('Error al procesar la solicitud', 'error')
    }
})

const onClose = () => {
    resetForm()
    expensePoliciesStore.setData()
}
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="expensePoliciesStore.modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>
