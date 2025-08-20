<script setup lang="ts">
import { useField } from 'vee-validate'
import { computed } from 'vue'

const props = defineProps<{
    label: string
    name: string
    options: { id: string; label: string }[]
}>()

const { value, errorMessage, meta } = useField(props.name, undefined, {
    initialValue: ''
})

const optionsMap = computed(() => [{ id: '', label: 'Elige una opción' }, ...props.options])
</script>

<template>
    <div class="flex flex-col space-y-2">
        <label :for="name" class="font-semibold">{{ label }}</label>
        <select
            :id="name"
            v-model="value"
            class="select w-full"
            :class="{ 'select-error': meta.touched && errorMessage }"
            @blur="meta.touched = true"
        >
            <option
                v-for="(option, index) in optionsMap"
                :key="index"
                :value="option.id.toString()"
            >
                {{ option.label }}
            </option>
        </select>
        <div v-if="meta.touched && errorMessage" class="text-error">{{ errorMessage }}</div>
    </div>
</template>
