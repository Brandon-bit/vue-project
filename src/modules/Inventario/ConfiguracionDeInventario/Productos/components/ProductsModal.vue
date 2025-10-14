<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import BaseModal from '@/shared/components/BaseModal.vue'
import DeleteProduct from '@inventario/ConfiguracionDeInventario/Productos/components/DeleteProduct.vue'
import { useProductsActions } from '@inventario/ConfiguracionDeInventario/Productos/composables/useProductsActions'
import { useModalStore } from '@/shared/stores/modal.store'
import useProductsStore from '@inventario/ConfiguracionDeInventario/Productos/store/productsStore'
import BulkUploadForm from '@inventario/ConfiguracionDeInventario/Productos/components/BulkUploadForm.vue'
import { bulkProductSchema } from '@inventario/ConfiguracionDeInventario/Productos/validations/productsValidation'

const { deleteProduct, uploadBulkProducts } = useProductsActions()
const modalStore = useModalStore()
const productsStore = useProductsStore()

const initialValues = {
    //archivo: productsStore.selectedProduct?.archivo,
    name: productsStore.selectedProduct?.name
}

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: toTypedSchema(bulkProductSchema),
    validateOnMount: false,
    initialValues: initialValues
})

watch(
    () => productsStore.selectedProduct,
    (product) => {
        if (product) {
            setValues({
                name: product?.name,
                //archivo: product?.archivo
            })
        }
    },
    { immediate: true }
)

const modalMap = {
    DELETE: {
        component: DeleteProduct,
        action: deleteProduct
    },
    LOAD: {
        component: BulkUploadForm,
        action: uploadBulkProducts
    }
}

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[productsStore.modalId]?.type
    return modalMap[modalType]?.component
})

const onSubmit = handleSubmit(async (formValues) => {
    console.log(formValues)
    return
    const modalType = modalStore.modals[productsStore.modalId]?.type
    const action = modalMap[modalType]?.action
    try {
        const { message, status, data } = await action(formValues)
    } catch (error) {
        console.error(error)
    }
})

const onClose = () => {
    resetForm()
    productsStore.setData()
}
</script>
<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="productsStore.modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>
