<script setup lang="ts">
import { computed } from 'vue'
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

const canAddProducts = computed((): boolean => {
    const stateId = inventoryEntriesStore.selectedInventoryEntry.stateId
    return stateId === 0 || stateId === 3 // Solo creación y pendiente
})
</script>

<template>
    <BaseButton
        text="Agregar producto"
        @click="openAddProductModal"
        icon="add"
        :disabled="!canAddProducts"
    />
</template>
