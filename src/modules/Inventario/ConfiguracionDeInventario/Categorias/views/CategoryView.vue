<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import CategoryModal from '@inventario/ConfiguracionDeInventario/Categorias/components/CategoryModal.vue'
import useCategory from '@/modules/Inventario/ConfiguracionDeInventario/Categorias/composables/useCategory'
import useCategoryStore from '@inventario/ConfiguracionDeInventario/Categorias/store/categoryStore'
import { useCategoryActions } from "@/modules/Inventario/ConfiguracionDeInventario/Categorias/composables/useCategoryActions"
import BaseTitle from '@/shared/components/BaseTitle.vue'

const { getTableColumns } = useCategory()
const { getCategories } = useCategoryActions()

const categoryStore = useCategoryStore()
const modalStore = useModalStore()

const tablaRef = ref()

const openCreateModal = () => {
    categoryStore.setData()
    modalStore.open(categoryStore.modalId, { type: 'CREATE', title: 'Crear categoría' })
}
</script>
<template>
    <BaseTitle 
        title="Categorías" 
        subtitle="Gestión de categorías"
    />

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
