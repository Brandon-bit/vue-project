<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import useVacationStore from '@rrhh/Vacaciones/store/vacationStore'
import DeleteVacation from '@rrhh/Vacaciones/components/DeleteVacation.vue'
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import VacationForm from '@rrhh/Vacaciones/components/VacationForm.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import {
    createVacationSchema,
    updateVacationSchema,
    deleteVacationSchema
} from '@rrhh/Vacaciones/validations/vacationSchema'
import { toTypedSchema } from '@vee-validate/zod'
import { useVacationsActions } from '@rrhh/Vacaciones/composables/useVacationsActions'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    onRefresh?: () => void
}>()

const vacationStore = useVacationStore()
const modalStore = useModalStore()
const { createVacation, updateVacation, deleteVacation } = useVacationsActions()
const mode = computed(() => modalStore.modals[vacationStore.modalId]?.type)

const modalMap = {
    CREATE: {
        component: VacationForm,
        action: createVacation,
        schemaValidation: createVacationSchema
    },
    UPDATE: {
        component: VacationForm,
        action: updateVacation,
        schemaValidation: updateVacationSchema
    },
    DELETE: {
        component: DeleteVacation,
        action: deleteVacation,
        schemaValidation: deleteVacationSchema
    }
}

const currentSchema = computed(() => {
    const modalType = mode.value as 'CREATE' | 'UPDATE' | 'DELETE'
    return modalMap[modalType]?.schemaValidation || modalMap.CREATE.schemaValidation
})

const initialValues = {
    employeeId: vacationStore.selectedVacation?.employeeId,
    employeeName: vacationStore.selectedVacation?.employeeName,
    startDate: vacationStore.selectedVacation?.startDate,
    endDate: vacationStore.selectedVacation?.endDate,
    comments: vacationStore.selectedVacation?.comments,
    status: vacationStore.selectedVacation?.status
}

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: computed(() => toTypedSchema(currentSchema.value)),
    initialValues: initialValues,
    validateOnMount: false
})

watch(
    () => vacationStore.selectedVacation,
    (current) => {
        if (mode.value === 'UPDATE' && current) {
            setValues({ ...current })
        } else if (mode.value === 'CREATE') {
            resetForm()
        }
    }
)

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[vacationStore.modalId]?.type as 'CREATE' | 'UPDATE' | 'DELETE'
    return modalMap[modalType]?.component
})

const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[vacationStore.modalId]?.type as 'CREATE' | 'UPDATE' | 'DELETE'
    const action = modalMap[modalType]?.action
    try {
        const { message, status } = await action(formValues as any)
        showNotification(message, status)
        if (status === 'success') props.onRefresh?.()
        modalStore.close(vacationStore.modalId)
    } catch (error) {
        console.error(error)
        showNotification('Ocurrió un error al procesar la solicitud', 'error')
    }
})

const onClose = () => {
    resetForm()
    vacationStore.clearData()
}
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="vacationStore.modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>
