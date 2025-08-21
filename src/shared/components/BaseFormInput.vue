<script setup lang="ts">
import { useField } from 'vee-validate'

const props = defineProps<{
    name: string
    label: string
    placeholder?: string
    type?: string
    required?: boolean
    class?: string
}>()

const { value, errorMessage } = useField(props.name)
</script>

<template>
    <div class="flex flex-col space-y-2 mb-4" :class="props.class || ''">
        <label :for="props.name" class="font-semibold">
            {{ props.label }}
            <span v-if="props.required" class="text-error"> *</span>
        </label>

        <input
            :name="props.name"
            v-model="value"
            :type="props.type || 'text'"
            :placeholder="props.placeholder"
            class="input w-full"
            :class="{ 'input-error': errorMessage }"
        />

        <span v-if="errorMessage" class="text-sm text-error">
            {{ errorMessage }}
        </span>
    </div>
</template>
