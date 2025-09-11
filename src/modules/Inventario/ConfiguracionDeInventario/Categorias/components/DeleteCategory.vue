<script setup lang="ts">
import useCategoryStore from '@/modules/Inventario/ConfiguracionDeInventario/Categorias/store/categoryStore'
const categoryStore = useCategoryStore()
</script>

<template>
    <p>
        ¿Estás seguro que deseas eliminar la categoría
        <span class="!font-semibold"> "{{ categoryStore.selectedCategory?.name }}" ? </span>
    </p>
</template>
