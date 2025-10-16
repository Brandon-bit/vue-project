<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import useAccountingPoliciesStore from '@/modules/Contabilidad/PolizasContables/store/accountingPoliciesStore'
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import DeleteAccountingPolicy from '@/modules/Contabilidad/PolizasContables/components/DeleteAccountingPolicy.vue'
import AccountingPolicyForm from '@/modules/Contabilidad/PolizasContables/components/AccountingPolicyForm.vue'
import AccountingPolicyDetail from '@/modules/Contabilidad/PolizasContables/components/AccountingPolicyDetail.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { accountingPolicySchema } from '@/modules/Contabilidad/PolizasContables/validations/accountingPoliciesValidation'
import { toTypedSchema } from '@vee-validate/zod'
import { useAccountingPoliciesActions } from '@/modules/Contabilidad/PolizasContables/composables/useAccountingPoliciesActions'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    onRefresh?: () => void
}>()

const accountingPoliciesStore = useAccountingPoliciesStore()
const modalStore = useModalStore()
const { createAccountingPolicy, updateAccountingPolicy, deleteAccountingPolicy } = useAccountingPoliciesActions()

const initialValues = {
    folio: accountingPoliciesStore.selectedPolicy?.folio || '',
    date: accountingPoliciesStore.selectedPolicy?.date || new Date().toISOString().split('T')[0],
    type: accountingPoliciesStore.selectedPolicy?.type || 'Diario',
    concept: accountingPoliciesStore.selectedPolicy?.concept || '',
    entries: accountingPoliciesStore.selectedPolicy?.entries || []
}

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: toTypedSchema(accountingPolicySchema),
    validateOnMount: false,
    initialValues: initialValues
})

watch(
    () => accountingPoliciesStore.selectedPolicy,
    (policy) => {
        if (policy) {
            setValues({
                folio: policy?.folio || '',
                date: policy?.date || new Date().toISOString().split('T')[0],
                type: policy?.type || 'Diario',
                concept: policy?.concept || '',
                entries: policy?.entries || []
            })
        }
    },
    { immediate: true }
)

const modalMap = {
    CREATE: {
        component: AccountingPolicyForm,
        action: createAccountingPolicy
    },
    EDIT: {
        component: AccountingPolicyForm,
        action: updateAccountingPolicy
    },
    DELETE: {
        component: DeleteAccountingPolicy,
        action: deleteAccountingPolicy
    },
    DETAIL: {
        component: AccountingPolicyDetail,
        action: null
    }
}

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[accountingPoliciesStore.modalId]?.type
    return modalMap[modalType]?.component
})

const currentModalType = computed(() => {
    return modalStore.modals[accountingPoliciesStore.modalId]?.type
})

const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[accountingPoliciesStore.modalId]?.type
    const action = modalMap[modalType]?.action
    
    // Si es DETAIL, no hacer nada (solo cerrar)
    if (modalType === 'DETAIL') {
        modalStore.close(accountingPoliciesStore.modalId)
        return
    }
    
    if (!action) return
    
    try {
        let result
        if (modalType === 'EDIT') {
            const id = accountingPoliciesStore.selectedPolicy?.id || 0
            result = await action(id, formValues)
        } else if (modalType === 'DELETE') {
            const id = accountingPoliciesStore.selectedPolicy?.id || 0
            result = await action(id)
        } else {
            result = await action(formValues)
        }
        
        showNotification(result.message, result.status)
        if (result.status === 'success') props.onRefresh?.()
        modalStore.close(accountingPoliciesStore.modalId)
    } catch (error) {
        console.error(error)
        showNotification('Error al procesar la solicitud', 'error')
    }
})

const onClose = () => {
    resetForm()
    accountingPoliciesStore.setData()
    accountingPoliciesStore.setEditMode(false)
}
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="accountingPoliciesStore.modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
        :hideFooter="currentModalType === 'DETAIL'"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>
