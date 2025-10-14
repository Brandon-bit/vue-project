<script setup lang="ts">
import useInventoryEntriesStore from '@inventario/Operacion/EntradasDeInventario/store/useInventoryEntriesStore'

const inventoryEntriesStore = useInventoryEntriesStore()
</script>
<template>
    ¿Estás seguro que deseas eliminar el producto
    <span class="!font-semibold">{{
        inventoryEntriesStore.addedProducts?.[inventoryEntriesStore.indexProduct]?.productName
    }}</span>
    ?
</template>
