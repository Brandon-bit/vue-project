<script setup lang="ts">
defineProps<{
    title: string
    value: string | number
    subtitle: string
    icon: string
}>()
</script>

<template>
    <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
            <div class="flex items-center justify-between">
                <h3 class="text-sm font-medium text-base-content/70">{{ title }}</h3>
                <span class="material-symbols-outlined text-base-content/50">{{ icon }}</span>
            </div>
            <div class="mt-2">
                <p class="text-2xl font-bold">{{ value }}</p>
                <p class="text-xs text-base-content/70 mt-1">{{ subtitle }}</p>
            </div>
        </div>
    </div>
</template>
