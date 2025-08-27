<script setup lang="ts">
import useBrandStore from '../store/brand.store'
const brandStore = useBrandStore()
</script>

<template>
    <p class="text-center">
        ¿Estás seguro que deseas eliminar la categoría
        <span class="!font-semibold"> "{{ brandStore.selectedBrand?.name }}" ? </span>
    </p>
</template>
