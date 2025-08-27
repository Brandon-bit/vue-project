<script setup lang="ts">
const props = defineProps<{
    icon?: string
    variant?: string
    text: string
    className?: string
}>()
</script>

<template>
    <button type="button" :class="`btn btn-${variant || 'primary'} ${className}`">
        <span v-show="icon || false" class="material-symbols-outlined">
            {{ props.icon }}
        </span>
        {{ text }}
    </button>
</template>
