<script setup lang="ts">
import BaseButton from '@/shared/components/BaseButton.vue'
import useInventoryAuditStore from '@inventario/Operacion/AuditoriaDeInventarios/store/useInventoryAuditStore'
import { useModalStore } from '@/shared/stores/modal.store'

const inventoryAuditStore = useInventoryAuditStore()
const modalStore = useModalStore()
const openAddProductModal = () => {
    modalStore.open(inventoryAuditStore.modalId, {
        type: 'CREATE',
        title: 'Añadir producto'
    })
}
</script>
<template>
    <BaseButton text="Agregar producto" @click="openAddProductModal" />
</template>
