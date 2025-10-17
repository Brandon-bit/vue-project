<script setup lang="ts">
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import BaseModal from '@/shared/components/BaseModal.vue'
import BaseInput from '@/shared/components/BaseFormInput.vue'
import useFacturaStore from '@/modules/Facturacion/MatrizDeFacturas/store/facturaStore'
import { useModalStore } from '@/shared/stores/modal.store'
import { useFacturaActions } from '@/modules/Facturacion/MatrizDeFacturas/composables/useFacturaActions'
import { showNotification } from '@/utils/toastNotifications'

const facturaStore = useFacturaStore()
const modalStore = useModalStore()
const { guardarConfiguracionSAT } = useFacturaActions()

const configSchema = z.object({
    rfc: z.string().min(12, 'El RFC debe tener al menos 12 caracteres').max(13, 'El RFC debe tener máximo 13 caracteres'),
    contrasenaCIEC: z.string().min(1, 'La contraseña CIEC es requerida')
})

const { handleSubmit, isSubmitting, resetForm } = useForm({
    validationSchema: toTypedSchema(configSchema),
    validateOnMount: false,
    initialValues: {
        rfc: '',
        contrasenaCIEC: ''
    }
})

const onSubmit = handleSubmit(async (values) => {
    try {
        const result = await guardarConfiguracionSAT({
            rfc: values.rfc,
            contrasenaCIEC: values.contrasenaCIEC
        })
        
        showNotification(result.message, result.status)
        if (result.status === 'success') {
            modalStore.close(facturaStore.modalConfigSATId)
            resetForm()
        }
    } catch (error) {
        console.error(error)
        showNotification('Error al guardar la configuración', 'error')
    }
})

const onClose = () => {
    resetForm()
}
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="facturaStore.modalConfigSATId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <div class="space-y-4">
                <div class="alert alert-info">
                    <span class="material-symbols-outlined">info</span>
                    <div>
                        <p class="font-semibold">Configuración de Conexión al SAT</p>
                        <p class="text-sm">Configura tus credenciales para la descarga automática de facturas</p>
                    </div>
                </div>

                <BaseInput
                    name="rfc"
                    label="RFC"
                    placeholder="ABC123456XYZ"
                    required
                />

                <BaseInput
                    name="contrasenaCIEC"
                    label="Contraseña CIEC"
                    type="password"
                    placeholder="••••••••"
                    required
                />

                <div class="alert alert-warning">
                    <span class="material-symbols-outlined">lock</span>
                    <span class="text-sm">Tus credenciales se almacenan de forma segura y encriptada</span>
                </div>
            </div>
        </template>
    </BaseModal>
</template>
