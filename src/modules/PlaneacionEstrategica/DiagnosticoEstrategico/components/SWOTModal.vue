<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import useDiagnosticStore from '../store/diagnosticStore'
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import DeleteSWOT from './DeleteSWOT.vue'
import AddEditSWOTForm from './AddEditSWOTForm.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { swotSchema } from '../validations/diagnosticValidation'
import { toTypedSchema } from '@vee-validate/zod'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    onRefresh?: () => void
}>()

const diagnosticStore = useDiagnosticStore()
const modalStore = useModalStore()

const initialValues = {
    category: diagnosticStore.selectedSWOT?.category || '0',
    text: diagnosticStore.selectedSWOT?.text || ''
}

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: toTypedSchema(swotSchema),
    validateOnMount: false,
    initialValues: initialValues
})

watch(
    () => diagnosticStore.selectedSWOT,
    (item) => {
        if (item) {
            setValues({
                category: item.category,
                text: item.text
            })
        }
    },
    { immediate: true }
)

const modalMap: Record<string, any> = {
    CREATE: {
        component: AddEditSWOTForm,
        action: async (values: any) => {
            console.log('Create SWOT:', values)
            return { message: 'Elemento creado exitosamente', status: 'success' }
        }
    },
    EDIT: {
        component: AddEditSWOTForm,
        action: async (values: any) => {
            console.log('Edit SWOT:', values)
            return { message: 'Elemento actualizado exitosamente', status: 'success' }
        }
    },
    DELETE: {
        component: DeleteSWOT,
        action: async () => {
            console.log('Delete SWOT')
            return { message: 'Elemento eliminado exitosamente', status: 'success' }
        }
    }
}

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[diagnosticStore.swotModalId]?.type
    if (!modalType) return AddEditSWOTForm
    return modalMap[modalType]?.component || AddEditSWOTForm
})

const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[diagnosticStore.swotModalId]?.type
    const action = modalMap[modalType]?.action
    try {
        const { message, status } = await action(formValues)
        showNotification(message, status)
        if (status === 'success') props.onRefresh?.()
        modalStore.close(diagnosticStore.swotModalId)
    } catch (error) {
        console.error(error)
    }
})

const onClose = () => {
    resetForm()
    diagnosticStore.setSWOTData()
}
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="diagnosticStore.swotModalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>
