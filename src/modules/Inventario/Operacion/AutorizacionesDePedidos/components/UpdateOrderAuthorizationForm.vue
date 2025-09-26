<script setup lang="ts">
import { ref } from 'vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'

interface SelectOptionsType {
    id: number
    label: string
}

const status = ref<SelectOptionsType[]>([
    { id: 1, label: 'Aprobar' },
    { id: 2, label: 'Rechazar' }
])
</script>

<template>
    <BaseFormSelect label="Estado" name="type" :options="status" />
</template>
