<script setup lang="ts">
import useSubCategoryStore from '@inventario/ConfiguracionDeInventario/SubCategoria/store/subCategoryStore'
const subCategoryStore = useSubCategoryStore()
</script>

<template>
    <p>
        ¿Estás seguro que deseas eliminar la categoría
        <span class="!font-semibold"> "{{ subCategoryStore.selectedSubCategory?.name }}" ? </span>
    </p>
</template>
