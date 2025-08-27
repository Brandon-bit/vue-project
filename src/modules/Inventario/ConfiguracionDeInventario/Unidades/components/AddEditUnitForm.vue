<script setup lang="ts">
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormCheckbox from '@/shared/components/BaseFormCheckbox.vue'
</script>

<template>
    <BaseFormInput name="name" type="text" label="Nombre" :required="true"/>
    <BaseFormInput name="shortName" type="text" label="Abreviación" :required="true"/>
    <BaseFormCheckbox class="mt-4" name="active" label="Estado" :default="true" />
</template>