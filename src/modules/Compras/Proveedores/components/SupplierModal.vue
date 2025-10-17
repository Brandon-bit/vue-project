<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import useSupplierStore from '@/modules/Compras/Proveedores/store/supplierStore'
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import SupplierForm from '@/modules/Compras/Proveedores/components/SupplierForm.vue'
import SupplierDetail from '@/modules/Compras/Proveedores/components/SupplierDetail.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { supplierSchema } from '@/modules/Compras/Proveedores/validations/supplierValidation'
import { toTypedSchema } from '@vee-validate/zod'
import { useSupplierActions } from '@/modules/Compras/Proveedores/composables/useSupplierActions'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    onRefresh?: () => void
}>()

const supplierStore = useSupplierStore()
const modalStore = useModalStore()
const { createSupplier, updateSupplier } = useSupplierActions()

const initialValues = {
    nombre: '',
    rfc: '',
    categoria: '',
    telefono: '',
    email: '',
    banco: '',
    clabe: '',
    direccion: '',
    contactoPrincipal: ''
}

const { handleSubmit, isSubmitting, resetForm } = useForm({
    validationSchema: toTypedSchema(supplierSchema),
    validateOnMount: false,
    initialValues: initialValues
})

watch(
    () => modalStore.modals[supplierStore.modalId]?.status,
    (status) => {
        if (!status) {
            resetForm()
        }
    }
)

const modalMap = {
    CREATE: {
        component: SupplierForm,
        action: createSupplier
    },
    EDIT: {
        component: SupplierForm,
        action: updateSupplier
    },
    DETAIL: {
        component: SupplierDetail,
        action: null
    }
}

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[supplierStore.modalId]?.type as keyof typeof modalMap
    return modalMap[modalType]?.component
})

const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[supplierStore.modalId]?.type as keyof typeof modalMap
    const action = modalMap[modalType]?.action
    
    if (!action) {
        // Si es DETAIL, solo cerrar el modal
        modalStore.close(supplierStore.modalId)
        return
    }
    
    try {
        let result
        if (modalType === 'EDIT' && supplierStore.selectedSupplier) {
            result = await action(supplierStore.selectedSupplier.id, formValues)
        } else {
            result = await action(formValues)
        }
        
        showNotification(result.message, result.status)
        if (result.status === 'success') props.onRefresh?.()
        modalStore.close(supplierStore.modalId)
    } catch (error) {
        console.error(error)
        showNotification('Error al procesar la solicitud', 'error')
    }
})

const onClose = () => {
    resetForm()
    supplierStore.reset()
    supplierStore.setSelectedSupplier(null)
}
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="supplierStore.modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>
