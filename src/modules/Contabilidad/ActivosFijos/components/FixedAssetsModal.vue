<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import useFixedAssetsStore from '@/modules/Contabilidad/ActivosFijos/store/fixedAssetsStore'
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import FixedAssetForm from '@/modules/Contabilidad/ActivosFijos/components/FixedAssetForm.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { fixedAssetSchema } from '@/modules/Contabilidad/ActivosFijos/validations/fixedAssetValidation'
import { toTypedSchema } from '@vee-validate/zod'
import { useFixedAssetsActions } from '@/modules/Contabilidad/ActivosFijos/composables/useFixedAssetsActions'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    onRefresh?: () => void
}>()

const fixedAssetsStore = useFixedAssetsStore()
const modalStore = useModalStore()
const { createFixedAsset, updateFixedAsset } = useFixedAssetsActions()

const initialValues = {
    description: fixedAssetsStore.selectedFixedAsset?.description || '',
    brand: fixedAssetsStore.selectedFixedAsset?.brand || '',
    model: fixedAssetsStore.selectedFixedAsset?.model || '',
    serialNumber: fixedAssetsStore.selectedFixedAsset?.serialNumber || '',
    acquisitionDate: fixedAssetsStore.selectedFixedAsset?.acquisitionDate || '',
    supplier: fixedAssetsStore.selectedFixedAsset?.supplier || '',
    invoice: fixedAssetsStore.selectedFixedAsset?.invoice || '',
    originalValue: fixedAssetsStore.selectedFixedAsset?.originalValue || 0,
    usefulLife: fixedAssetsStore.selectedFixedAsset?.usefulLife || 60,
    accountingAccount: fixedAssetsStore.selectedFixedAsset?.accountingAccount || '0',
    physicalLocation: fixedAssetsStore.selectedFixedAsset?.physicalLocation || '',
    area: fixedAssetsStore.selectedFixedAsset?.area || '0',
    responsible: fixedAssetsStore.selectedFixedAsset?.responsible || '',
    notes: fixedAssetsStore.selectedFixedAsset?.notes || '',
    status: fixedAssetsStore.selectedFixedAsset?.status || 'Activo'
}

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: toTypedSchema(fixedAssetSchema),
    validateOnMount: false,
    initialValues: initialValues
})

watch(
    () => fixedAssetsStore.selectedFixedAsset,
    (asset) => {
        if (asset) {
            setValues({
                description: asset?.description || '',
                brand: asset?.brand || '',
                model: asset?.model || '',
                serialNumber: asset?.serialNumber || '',
                acquisitionDate: asset?.acquisitionDate || '',
                supplier: asset?.supplier || '',
                invoice: asset?.invoice || '',
                originalValue: asset?.originalValue || 0,
                usefulLife: asset?.usefulLife || 60,
                accountingAccount: asset?.accountingAccount || '0',
                physicalLocation: asset?.physicalLocation || '',
                area: asset?.area || '0',
                responsible: asset?.responsible || '',
                notes: asset?.notes || '',
                status: asset?.status || 'Activo'
            })
        }
    },
    { immediate: true }
)

const modalMap = {
    CREATE: {
        action: createFixedAsset
    },
    EDIT: {
        action: updateFixedAsset
    },
    VIEW: {
        action: null
    }
}

const isViewMode = computed(() => {
    return modalStore.modals[fixedAssetsStore.modalId]?.type === 'VIEW'
})

const onSubmit = handleSubmit(async (formValues) => {
    // If in view mode, just close the modal
    if (isViewMode.value) {
        modalStore.close(fixedAssetsStore.modalId)
        return
    }

    const modalType = modalStore.modals[fixedAssetsStore.modalId]?.type
    const action = modalMap[modalType]?.action
    
    if (!action) return

    try {
        const { message, status } = await action(formValues)
        showNotification(message, status)
        if (status === 'success') props.onRefresh?.()
        modalStore.close(fixedAssetsStore.modalId)
    } catch (error) {
        console.error(error)
        showNotification('Error al procesar la solicitud', 'error')
    }
})

const onClose = () => {
    resetForm()
    fixedAssetsStore.setData()
}
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="fixedAssetsStore.modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <FixedAssetForm />
        </template>
    </BaseModal>
</template>
