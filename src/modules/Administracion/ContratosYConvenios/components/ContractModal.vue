<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import useContractStore from '@/modules/Administracion/ContratosYConvenios/store/contractStore'
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import DeleteContract from '@/modules/Administracion/ContratosYConvenios/components/DeleteContract.vue'
import ContractForm from '@/modules/Administracion/ContratosYConvenios/components/ContractForm.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { contractSchema } from '@/modules/Administracion/ContratosYConvenios/validations/contractValidation'
import { toTypedSchema } from '@vee-validate/zod'
import { useContractActions } from '@/modules/Administracion/ContratosYConvenios/composables/useContractActions'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    onRefresh?: () => void
}>()

const contractStore = useContractStore()
const modalStore = useModalStore()
const { createContract, editContract, deleteContract } = useContractActions()

const initialValues = {
    name: contractStore.selectedContract?.name || '',
    counterpart: contractStore.selectedContract?.counterpart || '',
    type: contractStore.selectedContract?.type || '',
    startDate: contractStore.selectedContract?.startDate ? new Date(contractStore.selectedContract.startDate).toISOString().split('T')[0] : '',
    expirationDate: contractStore.selectedContract?.expirationDate ? new Date(contractStore.selectedContract.expirationDate).toISOString().split('T')[0] : '',
    amount: contractStore.selectedContract?.amount || 0,
    description: contractStore.selectedContract?.description || ''
}

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: toTypedSchema(contractSchema),
    validateOnMount: false,
    initialValues: initialValues
})

watch(
    () => contractStore.selectedContract,
    (contract) => {
        if (contract) {
            setValues({
                name: contract?.name || '',
                counterpart: contract?.counterpart || '',
                type: contract?.type || '',
                startDate: contract?.startDate ? new Date(contract.startDate).toISOString().split('T')[0] : '',
                expirationDate: contract?.expirationDate ? new Date(contract.expirationDate).toISOString().split('T')[0] : '',
                amount: contract?.amount || 0,
                description: contract?.description || ''
            })
        }
    },
    { immediate: true }
)

const modalMap = {
    CREATE: {
        component: ContractForm,
        action: createContract,
        showFooter: true
    },
    EDIT: {
        component: ContractForm,
        action: editContract,
        showFooter: true
    },
    DELETE: {
        component: DeleteContract,
        action: deleteContract,
        showFooter: true
    }
}

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[contractStore.modalId]?.type as keyof typeof modalMap
    return modalType ? modalMap[modalType]?.component : undefined
})

const showFooter = computed(() => {
    const modalType = modalStore.modals[contractStore.modalId]?.type as keyof typeof modalMap
    return modalType ? (modalMap[modalType]?.showFooter ?? true) : true
})

const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[contractStore.modalId]?.type as keyof typeof modalMap
    const action = modalType ? modalMap[modalType]?.action : null
    
    if (!action) return
    
    try {
        const { message, status } = await action(formValues)
        showNotification(message, status)
        if (status == "success") props.onRefresh?.()
        modalStore.close(contractStore.modalId)
    } catch (error) {
        console.error(error)
    }
})

const onClose = () => {
    resetForm()
    contractStore.setData()
}

</script>
<template>
    <BaseModal
        :onSubmit="showFooter ? onSubmit : undefined"
        :modalId="contractStore.modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
        :showFooter="showFooter"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>
