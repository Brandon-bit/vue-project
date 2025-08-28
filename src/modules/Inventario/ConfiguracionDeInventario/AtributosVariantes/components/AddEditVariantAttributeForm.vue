<script setup lang="ts">
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import InputTags from './InputTags.vue';
import BaseFormCheckbox from '@/shared/components/BaseFormCheckbox.vue'
</script>

<template>
    <BaseFormInput name="name" type="text" label="Nombre" :required="true"/>
    <InputTags name="values" label="Variante" />
    <BaseFormCheckbox class="mt-4" name="active" label="Estado" :default="true" />
</template>
