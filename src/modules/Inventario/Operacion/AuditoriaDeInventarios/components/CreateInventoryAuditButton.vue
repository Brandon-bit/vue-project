<script setup lang="ts">
import BaseButton from '@/shared/components/BaseButton.vue'
import useInventoryAuditStore from '@inventario/Operacion/AuditoriaDeInventarios/store/useInventoryAuditStore'

const inventoryAuditStore = useInventoryAuditStore()
const setData = () => {
    inventoryAuditStore.setData()
}
</script>
<template>
    <router-link to="/inventario/operacion/crear-auditoria-de-inventario">
        <BaseButton text="Crear auditoría" @click="setData" icon="add" />
    </router-link>
</template>
