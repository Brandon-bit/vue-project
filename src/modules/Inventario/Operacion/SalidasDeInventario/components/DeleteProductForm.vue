<script setup lang="ts">
import useInventoryWithdrawalsStore from '@inventario/Operacion/SalidasDeInventario/store/useInventoryWithdrawalsStore'

const inventoryWithdrawalsStore = useInventoryWithdrawalsStore()
</script>
<template>
    ¿Estás seguro que deseas eliminar el producto
    <span class="!font-semibold">{{
        inventoryWithdrawalsStore.addedProducts?.[inventoryWithdrawalsStore.indexProduct]
            ?.productName
    }}</span>
    ?
</template>
