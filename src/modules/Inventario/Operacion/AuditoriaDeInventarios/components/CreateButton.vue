<script setup lang="ts">
import BaseButton from '@/shared/components/BaseButton.vue'
import useInventoryAuditStore from '@inventario/Operacion/AuditoriaDeInventarios/store/useInventoryAuditStore'
import { useModalStore } from '@/shared/stores/modal.store'

const modalStore = useModalStore()
const inventoryAuditStore = useInventoryAuditStore()
const openCreateModal = () => {
    inventoryAuditStore.setData()
    modalStore.open(inventoryAuditStore.modalId, { type: 'CREATE', title: 'Crear auditoría de inventario' })
}
</script>
<template>
    <BaseButton text="Crear auditoría de inventario" @click="openCreateModal" icon="add" />
</template>
