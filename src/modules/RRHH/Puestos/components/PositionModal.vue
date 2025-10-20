<script setup lang="ts">
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import BaseModal from '@/shared/components/BaseModal.vue'
import PositionForm from '@/modules/RRHH/Puestos/components/PositionForm.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { positionSchema } from '@/modules/RRHH/Puestos/validations/positionValidation'
import { usePositionActions } from '@/modules/RRHH/Puestos/composables/usePositionActions'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    modalId: string
    onRefresh?: () => void
}>()

const modalStore = useModalStore()
const { createPosition, updatePosition } = usePositionActions()

const initialValues = {
    departmentId: 0,
    name: '',
    description: '',
    active: true
}

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: toTypedSchema(positionSchema),
    validateOnMount: false,
    initialValues: initialValues
})

// Watch for modal data changes (when editing)
watch(
    () => modalStore.modals[props.modalId]?.data,
    (data) => {
        if (data) {
            setValues({
                departmentId: data.departmentId,
                name: data.name,
                description: data.description,
                active: data.active
            })
        } else {
            // Reset form when creating new position
            resetForm({ values: initialValues })
        }
    },
    { immediate: true }
)

const isEditMode = computed(() => {
    return modalStore.modals[props.modalId]?.type === 'EDIT'
})

const onSubmit = handleSubmit(async (formValues) => {
    try {
        let result
        if (isEditMode.value) {
            const positionId = modalStore.modals[props.modalId]?.data?.id
            result = await updatePosition(positionId, formValues)
        } else {
            result = await createPosition(formValues)
        }

        showNotification(result.message, result.status)
        
        if (result.status === 'success') {
            props.onRefresh?.()
            modalStore.close(props.modalId)
        }
    } catch (error) {
        console.error('Error submitting position:', error)
        showNotification('Error al procesar la solicitud', 'error')
    }
})

const onClose = () => {
    resetForm({ values: initialValues })
}
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <PositionForm />
        </template>
    </BaseModal>
</template>
