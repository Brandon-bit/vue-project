<script setup lang="ts">
// #region Imports
import { computed, watch } from 'vue'
import { useBrandActions } from '@inventario/ConfiguracionDeInventario/Marcas/composables/useBrandActions'
import { useModalStore } from '@/shared/stores/modal.store'
import useBrandStore from '@inventario/ConfiguracionDeInventario/Marcas/store/brand.store'
import BaseModal from '@/shared/components/BaseModal.vue'
import { useForm } from 'vee-validate'
import AddEditBrandForm from '@inventario/ConfiguracionDeInventario/Marcas/components/AddEditBrandForm.vue'
import DeleteBrand from '@inventario/ConfiguracionDeInventario/Marcas/components/DeleteBrand.vue'
import { toTypedSchema } from '@vee-validate/zod'
import { createBrandSchema } from '@inventario/ConfiguracionDeInventario/Marcas/validations/brandValidation'
import { BrandType } from '@inventario/ConfiguracionDeInventario/Marcas/types/brandType'

// #endregion

// #region Data
const { createBrand, editBrand, deleteBrand } = useBrandActions()
const modalStore = useModalStore()
const brandStore = useBrandStore()

const initialValues: BrandType = {
    name: brandStore.selectedBrand.name,
    image: brandStore.selectedBrand.image,
    active: brandStore.selectedBrand.active,
    creationDate: brandStore.selectedBrand.creationDate,
    imageUrl: brandStore.selectedBrand.imageUrl
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
                image: brand.image,
                active: brand.active
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
        const { message, status, data } = await action(formValues)
        console.log(message)
        console.log(status)
        console.log(data)
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
