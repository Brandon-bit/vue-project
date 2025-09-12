<script setup lang="ts">
// #region Imports
import BaseTable from '@/shared/components/BaseTable.vue'
import { onMounted, ref, computed, watch } from 'vue'
import { useSubCategory } from '../composables/useSubCategory'
import { useSubCategoryActions } from '../composables/useActionsSubCategory'
import { useModalStore } from '@/shared/stores/modal.store'
import BaseButton from '@/shared/components/BaseButton.vue'
import useSubCategoryStore from '@/modules/Inventario/ConfiguracionDeInventario/SubCategoria/store/subcategory.store'
import BaseModal from '@/shared/components/BaseModal.vue'
import { useForm } from 'vee-validate'
import AddEditForm from '@/modules/Inventario/ConfiguracionDeInventario/SubCategoria/components/addEditForm.vue'
import DeleteSubCategory from '@/modules/Inventario/ConfiguracionDeInventario/SubCategoria/components/deleteModal.vue'
import { toTypedSchema } from '@vee-validate/zod'
import { subCategorySchema } from '../validations/subCategoryValidation'
import { SubCategoryType } from '../types/subCategoryType'
// #endregion

// #region Data
let loading = ref<boolean>(false)
const { getTableColumns } = useSubCategory()
const { createSubCategory, editSubCategory, deleteSubCategory } = useSubCategoryActions()
const modalStore = useModalStore()
const subCategoryStore = useSubCategoryStore()

const initialValues: SubCategoryType = {
    name: subCategoryStore.selectedSubCategory?.name || '',
    code: subCategoryStore.selectedSubCategory?.code || '',
    description: subCategoryStore.selectedSubCategory?.description || '',
    categoryId: subCategoryStore.selectedSubCategory?.categoryId || null,
    status: subCategoryStore.selectedSubCategory?.status ?? true,
    creationDate: subCategoryStore.selectedSubCategory?.creationDate || '',
    id: subCategoryStore.selectedSubCategory?.id || null
}

const modalMap = {
    CREATE: {
        component: AddEditForm,
        action: createSubCategory
    },
    EDIT: {
        component: AddEditForm,
        action: editSubCategory
    },
    DELETE: {
        component: DeleteSubCategory,
        action: deleteSubCategory
    }
}

const {
    handleSubmit,
    isSubmitting,
    resetForm,
    setValues
} = useForm({
    validationSchema: toTypedSchema(subCategorySchema),
    validateOnMount: false,
    initialValues: initialValues
})
// #endregion

// #region OnMounted
onMounted(async () => {
    // Once the view is rendered, the data is loaded 
    loading.value = true
    await subCategoryStore.fetchSubCategories()
    loading.value = false
})
// #endregion

// #region Computed
const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[subCategoryStore.modalId]?.type
    return modalMap[modalType]?.component
})
// #endregion

// #region Watch
watch(
    () => subCategoryStore.selectedSubCategory,
    (subCategory) => {
        if (subCategory) {

            console.log("AAAAAAAAA", subCategory);
            setValues({
                name: subCategory.label,
                code: subCategory.code,
                description: subCategory.description,
                categoryId: subCategory.categoryId,
                status: subCategory.status
            })
        }
    },
    { immediate: true }
)
// #endregion

// #region Methods
const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[subCategoryStore.modalId].type
    const action = modalMap[modalType]?.action
    try {
        const { message, success, data } = await action(formValues)
        console.log(message)
        console.log(success)
        console.log(data)
        
        if (success) {
            // Recargar datos y cerrar modal
            await subCategoryStore.fetchSubCategories()
            modalStore.close(subCategoryStore.modalId)
            onClose()
        }
    } catch (error) {
        console.error(error)
    }
})

const onClose = () => {
    resetForm()
    subCategoryStore.setData()
}

const openCreateModal = () => {
    subCategoryStore.setData()
    modalStore.open(subCategoryStore.modalId, { type: 'CREATE', title: 'Crear Subcategoría' })
}
// #endregion
</script>

<template>
    <!-- MAIN VIEW -->
    <h2 class="">Sub categorías</h2>
    <BaseButton text="Nueva Subcategoría" @click="openCreateModal()" icon="add" className="mb-3"/>
    
    <p v-if="loading">Cargando...</p>
    <BaseTable 
        v-else 
        :data="subCategoryStore.subcategories" 
        :headers="getTableColumns()"
    />

    <!-- MODAL -->
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