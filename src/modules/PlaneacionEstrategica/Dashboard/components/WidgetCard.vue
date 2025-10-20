<script setup lang="ts">
defineProps<{
    title: string
    subtitle?: string
    icon: string
}>()
</script>

<template>
    <div class="card bg-base-200 shadow-sm">
        <div class="card-body">
            <h3 class="card-title flex items-center gap-2">
                <span class="material-symbols-outlined">{{ icon }}</span>
                {{ title }}
            </h3>
            <p v-if="subtitle" class="text-sm text-base-content/60 mb-4">{{ subtitle }}</p>
            
            <slot></slot>
        </div>
    </div>
</template>
