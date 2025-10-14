<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import { useModalStore } from '@/shared/stores/modal.store'
import { toTypedSchema } from '@vee-validate/zod'
import useInventoryAuditStore from '@inventario/Operacion/AuditoriaDeInventarios/store/useInventoryAuditStore'
import DeleteProductForm from '@inventario/Operacion/AuditoriaDeInventarios/components/DeleteProductForm.vue'
import AddProductForm from '@inventario/Operacion/AuditoriaDeInventarios/components/AddProductForm.vue'
import {
    createUpdateProductInventoryAuditSchema,
    deleteProductSchema
} from '@inventario/Operacion/AuditoriaDeInventarios/validations/inventoryAuditSchema'
import { showNotification } from '@/utils/toastNotifications'

const inventoryAuditStore = useInventoryAuditStore()
const modalStore = useModalStore()

const initialValues = {
    id: inventoryAuditStore.currentProduct.id,
    productId: inventoryAuditStore.currentProduct.productId,
    productName: inventoryAuditStore.currentProduct.productName,
    realCount: inventoryAuditStore.currentProduct.realCount,
    expectedCount: inventoryAuditStore.currentProduct.expectedCount,
    difference: inventoryAuditStore.currentProduct.difference,
    note: inventoryAuditStore.currentProduct.note
}

const modalMap = {
    CREATE: {
        component: AddProductForm,
        action: inventoryAuditStore.addProduct,
        schemaValidation: createUpdateProductInventoryAuditSchema
    },
    UPDATE: {
        component: AddProductForm,
        action: inventoryAuditStore.updateProduct,
        schemaValidation: createUpdateProductInventoryAuditSchema
    },
    DELETE: {
        component: DeleteProductForm,
        action: inventoryAuditStore.removeItemProduct,
        schemaValidation: deleteProductSchema
    }
}

const mode = computed(() => modalStore.modals[inventoryAuditStore.modalId]?.type)
const currentSchema = computed(() => {
    return modalMap[mode.value]?.schemaValidation || modalMap.CREATE.schemaValidation
})

const { handleSubmit, isSubmitting, resetForm } = useForm({
    validationSchema: computed(() => toTypedSchema(currentSchema.value)),
    initialValues: initialValues,
    validateOnMount: false
})

watch(
    () => inventoryAuditStore.currentProduct,
    (newValue) => {
        if (newValue) {
            resetForm({ values: { ...newValue } })
        }
    }
)

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[inventoryAuditStore.modalId]?.type
    return modalMap[modalType]?.component
})

const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[inventoryAuditStore.modalId]?.type
    const action = modalMap[modalType]?.action
    try {
        const responseMessage = action(formValues)
        modalStore.close(inventoryAuditStore.modalId)
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
        :modalId="inventoryAuditStore.modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>
