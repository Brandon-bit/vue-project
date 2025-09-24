<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import useMaxMinStore from '@inventario/Operacion/PuntosMaximosMinimos/store/maxMinStore'
import DeleteMaxMin from '@inventario/Operacion/PuntosMaximosMinimos/components/DeleteMaxMin.vue'
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import CreateUpdateForm from '@inventario/Operacion/PuntosMaximosMinimos/components/CreateUpdateForm.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { createUpdateMaxMinSchema } from '@inventario/Operacion/PuntosMaximosMinimos/validations/maxMinSchema'
import { toTypedSchema } from '@vee-validate/zod'
import { useMaxMinActions } from '@/modules/Inventario/Operacion/PuntosMaximosMinimos/composables/useMaxMinActions'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    onRefresh?: () => void
}>()

const maxMinStore = useMaxMinStore()
const modalStore = useModalStore()
const { createMaxMin, updateMaxMin, deleteMaxMin } = useMaxMinActions()
const mode = computed(() => modalStore.modals[maxMinStore.modalId]?.type ?? 'CREATE')

const initialValues = {
    minimum: maxMinStore.selectedProduct?.minimum,
    maximum: maxMinStore.selectedProduct?.maximum,
    stock: maxMinStore.selectedProduct?.stock,
    reorderPoints: maxMinStore.selectedProduct?.reorderPoints,
    suggestion: maxMinStore.selectedProduct?.suggestion
}

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: toTypedSchema(createUpdateMaxMinSchema),
    initialValues: initialValues,
    validateOnMount: false
})

watch(
    () => maxMinStore.selectedProduct,
    (current) => {
        if (mode.value === 'UPDATE' && current) {
            setValues({ ...current })
        } else if (mode.value === 'CREATE') {
            resetForm()
        }
    }
)

const modalMap = {
    CREATE: {
        component: CreateUpdateForm,
        action: createMaxMin
    },
    UPDATE: {
        component: CreateUpdateForm,
        action: updateMaxMin
    },
    DELETE: {
        component: DeleteMaxMin,
        action: deleteMaxMin
    }
}

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[maxMinStore.modalId]?.type
    return modalMap[modalType]?.component
})

const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[maxMinStore.modalId]?.type
    const action = modalMap[modalType]?.action
    try {
        const { message, status } = await action(formValues)
        showNotification(message, status)
        if (status == 'success') props.onRefresh?.()
        modalStore.close(maxMinStore.modalId)
    } catch (error) {
        console.error(error)
    }
})

const onClose = () => {
    resetForm()
    maxMinStore.setData()
}
</script>
<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="maxMinStore.modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>
