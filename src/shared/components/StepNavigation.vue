<script setup lang="ts">
import { computed, Ref } from 'vue'
import { inject } from 'vue'

interface Step {
    title: string
    icon: string
    fields: string[]
}

interface ValidationResult {
    valid: boolean
    errors: string[]
}

const currentStep = inject<Ref<number>>('currentStep')!
const stepsConfig = inject<Step[]>('stepsConfig')!
const validateField = inject<(path: string) => Promise<ValidationResult>>('validateField')!

defineProps<{
    isSubmitting: boolean
}>()

const emit = defineEmits(['submit'])
const isLastStep = computed(() => currentStep.value === stepsConfig.length)

const nextStep = async () => {
    const currentFields = stepsConfig[currentStep.value - 1].fields
    const results = await Promise.all(currentFields.map((field) => validateField(field)))

    if (results.every((r) => r.valid)) {
        if (currentStep.value < stepsConfig.length) currentStep.value++
    }
}

const prevStep = () => {
    if (currentStep.value > 1) currentStep.value--
}
</script>

<template>
    <button type="button" class="btn col-span-6" @click="prevStep" :disabled="currentStep === 1">
        Anterior
    </button>

    <button v-if="!isLastStep" type="button" class="btn btn-primary col-span-6" @click="nextStep">
        Siguiente
    </button>

    <button
        v-else
        type="submit"
        :disabled="isSubmitting"
        class="btn btn-primary col-span-6"
        @click="emit('submit')"
    >
        <template v-if="isSubmitting">
            <span class="loading loading-spinner"></span>
            Procesando...
        </template>
        <template v-else> Aceptar </template>
    </button>
</template>
