<script setup lang="ts">
import BaseButton from '@/shared/components/BaseButton.vue'
import useMaxMinStore from '@inventario/Operacion/PuntosMaximosMinimos/store/maxMinStore'
import { useModalStore } from '@/shared/stores/modal.store'

const modalStore = useModalStore()
const useMaxMin = useMaxMinStore()
const openCreateModal = () => {
    useMaxMin.setData()
    modalStore.open(useMaxMin.modalId, { type: 'CREATE', title: 'Crear puntos min/max' })
}
</script>
<template>
    <BaseButton text="Crear puntos min/max" @click="openCreateModal" icon="add" />
</template>
