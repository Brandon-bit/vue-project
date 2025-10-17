<script setup lang="ts">
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import BaseModal from '@/shared/components/BaseModal.vue'
import useComplementStore from '@/modules/Facturacion/GeneracionDeComplementos/store/complementStore'
import { useModalStore } from '@/shared/stores/modal.store'
import { useComplementActions } from '@/modules/Facturacion/GeneracionDeComplementos/composables/useComplementActions'
import { showNotification } from '@/utils/toastNotifications'
import ComplementTypeSelector from './ComplementTypeSelector.vue'
import CFDISelector from './CFDISelector.vue'
import PaymentComplementForm from './PaymentComplementForm.vue'
import ComplementPreview from './ComplementPreview.vue'

const props = defineProps<{
    onRefresh?: () => void
}>()

const complementStore = useComplementStore()
const modalStore = useModalStore()
const { generarComplementoPago } = useComplementActions()

const paymentSchema = z.object({
    fechaPago: z.string().min(1, 'La fecha de pago es requerida'),
    formaPago: z.string().min(1, 'La forma de pago es requerida'),
    montoPago: z.number().min(0.01, 'El monto debe ser mayor a 0'),
    moneda: z.string().min(1, 'La moneda es requerida'),
    bancoOrdenante: z.string().optional(),
    cuentaOrdenante: z.string().optional(),
    bancoBeneficiario: z.string().optional(),
    cuentaBeneficiaria: z.string().optional(),
    numeroOperacion: z.string().optional()
})

const { handleSubmit, isSubmitting, resetForm, values, setValues } = useForm({
    validationSchema: toTypedSchema(paymentSchema),
    validateOnMount: false,
    initialValues: {
        fechaPago: new Date().toISOString().split('T')[0],
        formaPago: '',
        montoPago: 0,
        moneda: 'MXN',
        bancoOrdenante: '',
        cuentaOrdenante: '',
        bancoBeneficiario: '',
        cuentaBeneficiaria: '',
        numeroOperacion: ''
    }
})

watch(
    () => modalStore.modals[complementStore.modalId]?.status,
    (status) => {
        if (!status) {
            resetForm()
            complementStore.reset()
        }
    }
)

// Sincronizar valores del formulario con el store
watch(values, (newValues) => {
    complementStore.setFormDataPago({
        fechaPago: newValues.fechaPago || '',
        formaPago: newValues.formaPago || '',
        montoPago: newValues.montoPago || 0,
        moneda: newValues.moneda || 'MXN',
        bancoOrdenante: newValues.bancoOrdenante,
        cuentaOrdenante: newValues.cuentaOrdenante,
        bancoBeneficiario: newValues.bancoBeneficiario,
        cuentaBeneficiaria: newValues.cuentaBeneficiaria,
        numeroOperacion: newValues.numeroOperacion
    })
}, { deep: true })

const currentComponent = computed(() => {
    if (!complementStore.tipoComplemento) {
        return ComplementTypeSelector
    }
    
    switch (complementStore.currentStep) {
        case 'seleccion':
            return CFDISelector
        case 'formulario':
            return PaymentComplementForm
        case 'preview':
            return ComplementPreview
        default:
            return ComplementTypeSelector
    }
})

const modalTitle = computed(() => {
    if (!complementStore.tipoComplemento) {
        return 'Generación de Complementos'
    }
    
    const tipo = complementStore.tipoComplemento === 'pago' ? 'Complemento de Pago' : 'Carta Porte'
    
    switch (complementStore.currentStep) {
        case 'seleccion':
            return `${tipo} - Seleccionar CFDI`
        case 'formulario':
            return `${tipo} - Datos del Complemento`
        case 'preview':
            return `${tipo} - Vista Previa`
        default:
            return 'Generación de Complementos'
    }
})

const canGoBack = computed(() => {
    if (!complementStore.tipoComplemento) return false
    return complementStore.currentStep !== 'seleccion'
})

const canGoNext = computed(() => {
    if (!complementStore.tipoComplemento) return false
    if (complementStore.currentStep === 'seleccion') {
        return !!complementStore.cfdiSeleccionado
    }
    if (complementStore.currentStep === 'formulario') {
        return values.fechaPago && values.formaPago && values.montoPago > 0 && values.moneda
    }
    return false
})

const handleBack = () => {
    if (complementStore.currentStep === 'formulario') {
        complementStore.setCurrentStep('seleccion')
    } else if (complementStore.currentStep === 'preview') {
        complementStore.setCurrentStep('formulario')
    }
}

const handleNext = () => {
    if (complementStore.currentStep === 'seleccion') {
        complementStore.setCurrentStep('formulario')
    } else if (complementStore.currentStep === 'formulario') {
        complementStore.setCurrentStep('preview')
    }
}

const onSubmit = handleSubmit(async () => {
    if (!complementStore.tipoComplemento) {
        return
    }
    
    if (complementStore.currentStep !== 'preview') {
        handleNext()
        return
    }
    
    try {
        const result = await generarComplementoPago(complementStore.formDataPago)
        
        showNotification(result.message, result.status)
        if (result.status === 'success') {
            props.onRefresh?.()
            modalStore.close(complementStore.modalId)
            complementStore.reset()
        }
    } catch (error) {
        console.error(error)
        showNotification('Error al generar el complemento', 'error')
    }
})

const onClose = () => {
    resetForm()
    complementStore.reset()
}

const showFooter = computed(() => {
    return !!complementStore.tipoComplemento
})
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="complementStore.modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <div class="space-y-4">
                <component :is="currentComponent" />
                
                <!-- Botones de navegación -->
                <div v-if="showFooter" class="flex justify-between pt-4 border-t">
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
                        v-if="complementStore.currentStep !== 'preview'"
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
