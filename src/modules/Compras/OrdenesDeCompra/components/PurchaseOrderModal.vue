<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import usePurchaseOrderStore from '@/modules/Compras/OrdenesDeCompra/store/purchaseOrderStore'
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import PurchaseOrderForm from '@/modules/Compras/OrdenesDeCompra/components/PurchaseOrderForm.vue'
import PurchaseOrderDetail from '@/modules/Compras/OrdenesDeCompra/components/PurchaseOrderDetail.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { purchaseOrderSchema } from '@/modules/Compras/OrdenesDeCompra/validations/purchaseOrderValidation'
import { toTypedSchema } from '@vee-validate/zod'
import { usePurchaseOrderActions } from '@/modules/Compras/OrdenesDeCompra/composables/usePurchaseOrderActions'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    onRefresh?: () => void
}>()

const purchaseOrderStore = usePurchaseOrderStore()
const modalStore = useModalStore()
const { createPurchaseOrder } = usePurchaseOrderActions()

const initialValues = {
    creationMode: purchaseOrderStore.creationMode,
    requestId: undefined,
    supplierId: '',
    requestingArea: '',
    expectedDeliveryDays: ''
}

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: toTypedSchema(purchaseOrderSchema),
    validateOnMount: false,
    initialValues: initialValues
})

watch(
    () => purchaseOrderStore.creationMode,
    (mode) => {
        setValues({
            creationMode: mode,
            requestId: undefined,
            supplierId: '',
            requestingArea: '',
            expectedDeliveryDays: ''
        })
    }
)

const modalMap = {
    CREATE: {
        component: PurchaseOrderForm,
        action: createPurchaseOrder
    },
    DETAIL: {
        component: PurchaseOrderDetail,
        action: null
    }
}

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[purchaseOrderStore.modalId]?.type as keyof typeof modalMap
    return modalMap[modalType]?.component
})

const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[purchaseOrderStore.modalId]?.type as keyof typeof modalMap
    const action = modalMap[modalType]?.action
    
    if (!action) {
        // Si es DETAIL, solo cerrar el modal
        modalStore.close(purchaseOrderStore.modalId)
        return
    }
    
    try {
        const result = await action(formValues)
        
        showNotification(result.message, result.status)
        if (result.status === 'success') props.onRefresh?.()
        modalStore.close(purchaseOrderStore.modalId)
    } catch (error) {
        console.error(error)
        showNotification('Error al generar la orden de compra', 'error')
    }
})

const onClose = () => {
    resetForm()
    purchaseOrderStore.reset()
    purchaseOrderStore.setSelectedOrder(null)
}
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="purchaseOrderStore.modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>
