<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        icon?: string
        variant?: string
        text: string
        className?: string
        disabled?: boolean
    }>(),
    {
        disabled: false
    }
)
</script>

<template>
    <button
        :disabled="props.disabled"
        type="button"
        :class="`btn btn-${variant || 'primary'} ${className}`"
    >
        <span v-show="icon || false" class="material-symbols-outlined"> {{ props.icon }} </span>
        {{ text }}
    </button>
</template>
