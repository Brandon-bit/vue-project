<script setup lang="ts">
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
</script>

<template>
    <BaseFormInput name="cantidad" type="number" label="Cantidad" :required="true" />
    <BaseFormInput name="cantidadAlerta" type="number" label="Cantidad alerta" :required="true" />
</template>
