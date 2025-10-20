<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import useEvaluationStore from '../store/evaluationStore'
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import DeleteLesson from './DeleteLesson.vue'
import AddEditLessonForm from './AddEditLessonForm.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { lessonSchema } from '../validations/evaluationValidation'
import { toTypedSchema } from '@vee-validate/zod'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    onRefresh?: () => void
}>()

const evaluationStore = useEvaluationStore()
const modalStore = useModalStore()

const initialValues = {
    objective: evaluationStore.selectedLesson?.objective || '',
    lesson: evaluationStore.selectedLesson?.lesson || '',
    type: evaluationStore.selectedLesson?.type || '0',
    impact: evaluationStore.selectedLesson?.impact || '',
    actions: evaluationStore.selectedLesson?.actions || ''
}

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: toTypedSchema(lessonSchema),
    validateOnMount: false,
    initialValues: initialValues
})

watch(
    () => evaluationStore.selectedLesson,
    (item) => {
        if (item) {
            setValues({
                objective: item.objective,
                lesson: item.lesson,
                type: item.type,
                impact: item.impact,
                actions: item.actions
            })
        }
    },
    { immediate: true }
)

const modalMap: Record<string, any> = {
    CREATE: {
        component: AddEditLessonForm,
        action: async (values: any) => {
            console.log('Create Lesson:', values)
            return { message: 'Lección registrada exitosamente', status: 'success' }
        }
    },
    EDIT: {
        component: AddEditLessonForm,
        action: async (values: any) => {
            console.log('Edit Lesson:', values)
            return { message: 'Lección actualizada exitosamente', status: 'success' }
        }
    },
    DELETE: {
        component: DeleteLesson,
        action: async () => {
            console.log('Delete Lesson')
            return { message: 'Lección eliminada exitosamente', status: 'success' }
        }
    }
}

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[evaluationStore.lessonModalId]?.type
    if (!modalType) return AddEditLessonForm
    return modalMap[modalType]?.component || AddEditLessonForm
})

const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[evaluationStore.lessonModalId]?.type
    const action = modalMap[modalType]?.action
    try {
        const { message, status } = await action(formValues)
        showNotification(message, status)
        if (status === 'success') props.onRefresh?.()
        modalStore.close(evaluationStore.lessonModalId)
    } catch (error) {
        console.error(error)
    }
})

const onClose = () => {
    resetForm()
    evaluationStore.setLessonData()
}
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="evaluationStore.lessonModalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>
