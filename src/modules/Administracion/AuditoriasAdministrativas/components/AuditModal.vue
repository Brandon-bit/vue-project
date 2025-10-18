<script setup lang="ts">
import { computed, watch } from 'vue'
import { useAuditActions } from '../composables/useAuditActions'
import { useModalStore } from '@/shared/stores/modal.store'
import useAuditStore from '../store/auditStore'
import BaseModal from '@/shared/components/BaseModal.vue'
import { useForm } from 'vee-validate'
import AddEditAuditForm from './AddEditAuditForm.vue'
import DeleteAudit from './DeleteAudit.vue'
import { toTypedSchema } from '@vee-validate/zod'
import { auditSchema } from '../validation/auditValidation'
import { showNotification } from '@/utils/toastNotifications'
import type { AuditFormType } from '../types/auditTypes'

const props = defineProps<{
    onRefresh?: () => void
}>()

const { createAudit, editAudit, deleteAudit } = useAuditActions()
const modalStore = useModalStore()
const auditStore = useAuditStore()

const initialValues: AuditFormType = {
    nombre: auditStore.selectedAudit.nombre,
    tipo: auditStore.selectedAudit.tipo,
    area: auditStore.selectedAudit.area,
    auditor: auditStore.selectedAudit.auditor,
    fechaInicio: auditStore.selectedAudit.fechaInicio,
    fechaFin: auditStore.selectedAudit.fechaFin,
    objetivo: auditStore.selectedAudit.objetivo,
    activo: auditStore.selectedAudit.activo
}

const modalMap = {
    CREATE: {
        component: AddEditAuditForm,
        action: createAudit
    },
    EDIT: {
        component: AddEditAuditForm,
        action: editAudit
    },
    DELETE: {
        component: DeleteAudit,
        action: deleteAudit
    }
}

const {
    handleSubmit,
    isSubmitting,
    resetForm,
    setValues
} = useForm({
    validationSchema: toTypedSchema(auditSchema),
    validateOnMount: false,
    initialValues: initialValues
})

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[auditStore.auditModalId]?.type as keyof typeof modalMap
    if (!modalType) return undefined
    return modalMap[modalType]?.component
})

watch(
    () => auditStore.selectedAudit,
    (audit) => {
        if (audit) {
            setValues({
                nombre: audit.nombre,
                tipo: audit.tipo,
                area: audit.area,
                auditor: audit.auditor,
                fechaInicio: audit.fechaInicio,
                fechaFin: audit.fechaFin,
                objetivo: audit.objetivo,
                activo: audit.activo
            })
        }
    },
    { immediate: true }
)

const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[auditStore.auditModalId]?.type as keyof typeof modalMap
    if (!modalType) return
    const action = modalMap[modalType]?.action
    try {
        const { message, status } = await action(formValues)
        showNotification(message, status)
        if (status === "success") props.onRefresh?.()
        modalStore.close(auditStore.auditModalId)
    } catch (error) {
        console.error(error)
    }
})

const onClose = () => {
    resetForm()
    auditStore.setAuditData()
}
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="auditStore.auditModalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>
