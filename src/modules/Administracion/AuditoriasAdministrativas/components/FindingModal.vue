<script setup lang="ts">
import { computed, watch } from 'vue'
import { useAuditActions } from '../composables/useAuditActions'
import { useModalStore } from '@/shared/stores/modal.store'
import useAuditStore from '../store/auditStore'
import BaseModal from '@/shared/components/BaseModal.vue'
import { useForm } from 'vee-validate'
import AddEditFindingForm from './AddEditFindingForm.vue'
import { toTypedSchema } from '@vee-validate/zod'
import { findingSchema } from '../validation/auditValidation'
import { showNotification } from '@/utils/toastNotifications'
import type { FindingFormType } from '../types/auditTypes'

const props = defineProps<{
    onRefresh?: () => void
}>()

const { createFinding, editFinding } = useAuditActions()
const modalStore = useModalStore()
const auditStore = useAuditStore()

const initialValues: FindingFormType = {
    auditoriaId: auditStore.selectedFinding.auditoriaId,
    severidad: auditStore.selectedFinding.severidad,
    descripcion: auditStore.selectedFinding.descripcion,
    responsable: auditStore.selectedFinding.responsable,
    fechaLimite: auditStore.selectedFinding.fechaLimite,
    estado: auditStore.selectedFinding.estado
}

const modalMap = {
    CREATE: {
        component: AddEditFindingForm,
        action: createFinding
    },
    EDIT: {
        component: AddEditFindingForm,
        action: editFinding
    }
}

const {
    handleSubmit,
    isSubmitting,
    resetForm,
    setValues
} = useForm({
    validationSchema: toTypedSchema(findingSchema),
    validateOnMount: false,
    initialValues: initialValues
})

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[auditStore.findingModalId]?.type as keyof typeof modalMap
    if (!modalType) return undefined
    return modalMap[modalType]?.component
})

watch(
    () => auditStore.selectedFinding,
    (finding) => {
        if (finding) {
            setValues({
                auditoriaId: finding.auditoriaId,
                severidad: finding.severidad,
                descripcion: finding.descripcion,
                responsable: finding.responsable,
                fechaLimite: finding.fechaLimite,
                estado: finding.estado
            })
        }
    },
    { immediate: true }
)

const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[auditStore.findingModalId]?.type as keyof typeof modalMap
    if (!modalType) return
    const action = modalMap[modalType]?.action
    try {
        const { message, status } = await action(formValues)
        showNotification(message, status)
        if (status === "success") props.onRefresh?.()
        modalStore.close(auditStore.findingModalId)
    } catch (error) {
        console.error(error)
    }
})

const onClose = () => {
    resetForm()
    auditStore.setFindingData()
    auditStore.setChecklistItem(null)
}
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="auditStore.findingModalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>
