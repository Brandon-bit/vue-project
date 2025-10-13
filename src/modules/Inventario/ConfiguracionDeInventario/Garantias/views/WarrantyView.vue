<script setup lang="ts">

import BaseTable from '@/shared/components/BaseTable.vue'
import { ref } from 'vue'
import { useWarrantyTableHeaders } from '@inventario/ConfiguracionDeInventario/Garantias/composables/useWarrantyTableHeaders'
import { useWarrantyActions } from '@inventario/ConfiguracionDeInventario/Garantias/composables/useWarrantyActions'
import { useModalStore } from '@/shared/stores/modal.store'
import BaseButton from '@/shared/components/BaseButton.vue'
import useWarrantyStore from '@/modules/Inventario/ConfiguracionDeInventario/Garantias/store/warrantyStore'
import WarrantyModal from '@inventario/ConfiguracionDeInventario/Garantias/components/WarrantyModal.vue'

const warrantyStore = useWarrantyStore()
const modalStore = useModalStore()
const { getWarranties } = useWarrantyActions()

const tablaRef = ref()

const openCreateModal = () => {
    warrantyStore.setData()
    modalStore.open(warrantyStore.modalId, { type: 'CREATE', title: 'Crear Garantía' })
}
</script>

<template>
    <h2 class="text-center mb-10">Garantías</h2>
    <div class="mb-10 text-right">
        <BaseButton text="Nueva garantía" @click="openCreateModal()" icon="add" />
    </div>

    <BaseTable
        ref="tablaRef"
        :headers="useWarrantyTableHeaders()"
        :fetch-callback="getWarranties"
    />
    <WarrantyModal :onRefresh="tablaRef?.fetchData"/>
</template>
