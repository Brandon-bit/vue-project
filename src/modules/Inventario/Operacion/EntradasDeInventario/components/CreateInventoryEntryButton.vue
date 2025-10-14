<script setup lang="ts">
import BaseButton from '@/shared/components/BaseButton.vue'
import useInventoryEntriesStore from '@inventario/Operacion/EntradasDeInventario/store/useInventoryEntriesStore'

const inventoryEntriesStore = useInventoryEntriesStore()
const setData = () => {
    inventoryEntriesStore.setData()
}
</script>
<template>
    <router-link to="/inventario/operacion/crear-entrada-de-inventario">
        <BaseButton @click="setData" text="Crear entrada" icon="add" />
    </router-link>
</template>
