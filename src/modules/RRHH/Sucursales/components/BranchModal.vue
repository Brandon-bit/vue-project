<script setup lang="ts">
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import BaseModal from '@/shared/components/BaseModal.vue'
import BranchForm from '@/modules/RRHH/Sucursales/components/BranchForm.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { branchSchema } from '@/modules/RRHH/Sucursales/validations/branchValidation'
import { useBranchActions } from '@/modules/RRHH/Sucursales/composables/useBranchActions'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    modalId: string
    onRefresh?: () => void
}>()

const modalStore = useModalStore()
const { createBranch, updateBranch } = useBranchActions()

const initialValues = {
    companyId: 0,
    name: '',
    address: '',
    phone: '',
    active: true
}

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: toTypedSchema(branchSchema),
    validateOnMount: false,
    initialValues: initialValues
})

// Watch for modal data changes (when editing)
watch(
    () => modalStore.modals[props.modalId]?.data,
    (data) => {
        if (data) {
            setValues({
                companyId: data.companyId,
                name: data.name,
                address: data.address,
                phone: data.phone,
                active: data.active
            })
        } else {
            // Reset form when creating new branch
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
            const branchId = modalStore.modals[props.modalId]?.data?.id
            result = await updateBranch(branchId, formValues)
        } else {
            result = await createBranch(formValues)
        }

        showNotification(result.message, result.status)
        
        if (result.status === 'success') {
            props.onRefresh?.()
            modalStore.close(props.modalId)
        }
    } catch (error) {
        console.error('Error submitting branch:', error)
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
            <BranchForm />
        </template>
    </BaseModal>
</template>
