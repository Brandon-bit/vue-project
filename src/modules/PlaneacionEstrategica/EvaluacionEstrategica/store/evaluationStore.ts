import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Lesson } from '../types/evaluationTypes'

export const useEvaluationStore = defineStore('evaluation', () => {
    const lessonModalId = 'lesson-modal'
    const closureModalId = 'closure-modal'
    const selectedLesson = ref<Lesson | null>(null)
    const currentStep = ref(1)

    const setLessonData = (data: Lesson | null = null) => {
        selectedLesson.value = data
    }

    const setCurrentStep = (step: number) => {
        currentStep.value = step
    }

    const resetWizard = () => {
        currentStep.value = 1
    }

    return {
        lessonModalId,
        closureModalId,
        selectedLesson,
        currentStep,
        setLessonData,
        setCurrentStep,
        resetWizard
    }
})

export default useEvaluationStore
