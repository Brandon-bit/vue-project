<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import useGastoStore from '@/modules/Administracion/CajaChica/store/gastoStore'
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import DeleteGasto from '@/modules/Administracion/CajaChica/components/DeleteGasto.vue'
import ApproveGasto from '@/modules/Administracion/CajaChica/components/ApproveGasto.vue'
import AddEditForm from '@/modules/Administracion/CajaChica/components/AddEditForm.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { gastoSchema } from '@/modules/Administracion/CajaChica/validations/gastoValidation'
import { toTypedSchema } from '@vee-validate/zod'
import { useGastoActions } from '@/modules/Administracion/CajaChica/composables/useGastoActions'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    onRefresh?: () => void
}>()

const gastoStore = useGastoStore()
const modalStore = useModalStore()
const { createGasto, editGasto, deleteGasto, aprobarGasto } = useGastoActions()

const initialValues = {
    cajaId: gastoStore.selectedGasto?.cajaId || 0,
    fecha: gastoStore.selectedGasto?.fecha ? new Date(gastoStore.selectedGasto.fecha).toISOString().split('T')[0] : '',
    concepto: gastoStore.selectedGasto?.concepto || '',
    monto: gastoStore.selectedGasto?.monto || 0,
    centroCosto: gastoStore.selectedGasto?.centroCosto || '',
    descripcion: gastoStore.selectedGasto?.descripcion || '',
    removeComprobante: false
}

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: toTypedSchema(gastoSchema),
    validateOnMount: false,
    initialValues: initialValues
})

watch(
    () => gastoStore.selectedGasto,
    (gasto) => {
        if (gasto) {
            setValues({
                cajaId: gasto?.cajaId || 0,
                fecha: gasto?.fecha ? new Date(gasto.fecha).toISOString().split('T')[0] : '',
                concepto: gasto?.concepto || '',
                monto: gasto?.monto || 0,
                centroCosto: gasto?.centroCosto || '',
                descripcion: gasto?.descripcion || '',
                removeComprobante: false
            })
        }
    },
    { immediate: true }
)

const modalMap = {
    CREATE: {
        component: AddEditForm,
        action: createGasto
    },
    EDIT: {
        component: AddEditForm,
        action: editGasto
    },
    DELETE: {
        component: DeleteGasto,
        action: deleteGasto
    },
    APPROVE: {
        component: ApproveGasto,
        action: aprobarGasto
    }
}

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[gastoStore.modalId]?.type
    return modalMap[modalType]?.component
})

const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[gastoStore.modalId]?.type
    const action = modalMap[modalType]?.action
    try {
        const { message, status } = await action(formValues)
        showNotification(message, status)
        if (status == "success") props.onRefresh?.()
        modalStore.close(gastoStore.modalId)
    } catch (error) {
        console.error(error)
    }
})

const onClose = () => {
    resetForm()
    gastoStore.setData()
}

</script>
<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="gastoStore.modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>
