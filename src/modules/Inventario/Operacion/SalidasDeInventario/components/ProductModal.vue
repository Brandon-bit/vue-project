<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import { useModalStore } from '@/shared/stores/modal.store'
import { toTypedSchema } from '@vee-validate/zod'
import useInventoryWithdrawalsStore from '@inventario/Operacion/SalidasDeInventario/store/useInventoryWithdrawalsStore'
import DeleteProductForm from '@inventario/Operacion/EntradasDeInventario/components/DeleteProductForm.vue'
import AddProductForm from '@inventario/Operacion/EntradasDeInventario/components/AddProductForm.vue'
import {
    addInventoryEntryProductSchema,
    deleteProductSchema
} from '@inventario/Operacion/EntradasDeInventario/validations/inventoryEntrySchema'
import { showNotification } from '@/utils/toastNotifications'

const inventoryWithdrawalsStore = useInventoryWithdrawalsStore()
const modalStore = useModalStore()

const initialValues = {
    id: inventoryWithdrawalsStore.currentProduct.id,
    productId: inventoryWithdrawalsStore.currentProduct.productId,
    productName: inventoryWithdrawalsStore.currentProduct.productName,
    quantity: inventoryWithdrawalsStore.currentProduct.quantity,
    unitPrice: inventoryWithdrawalsStore.currentProduct.unitPrice,
    subtotal: inventoryWithdrawalsStore.currentProduct.subtotal,
    batch: inventoryWithdrawalsStore.currentProduct.batch,
    expirationDate: inventoryWithdrawalsStore.currentProduct.expirationDate
}

const modalMap = {
    CREATE: {
        component: AddProductForm,
        action: inventoryWithdrawalsStore.addProduct,
        schemaValidation: addInventoryEntryProductSchema
    },
    UPDATE: {
        component: AddProductForm,
        action: inventoryWithdrawalsStore.updateProduct,
        schemaValidation: addInventoryEntryProductSchema
    },
    DELETE: {
        component: DeleteProductForm,
        action: inventoryWithdrawalsStore.removeItemProduct,
        schemaValidation: deleteProductSchema
    }
}

const mode = computed(() => modalStore.modals[inventoryWithdrawalsStore.modalId]?.type)
const currentSchema = computed(() => {
    return modalMap[mode.value]?.schemaValidation || modalMap.CREATE.schemaValidation
})

const { handleSubmit, isSubmitting, resetForm } = useForm({
    validationSchema: computed(() => toTypedSchema(currentSchema.value)),
    initialValues: initialValues,
    validateOnMount: false
})

watch(
    () => inventoryWithdrawalsStore.currentProduct,
    (newValue) => {
        if (newValue) {
            resetForm({ values: { ...newValue } })
        }
    }
)

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[inventoryWithdrawalsStore.modalId]?.type
    return modalMap[modalType]?.component
})

const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[inventoryWithdrawalsStore.modalId]?.type
    const action = modalMap[modalType]?.action
    try {
        const responseMessage = action(formValues)
        modalStore.close(inventoryWithdrawalsStore.modalId)
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
        :modalId="inventoryWithdrawalsStore.modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>
