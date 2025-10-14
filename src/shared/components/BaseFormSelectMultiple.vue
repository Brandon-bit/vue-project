<script setup lang="ts">
import { useField } from 'vee-validate'
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.css'

const props = defineProps<{
    label: string
    name: string
    options: { id: number | string; label: string }[]
    required?: boolean
    class?: string
}>()

const { value, errorMessage } = useField(props.name, undefined, {
    syncVModel: true
})
</script>

<template>
    <div :class="['flex flex-col space-y-2 mb-4', props.class]">
        <label class="font-semibold">
            {{ props.label }}
            <span v-if="props.required" class="text-error"> *</span>
        </label>

        <Multiselect
            :name="props.name"
            v-model="value"
            :options="props.options"
            :multiple="true"
            placeholder="Elige una o varias opciones"
            label="label"
            :show-labels="false"
            track-by="id"
            :max-height="200"
            :class="{ '!select w-full': errorMessage }"
        />
        <div v-if="errorMessage" class="text-error">{{ errorMessage }}</div>
    </div>
</template>
<style>
.multiselect__tag {
    background: var(--color-primary);
}

.multiselect__option--highlight {
    background: var(--color-primary);
}

/* Limit dropdown height for better accordion compatibility */
.multiselect__content-wrapper {
    max-height: 200px !important;
    overflow-y: auto;
}
</style>
