<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import BaseSkeletonTable from '@/shared/components/BaseSkeletonTable.vue'
import { useCategory } from '../composables/useCategory'
import useCategoryStore from '../store/category.store'
import { onMounted, ref, computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import DeleteCategory from '../components/DeleteCategory.vue'
import AddEditForm from '../components/AddEditForm.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { categorySchema } from '../validations/categoryValidation'
import { toTypedSchema } from '@vee-validate/zod'
import { useCategoryAction } from '../composables/useCategoryAction'

const { getCategories, getTableColumns } = useCategory()
const categoryStore = useCategoryStore()
const modalStore = useModalStore()
let loading = ref<boolean>(false)
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

onMounted(async () => {
    loading.value = true
    await getCategories()
    setTimeout(() => {
        loading.value = false
    }, 500)
})

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

const openCreateModal = () => {
    categoryStore.setData()
    modalStore.open(categoryStore.modalId, { type: 'CREATE', title: 'Crear categoría' })
}
</script>
<template>
    <h2 class="text-center mb-8">Categorías</h2>

    <div class="mb-10 text-right">
        <BaseButton text="Crear categoría" @click="openCreateModal" />
    </div>
    <BaseSkeletonTable v-if="loading" />
    <BaseTable v-else :data="categoryStore.categories" :headers="getTableColumns()" />
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
<style></style>
