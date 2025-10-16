<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import useAccountsCatalogStore from '@/modules/Contabilidad/CatalogoDeCuentas/store/accountsCatalogStore'
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import DeleteAccount from '@/modules/Contabilidad/CatalogoDeCuentas/components/DeleteAccount.vue'
import AccountForm from '@/modules/Contabilidad/CatalogoDeCuentas/components/AccountForm.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { accountSchema } from '@/modules/Contabilidad/CatalogoDeCuentas/validations/accountsCatalogValidation'
import { toTypedSchema } from '@vee-validate/zod'
import { useAccountCatalogActions } from '@/modules/Contabilidad/CatalogoDeCuentas/composables/useAccountCatalogActions'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    onRefresh?: () => void
}>()

const accountsCatalogStore = useAccountsCatalogStore()
const modalStore = useModalStore()
const { createAccount, updateAccount, deleteAccount } = useAccountCatalogActions()

const initialValues = {
    code: accountsCatalogStore.selectedAccount?.code || '',
    name: accountsCatalogStore.selectedAccount?.name || '',
    type: accountsCatalogStore.selectedAccount?.type || 'Cuenta',
    nature: accountsCatalogStore.selectedAccount?.nature || 'Deudora',
    level: accountsCatalogStore.selectedAccount?.level?.toString() || '3',
    currency: accountsCatalogStore.selectedAccount?.currency || 'MXN',
    acceptsMovements: accountsCatalogStore.selectedAccount?.acceptsMovements ?? true,
    requiresAuxiliary: accountsCatalogStore.selectedAccount?.requiresAuxiliary ?? false,
    active: accountsCatalogStore.selectedAccount?.active ?? true
}

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: toTypedSchema(accountSchema),
    validateOnMount: false,
    initialValues: initialValues
})

watch(
    () => accountsCatalogStore.selectedAccount,
    (account) => {
        if (account) {
            setValues({
                code: account?.code || '',
                name: account?.name || '',
                type: account?.type || 'Cuenta',
                nature: account?.nature || 'Deudora',
                level: account?.level?.toString() || '3',
                currency: account?.currency || 'MXN',
                acceptsMovements: account?.acceptsMovements ?? true,
                requiresAuxiliary: account?.requiresAuxiliary ?? false,
                active: account?.active ?? true
            })
        }
    },
    { immediate: true }
)

const modalMap = {
    CREATE: {
        component: AccountForm,
        action: createAccount
    },
    EDIT: {
        component: AccountForm,
        action: updateAccount
    },
    DELETE: {
        component: DeleteAccount,
        action: deleteAccount
    }
}

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[accountsCatalogStore.modalId]?.type
    return modalMap[modalType]?.component
})

const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[accountsCatalogStore.modalId]?.type
    const action = modalMap[modalType]?.action
    
    try {
        let result
        if (modalType === 'EDIT') {
            const id = accountsCatalogStore.selectedAccount?.id || ''
            result = await action(id, formValues)
        } else if (modalType === 'DELETE') {
            result = await action()
        } else {
            result = await action(formValues)
        }
        
        showNotification(result.message, result.status)
        if (result.status === 'success') props.onRefresh?.()
        modalStore.close(accountsCatalogStore.modalId)
    } catch (error) {
        console.error(error)
        showNotification('Error al procesar la solicitud', 'error')
    }
})

const onClose = () => {
    resetForm()
    accountsCatalogStore.setData()
}
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="accountsCatalogStore.modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>
