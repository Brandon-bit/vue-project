<script setup lang="ts">
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormCheckbox from '@/shared/components/BaseFormCheckbox.vue'
import BaseFormSingleImageInput from '@/shared/components/BaseFormSingleImageInput.vue';
import useCategoryStore from '@inventario/ConfiguracionDeInventario/Categorias/store/categoryStore'

const categoryStore = useCategoryStore()
</script>

<template>
    <BaseFormInput name="name" type="text" label="Categoría" :required="true" />
    <BaseFormInput name="slug" type="text" label="Slug" :required="true" />
    <BaseFormSingleImageInput name="image" label="Imagen" :multiple="false" accept="image/png, image/jpeg" :image-url="categoryStore.selectedCategory.imageUrl" />
    <BaseFormCheckbox class="mt-4" name="status" label="Estado" />
</template>
