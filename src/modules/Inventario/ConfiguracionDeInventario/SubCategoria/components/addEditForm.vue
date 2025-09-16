<script setup lang="ts">
import { onMounted, computed } from 'vue';
import BaseFormInput from '@/shared/components/BaseFormInput.vue';
import BaseFormCheckbox from '@/shared/components/BaseFormCheckbox.vue';
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue';
import { useCategory } from '@/modules/Inventario/ConfiguracionDeInventario/Categorias/composables/useCategory';
// 1. IMPORTA EL STORE DE CATEGORÍAS
import useCategoryStore from '@/modules/Inventario/ConfiguracionDeInventario/Categorias/store/categoryStore';

// 2. ACTIVA EL STORE
const categoryStore = useCategoryStore();
const { getCategories } = useCategory();


// Solo necesitas la función

const categoryOptions = computed(() => {

    if (!Array.isArray(categoryStore.categories)) {
        return [];
    }

    return categoryStore.categories.map(category => ({
        id: category.id,
        label: category.name    
    }));
});

onMounted(() => {
    // Si las categorías no se han cargado, las busca
    if (categoryStore.categories.length === 0) {
        getCategories();   
    }
});
</script>

<template>
    <div class="space-y-4">
         <BaseFormSelect
            v-if="categoryOptions"
            name="categoryId"
            label="Categoría Padre"
            :options="categoryOptions" placeholder="Selecciona una categoría"
        />
        <div v-else>Cargando categorías...</div>
        <BaseFormInput 
            name="name" 
            label="Nombre de la Subcategoría" 
        />
        <BaseFormInput 
            name="code" 
            label="Code Category" 
        />
        <BaseFormInput 
            name="description" 
            label="description" 
        />


        <BaseFormCheckbox 
            class="mt-4" 
            name="status" 
            label="Estado" 
        />
    </div>
</template>