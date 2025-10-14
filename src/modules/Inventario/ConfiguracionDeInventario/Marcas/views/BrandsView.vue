<script setup lang="ts">
import { ref } from 'vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import useBrand from '@inventario/ConfiguracionDeInventario/Marcas/composables/useBrand'
import { useModalStore } from '@/shared/stores/modal.store'
import BaseButton from '@/shared/components/BaseButton.vue'
import useBrandStore from '@/modules/Inventario/ConfiguracionDeInventario/Marcas/store/brandStore'
import BrandsModal from '@inventario/ConfiguracionDeInventario/Marcas/components/BrandsModal.vue'
import { useBrandActions } from '@inventario/ConfiguracionDeInventario/Marcas/composables/useBrandActions'

const { getBrandsTableColumns } = useBrand()
const { getBrands } = useBrandActions()

const modalStore = useModalStore()
const brandStore = useBrandStore()

const tablaRef = ref()

const openCreateModal = () => {
    brandStore.setData()
    modalStore.open(brandStore.modalId, { type: 'CREATE', title: 'Agregar marca' })
}
</script>

<template>
    <h2 class="text-center mb-10">Marcas</h2>

    <div class="mb-10 text-right">
        <BaseButton text="Nueva marca" @click="openCreateModal()" icon="add" />
    </div>

    <BaseTable
        ref="tablaRef"
        :headers="getBrandsTableColumns()"
        :fetch-callback="getBrands"
    />
    <BrandsModal :onRefresh="tablaRef?.fetchData" />
</template>
