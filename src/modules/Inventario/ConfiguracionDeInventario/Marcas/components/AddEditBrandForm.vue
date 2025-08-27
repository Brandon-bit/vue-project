<script setup lang="ts">
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormCheckbox from '@/shared/components/BaseFormCheckbox.vue'
import BaseFormInputFile from '@/shared/components/BaseFormInputFile.vue';
</script>

<template>
    <BaseFormInput name="name" type="text" label="Marca" :required="true"/>
    <BaseFormInputFile name="image" label="Logo" :multiple="false" accept="image/png, image/jpeg" />
    <BaseFormCheckbox class="mt-4" name="active" label="Estado" :default="true" />
</template>