<script setup lang="ts">
import useBrandStore from '../store/brandStore'
const brandStore = useBrandStore()
</script>

<template>
    <p class="text-center">
        ¿Estás seguro que deseas eliminar la marca
        <span class="!font-semibold"> "{{ brandStore.selectedBrand?.name }}" ? </span>
    </p>
</template>
