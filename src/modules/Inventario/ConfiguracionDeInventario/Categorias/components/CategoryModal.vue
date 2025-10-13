<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import useCategoryStore from '@inventario/ConfiguracionDeInventario/Categorias/store/categoryStore'
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import DeleteCategory from '@inventario/ConfiguracionDeInventario/Categorias/components/DeleteCategory.vue'
import AddEditForm from '@inventario/ConfiguracionDeInventario/Categorias/components/AddEditForm.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { categorySchema } from '@inventario/ConfiguracionDeInventario/Categorias/validations/categoryValidation'
import { toTypedSchema } from '@vee-validate/zod'
import { useCategoryActions } from '@/modules/Inventario/ConfiguracionDeInventario/Categorias/composables/useCategoryActions'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
  onRefresh?: () => void
}>()

const categoryStore = useCategoryStore()
const modalStore = useModalStore()
const { createCategory, editCategory, deleteCategory } = useCategoryActions()

const initialValues = {
    name: categoryStore.selectedCategory.name,
    slug: categoryStore.selectedCategory.slug,
    status: categoryStore.selectedCategory.status,
    removeImage: false
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
                slug: category?.slug,
                status: category?.status,
                removeImage: false
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
        const { message, status } = await action(formValues)
        showNotification(message, status)
        if(status == "success") props.onRefresh?.()
        modalStore.close(categoryStore.modalId)
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
