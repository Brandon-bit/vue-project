<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import { ref } from 'vue'
import useInventoryAuditStore from '@inventario/Operacion/AuditoriaDeInventarios/store/useInventoryAuditStore'
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import CreateUpdateForm from '@inventario/Operacion/AuditoriaDeInventarios/components/CreateUpdateForm.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { createUpdateInventoryAuditSchema } from '@inventario/Operacion/AuditoriaDeInventarios/validations/inventoryAuditSchema'
import { toTypedSchema } from '@vee-validate/zod'
import { useInventoryAuditActions } from '@inventario/Operacion/AuditoriaDeInventarios/composables/useInventoryAuditActions'
import { showNotification } from '@/utils/toastNotifications'
import AddProductForm from '@inventario/Operacion/AuditoriaDeInventarios/components/AddProductForm.vue'
import CustomModal from '@inventario/Operacion/AuditoriaDeInventarios/components/CustomModal.vue'
import { addProductInventoryAuditSchema } from '@inventario/Operacion/AuditoriaDeInventarios/validations/inventoryAuditSchema'

const props = defineProps<{
    onRefresh?: () => void
}>()

const inventoryAuditStore = useInventoryAuditStore()
const modalStore = useModalStore()
const { createInventoryAudit, updateInventoryAudit } = useInventoryAuditActions()

const initialValues = {
    date: inventoryAuditStore.selectedInventoryAudit?.date,
    auditorId: inventoryAuditStore.selectedInventoryAudit?.auditorId,
    generalNote: inventoryAuditStore.selectedInventoryAudit?.generalNote
}

const subInitialValues = {
    productId: 0,
    product: '',
    realCount: 0,
    expectedCount: 0,
    difference: 0,
    note: ''
}

const {
    handleSubmit: handleSubmitMainForm,
    isSubmitting,
    resetForm,
    setValues
} = useForm({
    // validationSchema: toTypedSchema(createUpdateInventoryAuditSchema),
    initialValues: initialValues,
    validateOnMount: false
})

const { handleSubmit: handleSubSubmitSubForm, resetForm: resetSubForm } = useForm({
    validationSchema: toTypedSchema(addProductInventoryAuditSchema),
    initialValues: subInitialValues
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

const onSubmitMainForm = handleSubmitMainForm(async (formValues) => {
    const modalType = modalStore.modals[inventoryAuditStore.modalId]?.type
    const action = modalMap[modalType]?.action

    console.log('manda el formulario')
    try {
        const { message, status } = await action(formValues)
        showNotification(message, status)
        if (status == 'success') props.onRefresh?.()
        modalStore.close(inventoryAuditStore.modalId)
    } catch (error) {
        console.error(error)
    }
})

const onSubmitSubForm = handleSubSubmitSubForm(async (formValues) => {
    // if (inventoryAuditStore.selectedProduct?.id) {
    console.log(formValues)
    // }
    // console.log(inventoryAuditStore.selectedProduct?.id)
})

const onClose = () => {
    if (inventoryAuditStore.showAddProductForm) {
        resetSubForm()
        inventoryAuditStore.setShowAddProductForm(false)
    } else {
        resetForm()
        inventoryAuditStore.setData()
    }
}
</script>
<template>
    <CustomModal
        :onSubmit="inventoryAuditStore.showAddProductForm ? onSubmitSubForm : onSubmitMainForm"
        :modalId="inventoryAuditStore.modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
        :isShowForm="inventoryAuditStore.showAddProductForm"
    >
        <template v-slot:modalBody>
            <div v-show="!inventoryAuditStore.showAddProductForm">
                <component :is="currentModalComponent" />
            </div>
            <div v-show="inventoryAuditStore.showAddProductForm">
                <AddProductForm />
            </div>
        </template>
    </CustomModal>
</template>
