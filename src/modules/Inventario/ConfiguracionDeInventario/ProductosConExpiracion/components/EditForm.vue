<script setup lang="ts">
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
</script>

<template>
    <BaseFormInput name="fecha_fabricacion" type="date" label="Fecha expiración" :required="true" />
    <BaseFormInput name="fecha_expiracion" type="date" label="Fecha expiración" :required="true" />
</template>
