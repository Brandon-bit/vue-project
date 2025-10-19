<script setup lang="ts">
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'

const categoryOptions = [
    { id: 'Political', label: 'Político' },
    { id: 'Economic', label: 'Económico' },
    { id: 'Social', label: 'Social' },
    { id: 'Technological', label: 'Tecnológico' },
    { id: 'Environmental', label: 'Ecológico' },
    { id: 'Legal', label: 'Legal' }
]

const trendOptions = [
    { id: 'growing', label: 'Creciente' },
    { id: 'stable', label: 'Estable' },
    { id: 'declining', label: 'Decreciente' }
]
</script>

<template>
    <div class="space-y-4">
        <BaseFormSelect
            name="category"
            label="Categoría"
            :options="categoryOptions"
            :required="true"
        />

        <BaseFormInput
            name="factor"
            label="Factor"
            type="text"
            placeholder="Describe el factor..."
            :required="true"
        />

        <BaseFormInput
            name="impact"
            label="Impacto (1-10)"
            type="number"
            :required="true"
        />

        <BaseFormSelect
            name="trend"
            label="Tendencia"
            :options="trendOptions"
            :required="true"
        />
    </div>
</template>
