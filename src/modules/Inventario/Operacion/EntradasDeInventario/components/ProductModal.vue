<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import { useModalStore } from '@/shared/stores/modal.store'
import { toTypedSchema } from '@vee-validate/zod'
import useInventoryEntriesStore from '@inventario/Operacion/EntradasDeInventario/store/useInventoryEntriesStore'
import DeleteProductForm from '@inventario/Operacion/EntradasDeInventario/components/DeleteProductForm.vue'
import AddProductForm from '@inventario/Operacion/EntradasDeInventario/components/AddProductForm.vue'
import {
    addInventoryEntryProductSchema,
    deleteProductSchema
} from '@inventario/Operacion/EntradasDeInventario/validations/inventoryEntrySchema'
import { showNotification } from '@/utils/toastNotifications'

const inventoryEntriesStore = useInventoryEntriesStore()
const modalStore = useModalStore()

const initialValues = {
    id: inventoryEntriesStore.currentProduct.id,
    productId: inventoryEntriesStore.currentProduct.productId,
    productName: inventoryEntriesStore.currentProduct.productName,
    quantity: inventoryEntriesStore.currentProduct.quantity,
    unitPrice: inventoryEntriesStore.currentProduct.unitPrice,
    subtotal: inventoryEntriesStore.currentProduct.subtotal,
    batch: inventoryEntriesStore.currentProduct.batch,
    expirationDate: inventoryEntriesStore.currentProduct.expirationDate
}

const modalMap = {
    CREATE: {
        component: AddProductForm,
        action: inventoryEntriesStore.addProduct,
        schemaValidation: addInventoryEntryProductSchema
    },
    UPDATE: {
        component: AddProductForm,
        action: inventoryEntriesStore.updateProduct,
        schemaValidation: addInventoryEntryProductSchema
    },
    DELETE: {
        component: DeleteProductForm,
        action: inventoryEntriesStore.removeItemProduct,
        schemaValidation: deleteProductSchema
    }
}

const mode = computed(() => modalStore.modals[inventoryEntriesStore.modalId]?.type)
const currentSchema = computed(() => {
    return modalMap[mode.value]?.schemaValidation || modalMap.CREATE.schemaValidation
})

const { handleSubmit, isSubmitting, resetForm } = useForm({
    validationSchema: computed(() => toTypedSchema(currentSchema.value)),
    initialValues: initialValues,
    validateOnMount: false
})

watch(
    () => inventoryEntriesStore.currentProduct,
    (newValue) => {
        if (newValue) {
            resetForm({ values: { ...newValue } })
        }
    }
)

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[inventoryEntriesStore.modalId]?.type
    return modalMap[modalType]?.component
})

const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[inventoryEntriesStore.modalId]?.type
    const action = modalMap[modalType]?.action
    try {
        const responseMessage = action(formValues)
        modalStore.close(inventoryEntriesStore.modalId)
        resetForm()
        showNotification(responseMessage, 'success')
    } catch (error) {
        console.error(error)
    }
})

const onClose = () => {
    resetForm()
}
</script>
<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="inventoryEntriesStore.modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>
