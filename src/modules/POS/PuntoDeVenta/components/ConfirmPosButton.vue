<script setup lang="ts">
import { useModalStore } from '@/shared/stores/modal.store'
import usePosStore from '@pos/PuntoDeVenta/store/posStore'
import BaseButton from '@/shared/components/BaseButton.vue'

const modalStore = useModalStore()
const posStore = usePosStore()

const openModal = () => {
    modalStore.open(posStore.modalId, {
        type: 'CREATE',
        title: 'Confirmar compra'
    })
}

</script>

<template>
    <BaseButton
        :disabled="!posStore.selectedProducts.length"
        text="Confirmar compra"
        className="w-full mb-2"
        @click="openModal"
    />
</template>
