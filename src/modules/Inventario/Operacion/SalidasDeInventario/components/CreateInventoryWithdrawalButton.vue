<script setup lang="ts">
import BaseButton from '@/shared/components/BaseButton.vue'
import useInventoryWithdrawalsStore from '@inventario/Operacion/SalidasDeInventario/store/useInventoryWithdrawalsStore'

const inventoryWithdrawalsStore = useInventoryWithdrawalsStore()
const setData = () => {
    inventoryWithdrawalsStore.setData()
}
</script>
<template>
    <router-link to="/inventario/operacion/crear-salida-de-inventario">
        <BaseButton @click="setData" text="Crear salida" icon="add" />
    </router-link>
</template>
