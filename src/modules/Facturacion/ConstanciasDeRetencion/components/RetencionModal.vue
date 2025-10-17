<script setup lang="ts">
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import BaseModal from '@/shared/components/BaseModal.vue'
import useRetencionStore from '@/modules/Facturacion/ConstanciasDeRetencion/store/retencionStore'
import { useModalStore } from '@/shared/stores/modal.store'
import { useRetencionActions } from '@/modules/Facturacion/ConstanciasDeRetencion/composables/useRetencionActions'
import { showNotification } from '@/utils/toastNotifications'
import { receptorPeriodoSchema } from '@/modules/Facturacion/ConstanciasDeRetencion/validations/retencionValidation'
import ReceptorPeriodoForm from './ReceptorPeriodoForm.vue'
import RetencionesForm from './RetencionesForm.vue'
import RetencionPreview from './RetencionPreview.vue'

const props = defineProps<{
    onRefresh?: () => void
}>()

const retencionStore = useRetencionStore()
const modalStore = useModalStore()
const { generarConstancia } = useRetencionActions()

const { handleSubmit, isSubmitting, resetForm, values, setValues } = useForm({
    validationSchema: toTypedSchema(receptorPeriodoSchema),
    validateOnMount: false,
    initialValues: {
        rfc: '',
        razonSocial: '',
        regimenFiscal: '',
        codigoPostal: '',
        mes: '',
        anio: new Date().getFullYear().toString()
    }
})

watch(
    () => modalStore.modals[retencionStore.modalId]?.status,
    (status) => {
        if (!status) {
            resetForm()
            retencionStore.reset()
        }
    }
)

// Sincronizar valores del formulario con el store
watch(values, (newValues) => {
    retencionStore.setFormData({
        rfc: newValues.rfc || '',
        razonSocial: newValues.razonSocial || '',
        regimenFiscal: newValues.regimenFiscal || '',
        codigoPostal: newValues.codigoPostal || '',
        mes: newValues.mes || '',
        anio: newValues.anio || ''
    })
}, { deep: true })

const currentComponent = computed(() => {
    switch (retencionStore.currentStep) {
        case 'receptor':
            return ReceptorPeriodoForm
        case 'retenciones':
            return RetencionesForm
        case 'preview':
            return RetencionPreview
        default:
            return ReceptorPeriodoForm
    }
})

const modalTitle = computed(() => {
    switch (retencionStore.currentStep) {
        case 'receptor':
            return 'Constancia de Retención - Receptor y Periodo'
        case 'retenciones':
            return 'Constancia de Retención - Detalle de Retenciones'
        case 'preview':
            return 'Constancia de Retención - Vista Previa'
        default:
            return 'Constancia de Retención'
    }
})

const canGoBack = computed(() => {
    return retencionStore.currentStep !== 'receptor'
})

const canGoNext = computed(() => {
    if (retencionStore.currentStep === 'receptor') {
        return values.rfc && values.razonSocial && values.regimenFiscal && values.codigoPostal && values.mes && values.anio
    }
    if (retencionStore.currentStep === 'retenciones') {
        return retencionStore.formData.retenciones.length > 0
    }
    return false
})

const handleBack = () => {
    if (retencionStore.currentStep === 'retenciones') {
        retencionStore.setCurrentStep('receptor')
    } else if (retencionStore.currentStep === 'preview') {
        retencionStore.setCurrentStep('retenciones')
    }
}

const handleNext = () => {
    if (retencionStore.currentStep === 'receptor') {
        retencionStore.setCurrentStep('retenciones')
    } else if (retencionStore.currentStep === 'retenciones') {
        retencionStore.setCurrentStep('preview')
    }
}

const onSubmit = handleSubmit(async () => {
    if (retencionStore.currentStep !== 'preview') {
        handleNext()
        return
    }
    
    try {
        const result = await generarConstancia(retencionStore.formData)
        
        showNotification(result.message, result.status)
        if (result.status === 'success') {
            props.onRefresh?.()
            modalStore.close(retencionStore.modalId)
            retencionStore.reset()
        }
    } catch (error) {
        console.error(error)
        showNotification('Error al generar la constancia', 'error')
    }
})

const onClose = () => {
    resetForm()
    retencionStore.reset()
}
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="retencionStore.modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <div class="space-y-4">
                <!-- Indicador de Pasos -->
                <div class="mb-6">
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-sm font-medium">
                            Paso {{ retencionStore.currentStep === 'receptor' ? '1' : retencionStore.currentStep === 'retenciones' ? '2' : '3' }} de 3
                        </span>
                        <span class="text-sm text-gray-500">
                            {{ retencionStore.currentStep === 'receptor' ? 'Receptor y Periodo' : 
                               retencionStore.currentStep === 'retenciones' ? 'Detalle de Retenciones' : 
                               'Vista Previa' }}
                        </span>
                    </div>
                    <div class="w-full bg-base-200 rounded-full h-2">
                        <div 
                            class="bg-primary h-2 rounded-full transition-all duration-300"
                            :style="{ width: `${(retencionStore.currentStep === 'receptor' ? 33 : retencionStore.currentStep === 'retenciones' ? 66 : 100)}%` }"
                        />
                    </div>
                </div>

                <component :is="currentComponent" />
                
                <!-- Botones de navegación -->
                <div class="flex justify-between pt-4 border-t">
                    <button
                        v-if="canGoBack"
                        type="button"
                        @click="handleBack"
                        class="btn btn-outline"
                    >
                        <span class="material-symbols-outlined">arrow_back</span>
                        Anterior
                    </button>
                    <div v-else></div>
                    
                    <button
                        v-if="retencionStore.currentStep !== 'preview'"
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
                        {{ isSubmitting ? 'Generando...' : 'Generar y Timbrar' }}
                    </button>
                </div>
            </div>
        </template>
    </BaseModal>
</template>
