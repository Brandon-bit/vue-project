<script setup lang="ts">
import { computed } from 'vue'
import useEvaluationStore from '../store/evaluationStore'
import Step1Results from './wizard/Step1Results.vue'
import Step2Analysis from './wizard/Step2Analysis.vue'
import Step3Recommendations from './wizard/Step3Recommendations.vue'

const evaluationStore = useEvaluationStore()

const currentStepComponent = computed(() => {
    const components: Record<number, any> = {
        1: Step1Results,
        2: Step2Analysis,
        3: Step3Recommendations
    }
    return components[evaluationStore.currentStep] || Step1Results
})
</script>

<template>
    <div class="space-y-6">
        <div class="text-sm text-base-content/60">
            Paso {{ evaluationStore.currentStep }} de 3 - Completa la evaluación del periodo
        </div>
        
        <component :is="currentStepComponent" />
    </div>
</template>
