<script setup lang="ts">
import { useField } from 'vee-validate'

const props = defineProps<{
    label: string
    name: string
}>()

const { value, errorMessage } = useField(props.name)
</script>

<template>
    <div class="flex flex-col space-y-2">
        <label :for="name" class="font-semibold">{{ label }}</label>
        <textarea
            v-model="value"
            class="textarea w-full"
            :class="{ 'textarea-error': errorMessage }"
            placeholder="Ingrese valor"
        >
        </textarea>
        <div v-if="errorMessage" class="text-error">{{ errorMessage }}</div>
    </div>
</template>
