<script setup lang="ts">
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormCheckbox from '@/shared/components/BaseFormCheckbox.vue'
import BaseFormSingleImageInput from '@/shared/components/BaseFormSingleImageInput.vue';
import useBrandStore from '@inventario/ConfiguracionDeInventario/Marcas/store/brandStore';

const brandStore = useBrandStore()
</script>

<template>
    <BaseFormInput name="name" type="text" label="Marca" :required="true"/>
    <BaseFormSingleImageInput name="image" label="Logo" :image-url="brandStore.selectedBrand?.imageUrl" />
    <BaseFormCheckbox class="mt-4" name="active" label="Estado" :default="true" />
</template>