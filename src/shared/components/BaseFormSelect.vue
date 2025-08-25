<script setup lang="ts">
import { useField } from 'vee-validate'
import { computed } from 'vue'

const props = defineProps<{
    label: string
    name: string
    options: { id: number; label: string }[]
    required?: boolean
    class?: string
}>()

const { value, errorMessage } = useField(props.name, undefined, {
    initialValue: ''
})

const optionsMap = computed(() => [{ id: '', label: 'Elige una opción' }, ...props.options])
</script>

<template>
    <div class="flex flex-col space-y-2 mb-4" :class="props.class || ''">
        <label :for="name" class="font-semibold"
            >{{ label }}
            <span v-if="props.required" class="text-error"> *</span>
        </label>
        <select
            v-model="value"
            class="select w-full"
            :name="props.name"
            :class="{ 'select-error': errorMessage }"
        >
            <option
                v-for="(option, index) in optionsMap"
                :key="index"
                :value="option.id.toString()"
            >
                {{ option.label }}
            </option>
        </select>
        <div v-if="errorMessage" class="text-error">{{ errorMessage }}</div>
    </div>
</template>
