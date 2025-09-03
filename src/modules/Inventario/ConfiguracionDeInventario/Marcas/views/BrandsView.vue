<script setup lang="ts">
// #region Imports
import BaseTable from '@/shared/components/BaseTable.vue'
import { onMounted, ref } from 'vue'
import { useBrand } from '@inventario/ConfiguracionDeInventario/Marcas/composables/useBrand'
import { useModalStore } from '@/shared/stores/modal.store'
import BaseButton from '@/shared/components/BaseButton.vue'
import useBrandStore from '@inventario/ConfiguracionDeInventario/Marcas/store/brand.store'
import BaseSkeletonTable from '@/shared/components/BaseSkeletonTable.vue'
import BrandsModal from '@inventario/ConfiguracionDeInventario/Marcas/components/BrandsModal.vue'
// #endregion

// #region Data
let loading = ref<boolean>(false)
const { getBrands, getBrandsTableColumns } = useBrand()
const modalStore = useModalStore()
const brandStore = useBrandStore()
// #endregion

// #region OnMounted
onMounted(async () => {
    // Once the view is rendered, the data is loaded
    loading.value = true
    await getBrands()
    loading.value = false
})
// #endregion

// #region Methods
const openCreateModal = () => {
    brandStore.setData()
    modalStore.open(brandStore.modalId, { type: 'CREATE', title: 'Crear categoría' })
}
// #endregion
</script>

<template>
    <h2 class="text-center mb-10">Marcas</h2>

    <div class="mb-10 text-right">
        <BaseButton text="Nueva marca" @click="openCreateModal()" icon="add" />
    </div>

    <BaseSkeletonTable v-if="loading" />
    <BaseTable v-else :data="brandStore.brands" :headers="getBrandsTableColumns()" />
    <BrandsModal />
</template>
