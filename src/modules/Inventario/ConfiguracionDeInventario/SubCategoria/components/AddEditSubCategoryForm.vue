<script setup lang="ts">
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormCheckbox from '@/shared/components/BaseFormCheckbox.vue'
import BaseFormSingleImageInput from '@/shared/components/BaseFormSingleImageInput.vue';
import useSubCategoryStore from '@inventario/ConfiguracionDeInventario/SubCategoria/store/subCategoryStore'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue';
import { useSubCategory } from '@inventario/ConfiguracionDeInventario/SubCategoria/composables/useSubCategory'
import { onMounted, ref } from 'vue';
import {ParentCategoryType} from '@inventario/ConfiguracionDeInventario/SubCategoria/types/subCategoryTypes'
const subCategoryStore = useSubCategoryStore()
const { getParentCategories } = useSubCategory()

const parentCategoriesOptions = ref<ParentCategoryType[]>([])


onMounted(async () => {
    parentCategoriesOptions.value = await getParentCategories()
})
</script>

<template>
    <BaseFormSelect label="Categoría padre" name="parentCategoryId" :options="parentCategoriesOptions" :required="true" />
    <BaseFormInput name="name" type="text" label="Categoría" :required="true" />
    <BaseFormInput name="slug" type="text" label="Slug" :required="true" />
    <BaseFormSingleImageInput name="image" label="Imagen" :multiple="false" accept="image/png, image/jpeg" :image-url="subCategoryStore.selectedSubCategory?.imageUrl" />
    <BaseFormCheckbox class="mt-4" name="status" label="Estado" />
</template>
