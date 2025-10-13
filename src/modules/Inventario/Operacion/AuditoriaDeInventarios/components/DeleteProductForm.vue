<script setup lang="ts">
import useInventoryAuditStore from '@inventario/Operacion/AuditoriaDeInventarios/store/useInventoryAuditStore'

const inventoryAuditStore = useInventoryAuditStore()
</script>
<template>
    ¿Estás seguro que deseas eliminar el producto
    <span class="!font-semibold">{{
        inventoryAuditStore.addedProducts?.[inventoryAuditStore.indexProduct]
            ?.productName
    }}</span>
    ?
</template>
