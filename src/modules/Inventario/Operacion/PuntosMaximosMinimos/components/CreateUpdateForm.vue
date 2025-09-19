<script setup lang="ts">
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
</script>

<template>
    <BaseFormInput name="maximum" type="number" label="Máximo" :required="true" />
    <BaseFormInput name="minimum" type="number" label="Mínimo" :required="true" />
    <BaseFormInput name="stock" type="number" label="Stock" :required="true" />
    <BaseFormInput name="reorderPoints" type="number" label="Punto de reorden" :required="true" />
    <BaseFormInput name="suggestion" type="text" label="Sugerencia" :required="true" />
</template>
