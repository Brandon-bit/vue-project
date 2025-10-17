<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import usePurchaseRequestStore from '@/modules/Compras/SolicitudesDeCompra/store/purchaseRequestStore'
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import PurchaseRequestForm from '@/modules/Compras/SolicitudesDeCompra/components/PurchaseRequestForm.vue'
import PurchaseRequestDetail from '@/modules/Compras/SolicitudesDeCompra/components/PurchaseRequestDetail.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { step1Schema } from '@/modules/Compras/SolicitudesDeCompra/validations/purchaseRequestValidation'
import { toTypedSchema } from '@vee-validate/zod'
import { usePurchaseRequestActions } from '@/modules/Compras/SolicitudesDeCompra/composables/usePurchaseRequestActions'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    onRefresh?: () => void
}>()

const requestStore = usePurchaseRequestStore()
const modalStore = useModalStore()
const { createPurchaseRequest } = usePurchaseRequestActions()

const initialValues = {
    area: '',
    justificacion: ''
}

const { handleSubmit, isSubmitting, resetForm, values } = useForm({
    validationSchema: toTypedSchema(step1Schema),
    validateOnMount: false,
    initialValues: initialValues
})

watch(
    () => modalStore.modals[requestStore.modalId]?.status,
    (status) => {
        if (!status) {
            resetForm()
            requestStore.reset()
        }
    }
)

// Sincronizar valores del formulario con el store
watch(values, (newValues) => {
    requestStore.setFormData({
        area: newValues.area || '',
        justificacion: newValues.justificacion || ''
    })
}, { deep: true })

const modalMap = {
    CREATE: {
        component: PurchaseRequestForm,
        action: createPurchaseRequest
    },
    DETAIL: {
        component: PurchaseRequestDetail,
        action: null
    }
}

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[requestStore.modalId]?.type as keyof typeof modalMap
    return modalMap[modalType]?.component
})

const modalTitle = computed(() => {
    const modalType = modalStore.modals[requestStore.modalId]?.type
    if (modalType === 'DETAIL') {
        return modalStore.modals[requestStore.modalId]?.title || 'Detalle de Solicitud'
    }
    return `Nueva Solicitud de Compra - Paso ${requestStore.currentStep} de 4`
})

const canGoNext = computed(() => {
    if (requestStore.currentStep === 1) {
        return values.area && values.justificacion && values.justificacion.length >= 10
    }
    if (requestStore.currentStep === 2) {
        return requestStore.formData.items.length > 0
    }
    return true
})

const handleNext = () => {
    if (requestStore.currentStep < 4) {
        requestStore.nextStep()
    }
}

const handlePrevious = () => {
    if (requestStore.currentStep > 1) {
        requestStore.previousStep()
    }
}

const onSubmit = handleSubmit(async () => {
    const modalType = modalStore.modals[requestStore.modalId]?.type as keyof typeof modalMap
    
    if (modalType === 'DETAIL') {
        modalStore.close(requestStore.modalId)
        return
    }
    
    // Si no estamos en el último paso, avanzar
    if (requestStore.currentStep < 4) {
        handleNext()
        return
    }
    
    // Si estamos en el último paso, enviar la solicitud
    try {
        const result = await createPurchaseRequest({
            area: requestStore.formData.area,
            justificacion: requestStore.formData.justificacion,
            items: requestStore.formData.items
        })
        
        showNotification(result.message, result.status)
        if (result.status === 'success') props.onRefresh?.()
        modalStore.close(requestStore.modalId)
        requestStore.reset()
    } catch (error) {
        console.error(error)
        showNotification('Error al crear la solicitud', 'error')
    }
})

const onClose = () => {
    resetForm()
    requestStore.reset()
    requestStore.setSelectedRequest(null)
}

const showFooter = computed(() => {
    const modalType = modalStore.modals[requestStore.modalId]?.type
    return modalType === 'CREATE'
})
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="requestStore.modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <div class="space-y-4">
                <component :is="currentModalComponent" />
                
                <!-- Botones de navegación para formulario multi-paso -->
                <div v-if="showFooter" class="flex justify-between pt-4 border-t">
                    <button
                        v-if="requestStore.currentStep > 1"
                        type="button"
                        @click="handlePrevious"
                        class="btn btn-outline"
                    >
                        <span class="material-symbols-outlined">arrow_back</span>
                        Anterior
                    </button>
                    <div v-else></div>
                    
                    <button
                        v-if="requestStore.currentStep < 4"
                        type="button"
                        @click="handleNext"
                        class="btn btn-primary"
                        :disabled="!canGoNext"
                    >
                        Siguiente
                        <span class="material-symbols-outlined">arrow_forward</span>
                    </button>
                    <button
                        v-else
                        type="submit"
                        class="btn btn-primary"
                        :disabled="isSubmitting"
                    >
                        <span v-if="isSubmitting" class="loading loading-spinner"></span>
                        <span v-else class="material-symbols-outlined">send</span>
                        {{ isSubmitting ? 'Enviando...' : 'Enviar Solicitud' }}
                    </button>
                </div>
            </div>
        </template>
    </BaseModal>
</template>
