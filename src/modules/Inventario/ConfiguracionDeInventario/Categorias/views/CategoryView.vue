<script setup lang="ts">
import { onMounted, ref } from 'vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import BaseSkeletonTable from '@/shared/components/BaseSkeletonTable.vue'
import CategoryModal from '@inventario/ConfiguracionDeInventario/Categorias/components/CategoryModal.vue'
import { useCategory } from '@inventario/ConfiguracionDeInventario/Categorias/composables/useCategory'
import useCategoryStore from '@inventario/ConfiguracionDeInventario/Categorias/store/category.store'

const { getCategories, getTableColumns } = useCategory()
const categoryStore = useCategoryStore()
const modalStore = useModalStore()
let loading = ref<boolean>(false)

onMounted(async () => {
    loading.value = true
    await getCategories()
    setTimeout(() => {
        loading.value = false
    }, 500)
})

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

    <BaseSkeletonTable v-if="loading" />
    <BaseTable v-else :data="categoryStore.categories" :headers="getTableColumns()" />
    <CategoryModal />
</template>
<style></style>
