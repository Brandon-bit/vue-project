<script setup lang="ts">
import useCategoryStore from '../store/category.store'
const categoryStore = useCategoryStore()
</script>

<template>
    <p>
        ¿Estás seguro que deseas eliminar la categoría
        <span class="!font-semibold"> "{{ categoryStore.selectedCategory?.name }}" ? </span>
    </p>
</template>
