<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import SubCategoryModal from '@inventario/ConfiguracionDeInventario/SubCategoria/components/SubCategoryModal.vue'
import { useSubCategory } from '@/modules/Inventario/ConfiguracionDeInventario/SubCategoria/composables/useSubCategory'
import useSubCategoryStore from '@inventario/ConfiguracionDeInventario/SubCategoria/store/subCategoryStore'
import { useSubCategoryActions } from "@/modules/Inventario/ConfiguracionDeInventario/SubCategoria/composables/useSubCategoryActions"

const { getSubCategoryTableColumns } = useSubCategory()
const { getSubCategories } = useSubCategoryActions()

const subCategoryStore = useSubCategoryStore()
const modalStore = useModalStore()

const tablaRef = ref()

const openCreateModal = () => {
    subCategoryStore.setData()
    modalStore.open(subCategoryStore.modalId, { type: 'CREATE', title: 'Crear categoría' })
}
</script>
<template>
    <h2 class="text-center mb-10">Subcategorías</h2>

    <div class="mb-10 text-right">
        <BaseButton text="Nueva subcategoría" @click="openCreateModal" icon="add" />
    </div>

    <BaseTable
        ref="tablaRef"
        :headers="getSubCategoryTableColumns()"
        :fetch-callback="getSubCategories"
    />
    <SubCategoryModal/>
</template>
<style></style>
