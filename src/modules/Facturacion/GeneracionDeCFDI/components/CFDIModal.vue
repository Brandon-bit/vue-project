<script setup lang="ts">
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import BaseModal from '@/shared/components/BaseModal.vue'
import useCFDIStore from '@/modules/Facturacion/GeneracionDeCFDI/store/cfdiStore'
import { useModalStore } from '@/shared/stores/modal.store'
import { useCFDIActions } from '@/modules/Facturacion/GeneracionDeCFDI/composables/useCFDIActions'
import { showNotification } from '@/utils/toastNotifications'
import { datosComprobanteSchema } from '@/modules/Facturacion/GeneracionDeCFDI/validations/cfdiValidation'
import DatosComprobanteForm from './DatosComprobanteForm.vue'
import ConceptosForm from './ConceptosForm.vue'
import CFDIPreview from './CFDIPreview.vue'

const props = defineProps<{
    onRefresh?: () => void
}>()

const cfdiStore = useCFDIStore()
const modalStore = useModalStore()
const { generarCFDI } = useCFDIActions()

const { handleSubmit, isSubmitting, resetForm, values } = useForm({
    validationSchema: toTypedSchema(datosComprobanteSchema),
    validateOnMount: false,
    initialValues: {
        receptorRfc: '',
        receptorRazonSocial: '',
        receptorRegimenFiscal: '',
        receptorCodigoPostal: '',
        receptorUsoCFDI: '',
        metodoPago: '',
        formaPago: '',
        moneda: 'MXN'
    }
})

watch(
    () => modalStore.modals[cfdiStore.modalId]?.status,
    (status) => {
        if (!status) {
            resetForm()
            cfdiStore.reset()
        }
    }
)

// Sincronizar valores del formulario con el store
watch(values, (newValues) => {
    cfdiStore.setReceptor({
        rfc: newValues.receptorRfc || '',
        razonSocial: newValues.receptorRazonSocial || '',
        regimenFiscal: newValues.receptorRegimenFiscal || '',
        codigoPostal: newValues.receptorCodigoPostal || '',
        usoCFDI: newValues.receptorUsoCFDI || ''
    })
    cfdiStore.setComprobante({
        metodoPago: newValues.metodoPago || '',
        formaPago: newValues.formaPago || '',
        moneda: newValues.moneda || 'MXN'
    })
}, { deep: true })

const currentComponent = computed(() => {
    switch (cfdiStore.currentStep) {
        case 'datos':
            return DatosComprobanteForm
        case 'conceptos':
            return ConceptosForm
        case 'preview':
            return CFDIPreview
        default:
            return DatosComprobanteForm
    }
})

const modalTitle = computed(() => {
    switch (cfdiStore.currentStep) {
        case 'datos':
            return 'Generación de CFDI 4.0 - Datos del Comprobante'
        case 'conceptos':
            return 'Generación de CFDI 4.0 - Conceptos'
        case 'preview':
            return 'Generación de CFDI 4.0 - Vista Previa'
        default:
            return 'Generación de CFDI 4.0'
    }
})

const canGoBack = computed(() => {
    return cfdiStore.currentStep !== 'datos'
})

const canGoNext = computed(() => {
    if (cfdiStore.currentStep === 'datos') {
        return values.receptorRfc && values.receptorRazonSocial && values.receptorRegimenFiscal && 
               values.receptorCodigoPostal && values.receptorUsoCFDI && 
               values.metodoPago && values.formaPago && values.moneda
    }
    if (cfdiStore.currentStep === 'conceptos') {
        return cfdiStore.formData.conceptos.length > 0
    }
    return false
})

const handleBack = () => {
    if (cfdiStore.currentStep === 'conceptos') {
        cfdiStore.setCurrentStep('datos')
    } else if (cfdiStore.currentStep === 'preview') {
        cfdiStore.setCurrentStep('conceptos')
    }
}

const handleNext = () => {
    if (cfdiStore.currentStep === 'datos') {
        cfdiStore.setCurrentStep('conceptos')
    } else if (cfdiStore.currentStep === 'conceptos') {
        cfdiStore.setCurrentStep('preview')
    }
}

const onSubmit = handleSubmit(async () => {
    if (cfdiStore.currentStep !== 'preview') {
        handleNext()
        return
    }
    
    try {
        const result = await generarCFDI(cfdiStore.formData)
        
        showNotification(result.message, result.status)
        if (result.status === 'success') {
            props.onRefresh?.()
            modalStore.close(cfdiStore.modalId)
            cfdiStore.reset()
        }
    } catch (error) {
        console.error(error)
        showNotification('Error al generar el CFDI', 'error')
    }
})

const onClose = () => {
    resetForm()
    cfdiStore.reset()
}
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="cfdiStore.modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <div class="space-y-4">
                <!-- Indicador de Pasos -->
                <div class="mb-6">
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-sm font-medium">
                            Paso {{ cfdiStore.currentStep === 'datos' ? '1' : cfdiStore.currentStep === 'conceptos' ? '2' : '3' }} de 3
                        </span>
                        <span class="text-sm text-gray-500">
                            {{ cfdiStore.currentStep === 'datos' ? 'Datos del Comprobante' : 
                               cfdiStore.currentStep === 'conceptos' ? 'Conceptos' : 
                               'Vista Previa' }}
                        </span>
                    </div>
                    <div class="w-full bg-base-200 rounded-full h-2">
                        <div 
                            class="bg-primary h-2 rounded-full transition-all duration-300"
                            :style="{ width: `${(cfdiStore.currentStep === 'datos' ? 33 : cfdiStore.currentStep === 'conceptos' ? 66 : 100)}%` }"
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
                        v-if="cfdiStore.currentStep !== 'preview'"
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
                        {{ isSubmitting ? 'Generando...' : 'Generar y Timbrar CFDI' }}
                    </button>
                </div>
            </div>
        </template>
    </BaseModal>
</template>
