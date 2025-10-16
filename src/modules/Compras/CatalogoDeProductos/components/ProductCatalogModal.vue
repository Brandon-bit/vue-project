<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import useProductCatalogStore from '@/modules/Compras/CatalogoDeProductos/store/productCatalogStore'
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import DeleteProductCatalog from '@/modules/Compras/CatalogoDeProductos/components/DeleteProductCatalog.vue'
import ProductCatalogForm from '@/modules/Compras/CatalogoDeProductos/components/ProductCatalogForm.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { productCatalogSchema } from '@/modules/Compras/CatalogoDeProductos/validations/productCatalogValidation'
import { toTypedSchema } from '@vee-validate/zod'
import { useProductCatalogActions } from '@/modules/Compras/CatalogoDeProductos/composables/useProductCatalogActions'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    onRefresh?: () => void
}>()

const productCatalogStore = useProductCatalogStore()
const modalStore = useModalStore()
const { createProduct, updateProduct, deleteProduct } = useProductCatalogActions()

const initialValues = {
    code: productCatalogStore.selectedProduct?.code || '',
    name: productCatalogStore.selectedProduct?.name || '',
    category: productCatalogStore.selectedProduct?.category || '',
    unit: productCatalogStore.selectedProduct?.unit || '',
    estimatedCost: productCatalogStore.selectedProduct?.estimatedCost || 0,
    preferredSupplier: productCatalogStore.selectedProduct?.preferredSupplier || '',
    accountingAccount: productCatalogStore.selectedProduct?.accountingAccount || '',
    description: productCatalogStore.selectedProduct?.description || ''
}

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: toTypedSchema(productCatalogSchema),
    validateOnMount: false,
    initialValues: initialValues
})

watch(
    () => productCatalogStore.selectedProduct,
    (product) => {
        if (product) {
            setValues({
                code: product?.code || '',
                name: product?.name || '',
                category: product?.category || '',
                unit: product?.unit || '',
                estimatedCost: product?.estimatedCost || 0,
                preferredSupplier: product?.preferredSupplier || '',
                accountingAccount: product?.accountingAccount || '',
                description: product?.description || ''
            })
        }
    },
    { immediate: true }
)

const modalMap = {
    CREATE: {
        component: ProductCatalogForm,
        action: createProduct
    },
    EDIT: {
        component: ProductCatalogForm,
        action: updateProduct
    },
    DELETE: {
        component: DeleteProductCatalog,
        action: deleteProduct
    }
}

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[productCatalogStore.modalId]?.type as keyof typeof modalMap
    return modalMap[modalType]?.component
})

const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[productCatalogStore.modalId]?.type as keyof typeof modalMap
    
    try {
        let result
        if (modalType === 'EDIT') {
            const id = productCatalogStore.selectedProduct?.id || 0
            result = await updateProduct(id, formValues)
        } else if (modalType === 'DELETE') {
            const id = productCatalogStore.selectedProduct?.id || 0
            result = await deleteProduct(id)
        } else {
            result = await createProduct(formValues)
        }
        
        showNotification(result.message, result.status)
        if (result.status === 'success') props.onRefresh?.()
        modalStore.close(productCatalogStore.modalId)
    } catch (error) {
        console.error(error)
        showNotification('Error al procesar la solicitud', 'error')
    }
})

const onClose = () => {
    resetForm()
    productCatalogStore.setData()
}
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="productCatalogStore.modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>
