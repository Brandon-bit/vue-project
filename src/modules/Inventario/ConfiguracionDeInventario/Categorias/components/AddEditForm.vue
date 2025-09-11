<script setup lang="ts">
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormCheckbox from '@/shared/components/BaseFormCheckbox.vue'
</script>

<template>
    <BaseFormInput name="name" type="text" label="Categoría" :required="true" />
    <BaseFormInput name="slug" type="text" label="Slug" :required="true" />
    <BaseFormCheckbox class="mt-4" name="status" label="Estado" />
</template>
