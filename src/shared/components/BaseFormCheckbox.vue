<script setup lang="ts">
import { useField } from 'vee-validate'
import { ref } from 'vue'

const props = defineProps<{
    name: string
    label: string
    default?: boolean
}>()

const { value, errorMessage } = useField(props.name)
const isChecked = ref(value)
</script>

<template>
    <div class="flex flex-col space-y-2">
        <label :for="props.name" class="font-semibold">{{ props.label }}</label>
        <div>
            <input
                :id="props.name"
                :name="props.name"
                type="checkbox"
                v-model="value"
                class="toggle"
                :checked="props.default || true"
                :class="isChecked ? 'toggle-success' : 'toggle-gray-400'"
            />
            <span class="text-sm ps-2">
                {{ isChecked ? 'Activo' : 'Inactivo' }}
            </span>
        </div>
        <span v-if="errorMessage" class="text-sm text-red-500">
            {{ errorMessage }}
        </span>
    </div>
</template>
