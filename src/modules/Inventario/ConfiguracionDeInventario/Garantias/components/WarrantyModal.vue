<script setup lang="ts">
import { computed, watch } from 'vue'
import { useWarrantyActions } from '@inventario/ConfiguracionDeInventario/Garantias/composables/useWarrantyActions'
import { useModalStore } from '@/shared/stores/modal.store'
import useWarrantyStore from '@/modules/Inventario/ConfiguracionDeInventario/Garantias/store/warrantyStore'
import BaseModal from '@/shared/components/BaseModal.vue'
import { useForm } from 'vee-validate'
import AddEditWarrantyForm from '@inventario/ConfiguracionDeInventario/Garantias/components/AddEditWarrantyForm.vue'
import DeleteWarranty from '@inventario/ConfiguracionDeInventario/Garantias/components/DeleteWarranty.vue'
import { toTypedSchema } from '@vee-validate/zod'
import { createWarrantySchema } from '@inventario/ConfiguracionDeInventario/Garantias/validation/warrantyValidation'
import { showNotification } from '@/utils/toastNotifications'
import { WarrantyFormType } from '../types/warrantyTypes'

const props = defineProps<{
  onRefresh?: () => void
}>()

// #region Data
const { createWarranty, editWarranty, deleteWarranty } = useWarrantyActions()
const modalStore = useModalStore()
const warrantyStore = useWarrantyStore()

const initialValues : WarrantyFormType = {
    name: warrantyStore.selectedWarranty.name,
    duration: warrantyStore.selectedWarranty.duration,
    period: warrantyStore.selectedWarranty.period,
    description: warrantyStore.selectedWarranty.description,
    active: warrantyStore.selectedWarranty.active,
}

const modalMap = {
    CREATE: {
        component: AddEditWarrantyForm,
        action: createWarranty
    },
    EDIT: {
        component: AddEditWarrantyForm,
        action: editWarranty
    },
    DELETE: {
        component: DeleteWarranty,
        action: deleteWarranty
    }
}

const {
    handleSubmit,
    isSubmitting,
    resetForm,
    setValues
} = useForm({
    validationSchema: toTypedSchema(createWarrantySchema),
    validateOnMount: false,
    initialValues: initialValues
})
// #endregion

// #region Computed
const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[warrantyStore.modalId]?.type
    return modalMap[modalType]?.component
})
// #endregion

// #region Watch
watch(
    () => warrantyStore.selectedWarranty,
    (warranty) => {
        if (warranty) {
            setValues({
                name: warranty.name,
                duration: warranty.duration,
                period: warranty.period,
                description: warranty.description,
                active: warranty.active
            })
        }
    },
    { immediate: true }
)
// #endregion

// #region Methods
const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[warrantyStore.modalId].type
    const action = modalMap[modalType]?.action
    try {
        const { message, status } = await action(formValues)
        showNotification(message, status)
        if(status == "success") props.onRefresh?.()
        modalStore.close(warrantyStore.modalId)
    } catch (error) {
        console.error(error)
    }
})

const onClose = () => {
    resetForm()
    warrantyStore.setData()
}
// #endregion
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="warrantyStore.modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>

