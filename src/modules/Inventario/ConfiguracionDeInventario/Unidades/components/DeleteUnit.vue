<script setup lang="ts">
import useUnitStore from '../store/unit.store';
const unitStore = useUnitStore()
</script>

<template>
    <p class="text-center">
        ¿Estás seguro que deseas eliminar la categoría
        <span class="!font-semibold"> "{{ unitStore.selectedUnit.name }}" ? </span>
    </p>
</template>
