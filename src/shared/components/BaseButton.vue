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
        :class="`btn btn-${variant || 'primary'} ${className} modern-btn`"
    >
        <span v-show="icon || false" class="material-symbols-outlined"> {{ props.icon }} </span>
        {{ text }}
    </button>
</template>

<style scoped>
.modern-btn {
    transition: all 0.3s ease-in-out;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    border-radius: 0.5rem;
    font-weight: 500;
}

.modern-btn:active {
    transform: scale(0.98);
}

.modern-btn:not(:disabled):hover {
    transform: translateY(-0.0625rem);
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}

.modern-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: none;
}

.modern-btn .material-symbols-outlined {
    transition: transform 0.3s;
}

.modern-btn:hover .material-symbols-outlined {
    transform: scale(1.05);
}
</style>
