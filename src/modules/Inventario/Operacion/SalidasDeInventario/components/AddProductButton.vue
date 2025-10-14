<script setup lang="ts">
import BaseButton from '@/shared/components/BaseButton.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import useInventoryWithdrawalsStore from '@inventario/Operacion/SalidasDeInventario/store/useInventoryWithdrawalsStore'

const modalStore = useModalStore()
const inventoryWithdrawalsStore = useInventoryWithdrawalsStore()

const openAddProductModal = () => {
    inventoryWithdrawalsStore.setCurrentProductByIndex()
    modalStore.open(inventoryWithdrawalsStore.modalId, {
        type: 'CREATE',
        title: 'Añadir producto'
    })
}
</script>

<template>
    <BaseButton text="Agregar producto" @click="openAddProductModal" icon="add" />
</template>
