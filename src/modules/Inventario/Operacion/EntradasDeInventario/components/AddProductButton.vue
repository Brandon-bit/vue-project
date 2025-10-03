<script setup lang="ts">
import BaseButton from '@/shared/components/BaseButton.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import useInventoryEntriesStore from '@inventario/Operacion/EntradasDeInventario/store/useInventoryEntriesStore'

const modalStore = useModalStore()
const inventoryEntriesStore = useInventoryEntriesStore()

const openAddProductModal = () => {
    inventoryEntriesStore.setCurrentProductByIndex()
    modalStore.open(inventoryEntriesStore.modalId, {
        type: 'CREATE',
        title: 'Añadir producto'
    })
}
</script>

<template>
    <BaseButton text="Agregar producto" @click="openAddProductModal" icon="add" />
</template>
