<script setup lang="ts">
import { useField } from 'vee-validate'

const props = withDefaults(
    defineProps<{
        label: string
        name: string
        class?: string
        readonly?: boolean
    }>(),
    {
        readonly: false
    }
)

const { value, errorMessage } = useField(props.name)
</script>

<template>
    <div :class="['flex flex-col space-y-2', props.class]">
        <label :for="name" class="font-semibold">{{ label }}</label>
        <textarea
            v-model="value"
            class="textarea w-full"
            :class="{ 'textarea-error': errorMessage }"
            placeholder="Ingrese valor"
            :readonly="props.readonly"
        >
        </textarea>
        <div v-if="errorMessage" class="text-error">{{ errorMessage }}</div>
    </div>
</template>
