<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import useDiagnosticStore from '../store/diagnosticStore'
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import DeleteRisk from './DeleteRisk.vue'
import AddEditRiskForm from './AddEditRiskForm.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { riskSchema } from '../validations/diagnosticValidation'
import { toTypedSchema } from '@vee-validate/zod'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    onRefresh?: () => void
}>()

const diagnosticStore = useDiagnosticStore()
const modalStore = useModalStore()

const initialValues = {
    name: diagnosticStore.selectedRisk?.name || '',
    probability: diagnosticStore.selectedRisk?.probability || 5,
    impact: diagnosticStore.selectedRisk?.impact || 5,
    strategy: diagnosticStore.selectedRisk?.strategy || '0'
}

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: toTypedSchema(riskSchema),
    validateOnMount: false,
    initialValues: initialValues
})

watch(
    () => diagnosticStore.selectedRisk,
    (item) => {
        if (item) {
            setValues({
                name: item.name,
                probability: item.probability,
                impact: item.impact,
                strategy: item.strategy
            })
        }
    },
    { immediate: true }
)

const modalMap: Record<string, any> = {
    CREATE: {
        component: AddEditRiskForm,
        action: async (values: any) => {
            console.log('Create Risk:', values)
            return { message: 'Riesgo creado exitosamente', status: 'success' }
        }
    },
    EDIT: {
        component: AddEditRiskForm,
        action: async (values: any) => {
            console.log('Edit Risk:', values)
            return { message: 'Riesgo actualizado exitosamente', status: 'success' }
        }
    },
    DELETE: {
        component: DeleteRisk,
        action: async () => {
            console.log('Delete Risk')
            return { message: 'Riesgo eliminado exitosamente', status: 'success' }
        }
    }
}

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[diagnosticStore.riskModalId]?.type
    if (!modalType) return AddEditRiskForm
    return modalMap[modalType]?.component || AddEditRiskForm
})

const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[diagnosticStore.riskModalId]?.type
    const action = modalMap[modalType]?.action
    try {
        const { message, status } = await action(formValues)
        showNotification(message, status)
        if (status === 'success') props.onRefresh?.()
        modalStore.close(diagnosticStore.riskModalId)
    } catch (error) {
        console.error(error)
    }
})

const onClose = () => {
    resetForm()
    diagnosticStore.setRiskData()
}
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="diagnosticStore.riskModalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>
