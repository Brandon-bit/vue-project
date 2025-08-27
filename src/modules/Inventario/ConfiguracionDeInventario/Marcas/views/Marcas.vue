<script setup lang="ts">
// #region Imports
import BaseTable from '@/shared/components/BaseTable.vue'
import { onMounted, ref, computed, watch } from 'vue'
import { useBrand } from '../composables/useBrand'
import { useBrandActions } from '../composables/useBrandActions'
import { useModalStore } from '@/shared/stores/modal.store'
import BaseButton from '@/shared/components/BaseButton.vue'
import useBrandStore from '../store/brand.store'
import BaseModal from '@/shared/components/BaseModal.vue'
import { useForm } from 'vee-validate'
import AddEditBrandForm from '../components/AddEditBrandForm.vue'
import DeleteBrand from '../components/DeleteBrand.vue'
import { toTypedSchema } from '@vee-validate/zod'
import { createBrandSchema } from '../validations/brandValidation';
import { BrandType } from '../types/brandType'
// #endregion

// #region Data
let loading = ref<boolean>(false)
const { getBrands, getBrandsTableColumns } = useBrand()
const { createBrand, editBrand, deleteBrand } = useBrandActions()
const modalStore = useModalStore()
const brandStore = useBrandStore()

const initialValues : BrandType = {
    name: brandStore.selectedBrand.name,
    image: brandStore.selectedBrand.image,
    active: brandStore.selectedBrand.active,
    creationDate:  brandStore.selectedBrand.creationDate,
    imageUrl:  brandStore.selectedBrand.imageUrl
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

const {
    handleSubmit,
    isSubmitting,
    resetForm,
    setValues
} = useForm({
    validationSchema: toTypedSchema(createBrandSchema),
    validateOnMount: false,
    initialValues: initialValues
})
// #endregion

// #region OnMounted
onMounted(async () => {
    // Once the view is rendered, the data is loaded 
    loading.value = true
    await getBrands()
    loading.value = false
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

const openCreateModal = () => {
    brandStore.setData()
    modalStore.open(brandStore.modalId, { type: 'CREATE', title: 'Crear categoría' })
}
// #endregion
</script>

<template>
    <!-- MAIN VIEW -->
    <h2>Marcas</h2>
    <BaseButton text="Nueva Marca" @click="openCreateModal()" icon="add" />
    
    <p v-if="loading">Cargando...</p>
    <BaseTable v-else :data="brandStore.brands" :headers="getBrandsTableColumns()"/>

    <!-- MODAL -->
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

