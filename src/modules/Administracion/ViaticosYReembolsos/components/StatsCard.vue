<script setup lang="ts">
defineProps<{
    title: string
    value: string | number
    subtitle: string
    icon: string
    iconColor: string
}>()
</script>

<template>
    <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-sm font-medium text-base-content/70">{{ title }}</p>
                    <p class="text-2xl font-bold mt-1">{{ value }}</p>
                    <p class="text-xs text-base-content/60 mt-1">{{ subtitle }}</p>
                </div>
                <span :class="['material-symbols-outlined text-4xl', iconColor]">{{ icon }}</span>
            </div>
        </div>
    </div>
</template>
