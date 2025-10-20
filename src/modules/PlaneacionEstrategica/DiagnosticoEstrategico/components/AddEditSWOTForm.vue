<script setup lang="ts">
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'

const categoryOptions = [
    { id: 'strengths', label: 'Fortalezas' },
    { id: 'opportunities', label: 'Oportunidades' },
    { id: 'weaknesses', label: 'Debilidades' },
    { id: 'threats', label: 'Amenazas' }
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

        <BaseTextArea
            name="text"
            label="Descripción"
        />
    </div>
</template>
