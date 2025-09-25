<script setup lang="ts">
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import BaseSkeletonTable from '@/shared/components/BaseSkeletonTable.vue'
import useadminStockStore from '@inventario/Stock/AdministrarStock/store/adminStockStore'
import { useAdminStockTableHeaders } from '@inventario/Stock/AdministrarStock/composables/useAdminStockTableHeader'
import { onMounted, ref } from 'vue'
import AdminStocksModal from '@inventario/ConfiguracionDeInventario/Productos/components/ProductsModal.vue'
import BulkUploadButton from '@inventario/ConfiguracionDeInventario/Productos/components/BulkUploadButton.vue'

const { getadminStock, getTableColumns } = useAdminStockTableHeaders()
const adminStockStore = useadminStockStore()
let loading = ref<boolean>(false)

onMounted(async () => {
    loading.value = true
    await getadminStock()
    setTimeout(() => {
        loading.value = false
    }, 500)
})
</script>
<template>
    <h2 class="text-center mb-8">Administrar Stock</h2>

    <div class="mb-10 flex gap-4 justify-end">
        <BulkUploadButton />
        <router-link to="">
            <BaseButton text="Agregar Nuevo" icon="add" />
        </router-link>
    </div>
    <BaseSkeletonTable v-if="loading" />
    <!-- <BaseTable v-else :data="adminStockStore.adminStock" :headers="getTableColumns()" /> -->
    <AdminStockModal />
</template>
