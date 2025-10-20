<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
    title: string
    value: string | number
    subtitle?: string
    icon: string
    gradientType: 'success' | 'info' | 'secondary' | 'error'
}>()

const gradientClass = computed(() => {
    const gradients: Record<string, string> = {
        'success': 'bg-gradient-to-br from-success/10 to-success/5 border-success/20',
        'info': 'bg-gradient-to-br from-info/10 to-info/5 border-info/20',
        'secondary': 'bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20',
        'error': 'bg-gradient-to-br from-error/10 to-error/5 border-error/20'
    }
    return gradients[props.gradientType] || ''
})

const iconColor = computed(() => {
    const colors: Record<string, string> = {
        'success': 'text-success',
        'info': 'text-info',
        'secondary': 'text-secondary',
        'error': 'text-error'
    }
    return colors[props.gradientType] || 'text-base-content'
})
</script>

<template>
    <div class="card shadow-sm" :class="gradientClass">
        <div class="card-body p-4">
            <div class="flex items-center justify-between mb-2">
                <p class="text-sm text-base-content/60">{{ title }}</p>
                <span class="material-symbols-outlined" :class="iconColor">{{ icon }}</span>
            </div>
            <p class="text-3xl font-bold">{{ value }}</p>
            <p v-if="subtitle" class="text-xs text-base-content/60 mt-2">{{ subtitle }}</p>
        </div>
    </div>
</template>
