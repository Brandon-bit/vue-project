<script setup lang="ts">
import { useField } from 'vee-validate'
import { computed } from 'vue'

const props = withDefaults(
    defineProps<{
        label: string
        name: string
        options: { id: number | string; label: string }[]
        required?: boolean
        class?: string
        disabled?: boolean
    }>(),
    {
        disabled: false
    }
)

const { value, errorMessage } = useField(props.name)

const optionsMap = computed(() => [{ id: 0, label: 'Elige una opción' }, ...props.options])
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
            :disabled="props.disabled"
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
