<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        title: string
        subtitle?: string
    }>(),
    {
        title: 'Title'
    }
)
</script>

<template>
    <div class="mb-6">
        <h2 class="text-3xl !font-semibold">{{ props.title }}</h2>
        <p v-if="props.subtitle" class="text-gray-500 mt-1">
            {{ props.subtitle }}
        </p>
    </div>
</template>