<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import useCategoryStore from '@inventario/ConfiguracionDeInventario/Categorias/store/category.store'
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import DeleteCategory from '@inventario/ConfiguracionDeInventario/Categorias/components/DeleteCategory.vue'
import AddEditForm from '@inventario/ConfiguracionDeInventario/Categorias/components/AddEditForm.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { categorySchema } from '@inventario/ConfiguracionDeInventario/Categorias/validations/categoryValidation'
import { toTypedSchema } from '@vee-validate/zod'
import { useCategoryAction } from '@inventario/ConfiguracionDeInventario/Categorias/composables/useCategoryAction'

const categoryStore = useCategoryStore()
const modalStore = useModalStore()
const { createCategory, editCategory, deleteCategory } = useCategoryAction()

const initialValues = {
    name: categoryStore.selectedCategory?.name,
    sufix: categoryStore.selectedCategory?.sufix,
    status: categoryStore.selectedCategory?.status
}

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: toTypedSchema(categorySchema),
    validateOnMount: false,
    initialValues: initialValues
})

watch(
    () => categoryStore.selectedCategory,
    (category) => {
        if (category) {
            setValues({
                name: category?.name,
                sufix: category?.sufix,
                status: category?.status
            })
        }
    },
    { immediate: true }
)

const modalMap = {
    CREATE: {
        component: AddEditForm,
        action: createCategory
    },
    EDIT: {
        component: AddEditForm,
        action: editCategory
    },
    DELETE: {
        component: DeleteCategory,
        action: deleteCategory
    }
}

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[categoryStore.modalId]?.type
    return modalMap[modalType]?.component
})

const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[categoryStore.modalId]?.type
    const action = modalMap[modalType]?.action
    try {
        const { message, status, data } = await action(formValues)
    } catch (error) {
        console.error(error)
    }
})

const onClose = () => {
    resetForm()
    categoryStore.setData()
}

</script>
<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="categoryStore.modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>