<script setup lang="ts">
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import BaseSkeletonTable from '@/shared/components/BaseSkeletonTable.vue'
import useProductsStore from '@inventario/ConfiguracionDeInventario/Productos/store/productsStore'
import { useProducts } from '@inventario/ConfiguracionDeInventario/Productos/composables/useProducts'
import { onMounted, ref } from 'vue'
import ProductsModal from '@inventario/ConfiguracionDeInventario/Productos/components/ProductsModal.vue'
import BulkUploadButton from '@inventario/ConfiguracionDeInventario/Productos/components/BulkUploadButton.vue'

const { getProducts, getTableColumns } = useProducts()
const productStore = useProductsStore()
let loading = ref<boolean>(false)

onMounted(async () => {
    loading.value = true
    await getProducts()
    setTimeout(() => {
        loading.value = false
    }, 500)
})
</script>
<template>
    <h2 class="text-center mb-8">Productos</h2>

    <div class="mb-10 flex gap-4 justify-end">
        <BulkUploadButton />
        <router-link to="/inventario/configuracion/crear-producto">
            <BaseButton text="Nuevo producto" icon="add" />
        </router-link>
    </div>
    <BaseSkeletonTable v-if="loading" />
    <BaseTable v-else :data="productStore.products" :headers="getTableColumns()" />
    <ProductsModal />
</template>
