<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import useDiagnosticStore from '../store/diagnosticStore'
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import DeletePESTEL from './DeletePESTEL.vue'
import AddEditPESTELForm from './AddEditPESTELForm.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { pestelSchema } from '../validations/diagnosticValidation'
import { toTypedSchema } from '@vee-validate/zod'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    onRefresh?: () => void
}>()

const diagnosticStore = useDiagnosticStore()
const modalStore = useModalStore()

const initialValues = {
    category: diagnosticStore.selectedPESTEL?.category || '0',
    factor: diagnosticStore.selectedPESTEL?.factor || '',
    impact: diagnosticStore.selectedPESTEL?.impact || 5,
    trend: diagnosticStore.selectedPESTEL?.trend || '0'
}

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: toTypedSchema(pestelSchema),
    validateOnMount: false,
    initialValues: initialValues
})

watch(
    () => diagnosticStore.selectedPESTEL,
    (item) => {
        if (item) {
            setValues({
                category: item.category,
                factor: item.factor,
                impact: item.impact,
                trend: item.trend
            })
        }
    },
    { immediate: true }
)

const modalMap: Record<string, any> = {
    CREATE: {
        component: AddEditPESTELForm,
        action: async (values: any) => {
            console.log('Create PESTEL:', values)
            return { message: 'Factor creado exitosamente', status: 'success' }
        }
    },
    EDIT: {
        component: AddEditPESTELForm,
        action: async (values: any) => {
            console.log('Edit PESTEL:', values)
            return { message: 'Factor actualizado exitosamente', status: 'success' }
        }
    },
    DELETE: {
        component: DeletePESTEL,
        action: async () => {
            console.log('Delete PESTEL')
            return { message: 'Factor eliminado exitosamente', status: 'success' }
        }
    }
}

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[diagnosticStore.pestelModalId]?.type
    if (!modalType) return AddEditPESTELForm
    return modalMap[modalType]?.component || AddEditPESTELForm
})

const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[diagnosticStore.pestelModalId]?.type
    const action = modalMap[modalType]?.action
    try {
        const { message, status } = await action(formValues)
        showNotification(message, status)
        if (status === 'success') props.onRefresh?.()
        modalStore.close(diagnosticStore.pestelModalId)
    } catch (error) {
        console.error(error)
    }
})

const onClose = () => {
    resetForm()
    diagnosticStore.setPESTELData()
}
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="diagnosticStore.pestelModalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>
