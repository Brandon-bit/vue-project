<script setup lang="ts">
import { onMounted, ref } from 'vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import BaseSkeletonTable from '@/shared/components/BaseSkeletonTable.vue'
import useLowStockStore from '@inventario/Stock/StockBajo/store/lowStockStore'
import { useLowStock } from '@/modules/Inventario/Stock/StockBajo/composables/useLowStock'
import LowStockModal from '@inventario/Stock/StockBajo/components/LowStockModal.vue'
import ToggleNotification from '@inventario/Stock/StockBajo/components/ToggleNotification.vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'

const { getLowStock, getTableColumns } = useLowStock()
const lowStockStore = useLowStockStore()
let loading = ref<boolean>(false)

onMounted(async () => {
    loading.value = true
    await getLowStock()
    setTimeout(() => {
        loading.value = false
    }, 500)
})
</script>
<template>
    <BaseTitle 
        title="Stock bajo" 
        subtitle="Gestión de stock bajo"
    />
    <ToggleNotification />
    <BaseSkeletonTable v-if="loading" />
    <BaseTable v-else :data="lowStockStore.lowStock" :headers="getTableColumns()" />
    <LowStockModal />
</template>
<style></style>
