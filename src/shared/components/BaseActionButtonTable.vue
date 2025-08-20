<script setup lang="ts">
const props = defineProps<{
    icon: string
    variant?: string
    className?: string
    tooltipText: string
}>()
</script>

<template>
    <button
        type="button"
        :class="`btn btn-outline btn-${variant || 'edit'} ${className} action-btn-table`"
        v-tooltip.top="`${tooltipText}`"
    >
        <span class="material-symbols-outlined"> {{ props.icon }} </span>
    </button>
</template>
