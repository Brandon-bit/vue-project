<script setup lang="ts">
// #region Imports
import BaseTable from '@/shared/components/BaseTable.vue'
import { onMounted, ref } from 'vue'
import { useWarranty } from '@inventario/ConfiguracionDeInventario/Garantias/composables/useWarranty'
import { useModalStore } from '@/shared/stores/modal.store'
import BaseButton from '@/shared/components/BaseButton.vue'
import useWarrantyStore from '@inventario/ConfiguracionDeInventario/Garantias/store/warranty.store'
import BaseSkeletonTable from '@/shared/components/BaseSkeletonTable.vue'
import WarrantyModal from '@inventario/ConfiguracionDeInventario/Garantias/components/WarrantyModal.vue'
// #endregion

// #region Data
let loading = ref<boolean>(false)
const { getWarranties, getWarrantiesTableColumns } = useWarranty()
const modalStore = useModalStore()
const warrantyStore = useWarrantyStore()

// #endregion

// #region OnMounted
onMounted(async () => {
    // Once the view is rendered, the data is loaded
    loading.value = true
    await getWarranties()
    loading.value = false
})
// #endregion

// #region Methods
const openCreateModal = () => {
    warrantyStore.setData()
    modalStore.open(warrantyStore.modalId, { type: 'CREATE', title: 'Crear Garantía' })
}
// #endregion
</script>

<template>
    <h2 class="text-center mb-10">Garantías</h2>
    <div class="mb-10 text-right">
        <BaseButton text="Nueva garantía" @click="openCreateModal()" icon="add" />
    </div>

    <BaseSkeletonTable v-if="loading" />
    <BaseTable v-else :data="warrantyStore.warranties" :headers="getWarrantiesTableColumns()" />
    <WarrantyModal />
</template>
