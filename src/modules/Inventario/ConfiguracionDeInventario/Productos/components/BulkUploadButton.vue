<script setup lang="ts">
import BaseButton from '@/shared/components/BaseButton.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import useProductsStore from '@inventario/ConfiguracionDeInventario/Productos/store/productsStore'

const modalStore = useModalStore()
const productsStore = useProductsStore()

const openModal = () => {
    modalStore.open(productsStore.modalId, {
        type: 'LOAD',
        title: 'Carga masiva'
    })
}
</script>

<template>
    <BaseButton text="Carga masiva" variant="accent" icon="upload_file" @click="openModal" />
</template>
