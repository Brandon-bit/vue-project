<script setup lang="ts">
defineProps<{
    label: string
    value: string | number
    icon: string
    iconColor: string
}>()
</script>

<template>
    <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
            <p class="text-sm text-base-content/70">{{ label }}</p>
            <div class="flex items-center justify-between mt-2">
                <p class="text-3xl font-bold">{{ value }}</p>
                <span :class="['material-symbols-outlined text-4xl', iconColor]">{{ icon }}</span>
            </div>
        </div>
    </div>
</template>
