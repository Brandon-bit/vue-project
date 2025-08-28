<script setup lang="ts">
import useWarrantyStore from '../store/warranty.store';
const warrantyStore = useWarrantyStore()
</script>

<template>
    <p class="text-center">
        ¿Estás seguro que deseas eliminar la garantía
        <span class="!font-semibold"> "{{ warrantyStore.selectedWarranty.name }}" ? </span>
    </p>
</template>
