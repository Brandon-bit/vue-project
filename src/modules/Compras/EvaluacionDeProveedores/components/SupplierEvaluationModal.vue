<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import useSupplierEvaluationStore from '@/modules/Compras/EvaluacionDeProveedores/store/supplierEvaluationStore'
import { watch } from 'vue'
import { useForm } from 'vee-validate'
import IncidentForm from '@/modules/Compras/EvaluacionDeProveedores/components/IncidentForm.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { incidentSchema } from '@/modules/Compras/EvaluacionDeProveedores/validations/supplierEvaluationValidation'
import { toTypedSchema } from '@vee-validate/zod'
import { useSupplierEvaluationActions } from '@/modules/Compras/EvaluacionDeProveedores/composables/useSupplierEvaluationActions'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    onRefresh?: () => void
}>()

const supplierEvaluationStore = useSupplierEvaluationStore()
const modalStore = useModalStore()
const { registerIncident } = useSupplierEvaluationActions()

const initialValues = {
    supplierId: supplierEvaluationStore.selectedSupplier?.id || 0,
    purchaseOrder: '',
    incidentType: '',
    description: '',
    impact: ''
}

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: toTypedSchema(incidentSchema),
    validateOnMount: false,
    initialValues: initialValues
})

watch(
    () => supplierEvaluationStore.selectedSupplier,
    (supplier) => {
        if (supplier) {
            setValues({
                supplierId: supplier.id,
                purchaseOrder: '',
                incidentType: '',
                description: '',
                impact: ''
            })
        }
    },
    { immediate: true }
)

const onSubmit = handleSubmit(async (formValues) => {
    try {
        const result = await registerIncident(formValues)
        
        showNotification(result.message, result.status)
        if (result.status === 'success') props.onRefresh?.()
        modalStore.close(supplierEvaluationStore.modalId)
    } catch (error) {
        console.error(error)
        showNotification('Error al registrar la incidencia', 'error')
    }
})

const onClose = () => {
    resetForm()
    supplierEvaluationStore.setSelectedSupplier(null)
}
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="supplierEvaluationStore.modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <IncidentForm />
        </template>
    </BaseModal>
</template>
