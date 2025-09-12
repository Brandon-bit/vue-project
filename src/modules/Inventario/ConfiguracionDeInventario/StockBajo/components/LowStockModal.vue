<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import useLowStockStore from '@inventario/ConfiguracionDeInventario/StockBajo/store/lowStockStore'
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import EditForm from '@inventario/ConfiguracionDeInventario/StockBajo/components/EditForm.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { updateLowStockSchema } from '@inventario/ConfiguracionDeInventario/StockBajo/validations/lowStockValidation'
import { toTypedSchema } from '@vee-validate/zod'
import { useLowStockAction } from '@inventario/ConfiguracionDeInventario/StockBajo/composables/useLowStockAction'

const lowStockStore = useLowStockStore()
const modalStore = useModalStore()
const { updateLowStockProduct } = useLowStockAction()

const initialValues = {
    cantidad: lowStockStore.currentLowStockProduct?.cantidad,
    cantidadAlerta: lowStockStore.currentLowStockProduct?.cantidadAlerta
}

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: toTypedSchema(updateLowStockSchema),
    validateOnMount: false,
    initialValues: initialValues
})

watch(
    () => lowStockStore.currentLowStockProduct,
    (lowStock) => {
        if (lowStock) {
            setValues({
                cantidad: lowStock?.cantidad,
                cantidadAlerta: lowStock?.cantidadAlerta
            })
        }
    },
    { immediate: true }
)

const modalMap = {
    EDIT: {
        component: EditForm,
        action: updateLowStockProduct
    }
}

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[lowStockStore.modalId]?.type
    return modalMap[modalType]?.component
})

const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[lowStockStore.modalId]?.type
    const action = modalMap[modalType]?.action
    try {
        const { message, status, data } = await action(formValues)
    } catch (error) {
        console.error(error)
    }
})

const onClose = () => {
    resetForm()
    lowStockStore.setData()
}
</script>
<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="lowStockStore.modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>
<style></style>
