<script setup lang="ts">
interface Step {
    title: string
    icon: string
    fields: string[]
}

defineProps<{
    stepsConfig: Step[]
    step: number
}>()
</script>
<template>
    <ul class="steps w-full mb-8">
        <li
            v-for="(stepItem, index) in stepsConfig"
            :key="index"
            class="step"
            :class="{ 'step-primary': step >= index + 1 }"
        >
            <span
                class="material-symbols-outlined step-icon !flex items-center justify-center mb-1"
                >{{ stepItem.icon }}</span
            >
        </li>
    </ul>
</template>
<style></style>
