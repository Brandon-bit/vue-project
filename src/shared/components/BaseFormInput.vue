<script setup lang="ts">
import { useField } from 'vee-validate'

const props = withDefaults(
    defineProps<{
        name: string
        label: string
        placeholder?: string
        type?: string
        required?: boolean
        class?: string
        inputClass?: string
        readonly?: boolean
    }>(),
    {
        readonly: false,
        type: 'text'
    }
)

const { value, errorMessage } = useField(props.name)
</script>

<template>
    <div :class="['flex flex-col space-y-2 mb-4', props.class]">
        <label :for="props.name" class="font-semibold">
            {{ props.label }}
            <span v-if="props.required" class="text-error"> *</span>
        </label>

        <input
            :name="props.name"
            v-model="value"
            :readonly="props.readonly"
            :type="props.type"
            :placeholder="props.placeholder"
            :class="['input w-full', { 'input-error': errorMessage }, props.inputClass]"
        />

        <span v-if="errorMessage" class="text-sm text-error">
            {{ errorMessage }}
        </span>
    </div>
</template>
