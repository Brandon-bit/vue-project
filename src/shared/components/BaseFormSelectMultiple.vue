<script setup lang="ts">
import { useField } from 'vee-validate'
import { computed } from 'vue'
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.css'

const props = defineProps<{
    label: string
    name: string
    options: { id: number | string; label: string }[]
    required?: boolean
    class?: string
}>()

const { value: fieldValue, errorMessage } = useField<number[]>(props.name)

// Computed para manejar la conversión entre objetos y IDs
const selectedOptions = computed({
    get: () => {
        if (!fieldValue.value || fieldValue.value.length === 0) return []
        return props.options.filter((opt) => fieldValue.value.includes(Number(opt.id)))
    },
    set: (newValue: any[]) => {
        fieldValue.value = newValue.map((item) => Number(item.id))
    }
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
            v-model="selectedOptions"
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

/* Tags container - wrap on mobile, scroll on desktop */
.multiselect__tags {
    display: flex;
    flex-wrap: wrap;
    max-width: 100%;
    padding: 8px 40px 8px 8px;
    min-height: 40px;
}

/* Desktop: horizontal scroll */
@media (min-width: 768px) {
    .multiselect__tags {
        flex-wrap: nowrap;
        overflow-x: auto;
        overflow-y: hidden;
    }

    .multiselect__tags::-webkit-scrollbar {
        height: 6px;
    }

    .multiselect__tags::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 10px;
    }

    .multiselect__tags::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 10px;
    }

    .multiselect__tags::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
}
</style>
