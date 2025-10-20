<script setup lang="ts">
import { computed } from 'vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'

const bankOptions = computed(() => [
    { id: 1, label: 'BBVA' },
    { id: 2, label: 'Santander' },
    { id: 3, label: 'Banorte' },
    { id: 4, label: 'Genérico (CSV)' }
])
</script>

<template>
    <BaseFormSelect
        name="selectedBank"
        label="Selecciona tu banco"
        :options="bankOptions"
    />
</template>
