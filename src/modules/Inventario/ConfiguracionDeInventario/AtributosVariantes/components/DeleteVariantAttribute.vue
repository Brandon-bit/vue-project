<script setup lang="ts">
import useVariantAttributeStore from '../store/variantAttribute.store';
const variantAttributeStore = useVariantAttributeStore()
</script>

<template>
    <p class="text-center">
        ¿Estás seguro que deseas eliminar la categoría
        <span class="!font-semibold"> "{{ variantAttributeStore.selectedVariantAttribute.name }}" ? </span>
    </p>
</template>
