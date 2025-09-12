<script setup lang="ts">
import useProductsStore from '@inventario/ConfiguracionDeInventario/Productos/store/productsStore'
const productsStore = useProductsStore()
</script>

<template>
    <p>
        ¿Estás seguro que deseas eliminar el producto
        <span class="!font-semibold"> "{{ productsStore.currentProduct?.name }}" ? </span>
    </p>
</template>
