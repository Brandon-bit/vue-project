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
        allowDecimal?: boolean
    }>(),
    {
        readonly: false,
        type: 'text',
        allowDecimal: false
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
            :step="props.type === 'number' ? (allowDecimal ? '0.01' : '1') : undefined"
            :class="['input w-full', { 'input-error': errorMessage }, props.inputClass]"
        />

        <span v-if="errorMessage" class="text-sm text-error">
            {{ errorMessage }}
        </span>
    </div>
</template>
