<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import useOrderManagementStore from '@inventario/Operacion/GestionDePedidos/store/useOrderManagementStore'
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import { useModalStore } from '@/shared/stores/modal.store'
import AdvanceState from '@inventario/Operacion/GestionDePedidos/components/AdvanceState.vue'
import { toTypedSchema } from '@vee-validate/zod'
import { createUpdateOrderManagementSchema } from '@inventario/Operacion/GestionDePedidos/validations/orderManagementSchema'
import { useOrderManagementActions } from '@inventario/Operacion/GestionDePedidos/composables/useOrderManagementActions'
import CreateUpdateManagementForm from '@inventario/Operacion/GestionDePedidos/components/CreateUpdateManagementForm.vue'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    onRefresh?: () => void
}>()

const orderManagementStore = useOrderManagementStore()
const modalStore = useModalStore()
const { advanceState } = useOrderManagementActions()

const initialValues = {
    folio: orderManagementStore.selectedOrderManagement?.folio,
    supplier: orderManagementStore.selectedOrderManagement?.supplier,
    supplierId: orderManagementStore.selectedOrderManagement?.supplierId,
    date: orderManagementStore.selectedOrderManagement?.date
}

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: toTypedSchema(createUpdateOrderManagementSchema),
    initialValues: initialValues,
    validateOnMount: false,
    validateOnChange: false,
    validateOnBlur: false
})

watch(
    () => orderManagementStore.selectedOrderManagement,
    (current) => {
        resetForm({ values: { ...current } })
    }
)

const modalMap = {
    CREATE: {
        component: CreateUpdateManagementForm,
        action: advanceState
    },
    UPDATE: {
        component: CreateUpdateManagementForm,
        action: advanceState
    },
    LOAD: {
        component: AdvanceState,
        action: advanceState
    }
}

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[orderManagementStore.modalId]?.type
    return modalMap[modalType]?.component
})

const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[orderManagementStore.modalId]?.type
    const action = modalMap[modalType]?.action
    try {
        const { message, status } = await action(formValues)
        showNotification(message, status)
        if (status == 'success') props.onRefresh?.()
        modalStore.close(orderManagementStore.modalId)
    } catch (error) {
        console.error(error)
    }
})

const onClose = () => {
    resetForm()
    orderManagementStore.setData()
}
</script>
<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="orderManagementStore.modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>
