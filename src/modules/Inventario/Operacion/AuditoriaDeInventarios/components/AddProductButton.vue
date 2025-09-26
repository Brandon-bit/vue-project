<script setup lang="ts">
import BaseButton from '@/shared/components/BaseButton.vue'
import useInventoryAuditStore from '@inventario/Operacion/AuditoriaDeInventarios/store/useInventoryAuditStore'
import { useModalStore } from '@/shared/stores/modal.store'

const inventoryAuditStore = useInventoryAuditStore()
const setShowModal = () => {
    inventoryAuditStore.setShowAddProductForm(true)
}
</script>
<template>
    <BaseButton
        text="Añadir producto"
        variant="outline"
        @click="setShowModal"
        class-name="w-full mb-0 mt-4 btn-primary"
    />
</template>
