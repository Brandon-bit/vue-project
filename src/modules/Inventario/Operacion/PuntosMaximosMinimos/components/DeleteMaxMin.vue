<script setup lang="ts">
import useMaxMinStore from '@inventario/Operacion/PuntosMaximosMinimos/store/maxMinStore'

const maxMinStore = useMaxMinStore()
</script>

<template>
    <p>
        ¿Estás seguro que deseas eliminar los puntos max/min del producto
        <span class="!font-semibold"> "{{ maxMinStore.selectedProduct?.sku }}" ? </span>
    </p>
</template>
