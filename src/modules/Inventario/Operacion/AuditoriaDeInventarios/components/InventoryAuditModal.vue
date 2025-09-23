<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import useInventoryAuditStore from '@inventario/Operacion/AuditoriaDeInventarios/store/useInventoryAuditStore'
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import CreateUpdateForm from '@inventario/Operacion/AuditoriaDeInventarios/components/CreateUpdateForm.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { createUpdateInventoryAuditSchema } from '@inventario/Operacion/AuditoriaDeInventarios/validations/inventoryAuditSchema'
import { toTypedSchema } from '@vee-validate/zod'
import { useInventoryAuditActions } from '@inventario/Operacion/AuditoriaDeInventarios/composables/useInventoryAuditActions'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    onRefresh?: () => void
}>()

const inventoryAuditStore = useInventoryAuditStore()
const modalStore = useModalStore()
const { createInventoryAudit, updateInventoryAudit } = useInventoryAuditActions()

const initialValues = {
    date: inventoryAuditStore.selectedInventoryAudit?.date,
    auditorId: inventoryAuditStore.selectedInventoryAudit?.auditorId,
    productId: inventoryAuditStore.selectedInventoryAudit?.productId,
    product: inventoryAuditStore.selectedInventoryAudit?.product,
    difference: inventoryAuditStore.selectedInventoryAudit?.difference,
    count: inventoryAuditStore.selectedInventoryAudit?.count,
    note: inventoryAuditStore.selectedInventoryAudit?.note
}

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: toTypedSchema(createUpdateInventoryAuditSchema),
    initialValues: initialValues,
    validateOnMount: false
})

watch(
    () => inventoryAuditStore.selectedInventoryAudit,
    (current) => {
        console.log(current)
        setValues({ ...current })
    }
)

const modalMap = {
    CREATE: {
        component: CreateUpdateForm,
        action: createInventoryAudit
    },
    UPDATE: {
        component: CreateUpdateForm,
        action: updateInventoryAudit
    }
}

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[inventoryAuditStore.modalId]?.type
    return modalMap[modalType]?.component
})

const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[inventoryAuditStore.modalId]?.type
    const action = modalMap[modalType]?.action
    try {
        const { message, status } = await action(formValues)
        showNotification(message, status)
        if (status == 'success') props.onRefresh?.()
        modalStore.close(inventoryAuditStore.modalId)
    } catch (error) {
        console.error(error)
    }
})

const onClose = () => {
    resetForm()
    inventoryAuditStore.setData()
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
