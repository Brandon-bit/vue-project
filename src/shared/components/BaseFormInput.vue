<script setup lang="ts">
import { useField } from 'vee-validate'

const props = defineProps<{
    label: string
    name: string
    type?: string
}>()

const { value, errorMessage, meta } = useField(props.name)
</script>

<template>
    <div class="flex flex-col space-y-2">
        <label :for="name" class="font-semibold">{{ label }}</label>
        <input
            :id="name"
            v-model="value"
            :type="props.type || 'text'"
            class="input w-full"
            :class="{ 'input-error': meta.touched && errorMessage }"
            placeholder="Ingrese valor"
            @blur="meta.touched = true"
        />
        <div v-if="meta.touched && errorMessage" class="text-error">{{ errorMessage }}</div>
    </div>
</template>
