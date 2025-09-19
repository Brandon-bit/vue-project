<script setup lang="ts">
import { useField } from 'vee-validate'
import { computed } from 'vue'

interface Option {
    value: string | number
    label: string
    checked?: boolean
}

const props = defineProps<{
    name: string
    label: string
    options: Option[]
    class?: string
    type? : string
}>()

const defaultVal = computed(() => {
    const found = props.options.find((opt) => opt.checked)
    return found ? found.value : ''
})

const { value, errorMessage } = useField(() => props.name, undefined, {
    initialValue: defaultVal.value
})
</script>

<template>
    <div class="mb-2" :class="props.class">
        <label class="block font-semibold mb-3">{{ props.label }}</label>
        <div :class="['flex gap-4', props.type || 'flex-col']">
            <label
                v-for="option in props.options"
                :key="option.value"
                class="flex items-center gap-2"
            >
                <input
                    type="radio"
                    :name="props.name"
                    :value="option.value"
                    v-model="value"
                    class="radio"
                />
                <span v-html="option.label" />
            </label>
        </div>

        <span v-if="errorMessage" class="text-sm text-red-500">
            {{ errorMessage }}
        </span>
    </div>
</template>
