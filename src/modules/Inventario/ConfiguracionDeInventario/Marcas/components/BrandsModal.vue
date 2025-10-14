<script setup lang="ts">
// #region Imports
import { computed, watch } from 'vue'
import { useBrandActions } from '@inventario/ConfiguracionDeInventario/Marcas/composables/useBrandActions'
import { useModalStore } from '@/shared/stores/modal.store'
import useBrandStore from '@/modules/Inventario/ConfiguracionDeInventario/Marcas/store/brandStore'
import BaseModal from '@/shared/components/BaseModal.vue'
import { useForm } from 'vee-validate'
import AddEditBrandForm from '@inventario/ConfiguracionDeInventario/Marcas/components/AddEditBrandForm.vue'
import DeleteBrand from '@inventario/ConfiguracionDeInventario/Marcas/components/DeleteBrand.vue'
import { toTypedSchema } from '@vee-validate/zod'
import { createBrandSchema } from '@inventario/ConfiguracionDeInventario/Marcas/validations/brandValidation'
import { showNotification } from '@/utils/toastNotifications'
// #endregion

const props = defineProps<{
  onRefresh?: () => void
}>()


// #region Data
const { createBrand, editBrand, deleteBrand } = useBrandActions()
const modalStore = useModalStore()
const brandStore = useBrandStore()

const initialValues = {
    name: brandStore.selectedBrand?.name,
    active: brandStore.selectedBrand?.active,
    imageUrl: brandStore.selectedBrand?.imageUrl,
    removeImage: false
}

const modalMap = {
    CREATE: {
        component: AddEditBrandForm,
        action: createBrand
    },
    EDIT: {
        component: AddEditBrandForm,
        action: editBrand
    },
    DELETE: {
        component: DeleteBrand,
        action: deleteBrand
    }
}

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: toTypedSchema(createBrandSchema),
    validateOnMount: false,
    initialValues: initialValues
})
// #endregion

// #region Computed
const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[brandStore.modalId]?.type
    return modalMap[modalType]?.component
})
// #endregion

// #region Watch
watch(
    () => brandStore.selectedBrand,
    (brand) => {
        if (brand) {
            setValues({
                name: brand.name,
                active: brand.active,
                removeImage: false
            })
        }
    },
    { immediate: true }
)
// #endregion

// #region Methods
const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[brandStore.modalId].type
    const action = modalMap[modalType]?.action
    try {
        const { message, status } = await action(formValues)
        showNotification(message, status)
        if(status == "success") props.onRefresh?.()
        modalStore.close(brandStore.modalId)
    } catch (error) {
        console.error(error)
    }
})

const onClose = () => {
    resetForm()
    brandStore.setData()
}
// #endregion
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="brandStore.modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>
