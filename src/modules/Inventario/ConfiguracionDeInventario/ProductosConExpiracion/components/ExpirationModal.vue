<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import useExpirationStore from '@inventario/ConfiguracionDeInventario/ProductosConExpiracion/store/expirationStore'
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import EditForm from '@inventario/ConfiguracionDeInventario/ProductosConExpiracion/components/EditForm.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { editProductExpirationSchema } from '@inventario/ConfiguracionDeInventario/ProductosConExpiracion/validations/expirationValidation'
import { toTypedSchema } from '@vee-validate/zod'
import { useExpirationActions } from '@inventario/ConfiguracionDeInventario/ProductosConExpiracion/composables/useExpirationAction'

const expirationStore = useExpirationStore()
const modalStore = useModalStore()
const { editProductWithExpiration } = useExpirationActions()

const initialValues = {
    fecha_fabricacion: expirationStore.currentProductExpiration?.manufacturedDate,
    fecha_expiracion: expirationStore.currentProductExpiration?.expirationDate
}

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: toTypedSchema(editProductExpirationSchema),
    validateOnMount: false,
    initialValues: initialValues
})

watch(
    () => expirationStore.currentProductExpiration,
    (category) => {
        if (category) {
            setValues({
                fecha_fabricacion: expirationStore.currentProductExpiration?.manufacturedDate,
                fecha_expiracion: expirationStore.currentProductExpiration?.expirationDate
            })
        }
    },
    { immediate: true }
)

const modalMap = {
    EDIT: {
        component: EditForm,
        action: editProductWithExpiration
    }
}

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[expirationStore.modalId]?.type
    return modalMap[modalType]?.component
})

const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[expirationStore.modalId]?.type
    const action = modalMap[modalType]?.action
    try {
        const { message, status, data } = await action(formValues)
    } catch (error) {
        console.error(error)
    }
})

const onClose = () => {
    resetForm()
    expirationStore.setData()
}
</script>
<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="expirationStore.modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>
<style></style>
