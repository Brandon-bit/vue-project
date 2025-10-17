<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import useJournalPoliciesStore from '@/modules/Contabilidad/PolizasDeDiario/store/journalPoliciesStore'
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import DeleteJournalPolicy from '@/modules/Contabilidad/PolizasDeDiario/components/DeleteJournalPolicy.vue'
import JournalPolicyForm from '@/modules/Contabilidad/PolizasDeDiario/components/JournalPolicyForm.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { journalPolicySchema } from '@/modules/Contabilidad/PolizasDeDiario/validations/journalPoliciesValidation'
import { toTypedSchema } from '@vee-validate/zod'
import { useJournalPoliciesActions } from '@/modules/Contabilidad/PolizasDeDiario/composables/useJournalPoliciesActions'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    onRefresh?: () => void
}>()

const journalPoliciesStore = useJournalPoliciesStore()
const modalStore = useModalStore()
const { createJournalPolicy, updateJournalPolicy, deleteJournalPolicy } = useJournalPoliciesActions()

const initialValues = {
    date: journalPoliciesStore.selectedPolicy?.date || new Date().toISOString().split('T')[0],
    concept: journalPoliciesStore.selectedPolicy?.concept || '',
    entries: journalPoliciesStore.selectedPolicy?.entries || []
}

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: toTypedSchema(journalPolicySchema),
    validateOnMount: false,
    initialValues: initialValues
})

watch(
    () => journalPoliciesStore.selectedPolicy,
    (policy) => {
        if (policy) {
            setValues({
                date: policy?.date || new Date().toISOString().split('T')[0],
                concept: policy?.concept || '',
                entries: policy?.entries || []
            })
        }
    },
    { immediate: true }
)

const modalMap = {
    CREATE: {
        component: JournalPolicyForm,
        action: createJournalPolicy
    },
    EDIT: {
        component: JournalPolicyForm,
        action: updateJournalPolicy
    },
    DELETE: {
        component: DeleteJournalPolicy,
        action: deleteJournalPolicy
    }
}

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[journalPoliciesStore.modalId]?.type
    return modalMap[modalType]?.component
})

const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[journalPoliciesStore.modalId]?.type
    const action = modalMap[modalType]?.action
    
    try {
        let result
        if (modalType === 'EDIT') {
            const id = journalPoliciesStore.selectedPolicy?.id || 0
            result = await action(id, formValues)
        } else if (modalType === 'DELETE') {
            result = await action()
        } else {
            result = await action(formValues)
        }
        
        showNotification(result.message, result.status)
        if (result.status === 'success') props.onRefresh?.()
        modalStore.close(journalPoliciesStore.modalId)
    } catch (error) {
        console.error(error)
        showNotification('Error al procesar la solicitud', 'error')
    }
})

const onClose = () => {
    resetForm()
    journalPoliciesStore.setData()
}
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="journalPoliciesStore.modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>
