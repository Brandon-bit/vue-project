<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import { useModalStore } from '@/shared/stores/modal.store'
import { toTypedSchema } from '@vee-validate/zod'
import { showNotification } from '@/utils/toastNotifications'
import UpdateOrderAuthorizationForm from '@inventario/Operacion/AutorizacionesDePedidos/components/UpdateOrderAuthorizationForm.vue'
import { useOrderAuthorizationsActions } from '@inventario/Operacion/AutorizacionesDePedidos/composables/useOrderAuthorizationsActions'
import useOrderAuthorizationsStore from '@inventario/Operacion/AutorizacionesDePedidos/store/useOrderAthorizationsStore'

const props = defineProps<{
    onRefresh?: () => void
}>()

const orderAuthorizationsStore = useOrderAuthorizationsStore()
const modalStore = useModalStore()
const { updateOrderAuthorization } = useOrderAuthorizationsActions()

const initialValues = {
    type: orderAuthorizationsStore.selectedOderAuthorization?.type
}

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    // validationSchema: toTypedSchema(createUpdateOrderManagementSchema),
    initialValues: initialValues,
    validateOnMount: false,
    validateOnChange: false,
    validateOnBlur: false
})

const modalMap = {
    UPDATE: {
        component: UpdateOrderAuthorizationForm,
        action: updateOrderAuthorization
    }
}

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[orderAuthorizationsStore.modalId]?.type
    return modalMap[modalType]?.component
})

const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[orderAuthorizationsStore.modalId]?.type
    const action = modalMap[modalType]?.action
    try {
        const { message, status } = await action(formValues)
        showNotification(message, status)
        if (status == 'success') props.onRefresh?.()
        modalStore.close(orderAuthorizationsStore.modalId)
    } catch (error) {
        console.error(error)
    }
})

const onClose = () => {
    resetForm()
    orderAuthorizationsStore.setData()
}
</script>
<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="orderAuthorizationsStore.modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>
