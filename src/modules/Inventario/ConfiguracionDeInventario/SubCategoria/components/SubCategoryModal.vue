<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import useSubCategoryStore from '@inventario/ConfiguracionDeInventario/SubCategoria/store/subCategoryStore'
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import DeleteSubCategory from '@inventario/ConfiguracionDeInventario/SubCategoria/components/DeleteSubCategory.vue'
import AddEditSubCategoryForm from '@inventario/ConfiguracionDeInventario/SubCategoria/components/AddEditSubCategoryForm.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { subCategorySchema } from '@inventario/ConfiguracionDeInventario/SubCategoria/validations/subCategoryValidation'
import { toTypedSchema } from '@vee-validate/zod'
import { useSubCategoryActions } from '@/modules/Inventario/ConfiguracionDeInventario/SubCategoria/composables/useSubCategoryActions'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
  onRefresh?: () => void
}>()

const subCategoryStore = useSubCategoryStore()
const modalStore = useModalStore()
const { createSubCategory, editSubCategory, deleteSubCategory } = useSubCategoryActions()

const initialValues = {
    name: subCategoryStore.selectedSubCategory?.name,
    parentCategoryId: subCategoryStore.selectedSubCategory?.parentCategoryId,
    slug: subCategoryStore.selectedSubCategory?.slug,
    status: subCategoryStore.selectedSubCategory?.status,
    removeImage: false
}

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: toTypedSchema(subCategorySchema),
    validateOnMount: false,
    initialValues: initialValues
})

watch(
    () => subCategoryStore.selectedSubCategory,
    (category) => {
        if (category) {
            setValues({
                name: category?.name,
                slug: category?.slug,
                status: category?.status,
                removeImage: false,
                parentCategoryId: category?.parentCategoryId
            })
        }
    },
    { immediate: true }
)

const modalMap = {
    CREATE: {
        component: AddEditSubCategoryForm,
        action: createSubCategory
    },
    EDIT: {
        component: AddEditSubCategoryForm,
        action: editSubCategory
    },
    DELETE: {
        component: DeleteSubCategory,
        action: deleteSubCategory
    }
}

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[subCategoryStore.modalId]?.type
    return modalMap[modalType]?.component
})

const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[subCategoryStore.modalId]?.type
    const action = modalMap[modalType]?.action
    try {
        const { message, status } = await action(formValues)
        showNotification(message, status)
        if(status == "success") props.onRefresh?.()
        modalStore.close(subCategoryStore.modalId)
        onClose()
    } catch (error) {
        console.error(error)
    }
})

const onClose = () => {
    resetForm()
    subCategoryStore.setData()
}

</script>
<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="subCategoryStore.modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>
