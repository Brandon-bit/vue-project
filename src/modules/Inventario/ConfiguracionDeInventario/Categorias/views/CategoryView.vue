<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import CategoryModal from '@inventario/ConfiguracionDeInventario/Categorias/components/CategoryModal.vue'
import { useCategory } from '@inventario/ConfiguracionDeInventario/Categorias/composables/useCategory'
import useCategoryStore from '@/modules/Inventario/ConfiguracionDeInventario/Categorias/store/categoryStore'

const { getTableColumns, getCategories } = useCategory()

const categoryStore = useCategoryStore()
const modalStore = useModalStore()

const tablaRef = ref()

const openCreateModal = () => {
    categoryStore.setData()
    modalStore.open(categoryStore.modalId, { type: 'CREATE', title: 'Crear categoría' })
}
</script>
<template>
    <h2 class="text-center mb-10">Categorías</h2>

    <div class="mb-10 text-right">
        <BaseButton text="Nueva categoría" @click="openCreateModal" icon="add" />
    </div>

    <BaseTable
        ref="tablaRef"
        :headers="getTableColumns()"
        :fetch-callback="getCategories"
    />
    <CategoryModal :onRefresh="tablaRef?.fetchData"/>
</template>
<style></style>
