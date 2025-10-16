<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import useIncomePoliciesStore from '@/modules/Contabilidad/PolizasDeIngresos/store/incomePoliciesStore'
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import DeleteIncomePolicy from '@/modules/Contabilidad/PolizasDeIngresos/components/DeleteIncomePolicy.vue'
import IncomePolicyForm from '@/modules/Contabilidad/PolizasDeIngresos/components/IncomePolicyForm.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { incomePolicySchema } from '@/modules/Contabilidad/PolizasDeIngresos/validations/incomePoliciesValidation'
import { toTypedSchema } from '@vee-validate/zod'
import { useIncomePoliciesActions } from '@/modules/Contabilidad/PolizasDeIngresos/composables/useIncomePoliciesActions'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    onRefresh?: () => void
}>()

const incomePoliciesStore = useIncomePoliciesStore()
const modalStore = useModalStore()
const { createIncomePolicy, updateIncomePolicy, deleteIncomePolicy } = useIncomePoliciesActions()

const initialValues = {
    date: incomePoliciesStore.selectedPolicy?.date || new Date().toISOString().split('T')[0],
    client: incomePoliciesStore.selectedPolicy?.client || '',
    concept: incomePoliciesStore.selectedPolicy?.concept || '',
    paymentMethod: incomePoliciesStore.selectedPolicy?.paymentMethod || '',
    bankAccount: incomePoliciesStore.selectedPolicy?.bankAccount || '',
    bankReference: incomePoliciesStore.selectedPolicy?.bankReference || '',
    entries: incomePoliciesStore.selectedPolicy?.entries || []
}

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: toTypedSchema(incomePolicySchema),
    validateOnMount: false,
    initialValues: initialValues
})

watch(
    () => incomePoliciesStore.selectedPolicy,
    (policy) => {
        if (policy) {
            setValues({
                date: policy?.date || new Date().toISOString().split('T')[0],
                client: policy?.client || '',
                concept: policy?.concept || '',
                paymentMethod: policy?.paymentMethod || '',
                bankAccount: policy?.bankAccount || '',
                bankReference: policy?.bankReference || '',
                entries: policy?.entries || []
            })
        }
    },
    { immediate: true }
)

const modalMap = {
    CREATE: {
        component: IncomePolicyForm,
        action: createIncomePolicy
    },
    EDIT: {
        component: IncomePolicyForm,
        action: updateIncomePolicy
    },
    DELETE: {
        component: DeleteIncomePolicy,
        action: deleteIncomePolicy
    }
}

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[incomePoliciesStore.modalId]?.type
    return modalMap[modalType]?.component
})

const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[incomePoliciesStore.modalId]?.type
    const action = modalMap[modalType]?.action
    
    try {
        let result
        if (modalType === 'EDIT') {
            const id = incomePoliciesStore.selectedPolicy?.id || 0
            result = await action(id, formValues)
        } else if (modalType === 'DELETE') {
            const id = incomePoliciesStore.selectedPolicy?.id || 0
            result = await action(id)
        } else {
            result = await action(formValues)
        }
        
        showNotification(result.message, result.status)
        if (result.status === 'success') props.onRefresh?.()
        modalStore.close(incomePoliciesStore.modalId)
    } catch (error) {
        console.error(error)
        showNotification('Error al procesar la solicitud', 'error')
    }
})

const onClose = () => {
    resetForm()
    incomePoliciesStore.setData()
}
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="incomePoliciesStore.modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>
