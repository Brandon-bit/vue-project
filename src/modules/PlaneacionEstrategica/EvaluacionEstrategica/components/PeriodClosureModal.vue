<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import useEvaluationStore from '../store/evaluationStore'
import { useForm } from 'vee-validate'
import PeriodClosureWizard from './PeriodClosureWizard.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { periodClosureSchema } from '../validations/evaluationValidation'
import { toTypedSchema } from '@vee-validate/zod'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    onRefresh?: () => void
}>()

const evaluationStore = useEvaluationStore()
const modalStore = useModalStore()

const { handleSubmit, isSubmitting, resetForm } = useForm({
    validationSchema: toTypedSchema(periodClosureSchema),
    validateOnMount: false,
    initialValues: {
        period: '',
        highlightedAchievements: '',
        opportunityAreas: '',
        recommendations: ''
    }
})

const onSubmit = handleSubmit(async (formValues) => {
    if (evaluationStore.currentStep < 3) {
        evaluationStore.setCurrentStep(evaluationStore.currentStep + 1)
        return
    }

    try {
        console.log('Generate Period Closure Report:', formValues)
        showNotification('Reporte de cierre generado exitosamente', 'success')
        props.onRefresh?.()
        modalStore.close(evaluationStore.closureModalId)
        evaluationStore.resetWizard()
    } catch (error) {
        console.error(error)
    }
})

const onClose = () => {
    resetForm()
    evaluationStore.resetWizard()
}

const handlePrevious = () => {
    if (evaluationStore.currentStep > 1) {
        evaluationStore.setCurrentStep(evaluationStore.currentStep - 1)
    }
}
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="evaluationStore.closureModalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
        :showPreviousButton="evaluationStore.currentStep > 1"
        :onPrevious="handlePrevious"
        :submitButtonText="evaluationStore.currentStep === 3 ? 'Generar Reporte Final' : 'Siguiente'"
    >
        <template v-slot:modalBody>
            <PeriodClosureWizard />
        </template>
    </BaseModal>
</template>
