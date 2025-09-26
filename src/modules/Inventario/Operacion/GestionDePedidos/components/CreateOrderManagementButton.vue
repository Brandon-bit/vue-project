<script setup lang="ts">
import BaseButton from '@/shared/components/BaseButton.vue'
import useOrderManagementStore from '@inventario/Operacion/GestionDePedidos/store/useOrderManagementStore'
import { useModalStore } from '@/shared/stores/modal.store'

const modalStore = useModalStore()
const orderManagementStore = useOrderManagementStore()
const openCreateModal = () => {
    orderManagementStore.setData()
    modalStore.open(orderManagementStore.modalId, {
        type: 'CREATE',
        title: 'Crear pedido'
    })
}
</script>
<template>
    <BaseButton text="Crear pedido" @click="openCreateModal" icon="add" />
</template>
