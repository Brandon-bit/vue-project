<script setup lang="ts">
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import BaseSkeletonTable from '@/shared/components/BaseSkeletonTable.vue'
import useadminStockStore from '@inventario/Stock/AdministrarStock/store/adminStockStore'
import { useAdminStock } from '@/modules/Inventario/Stock/AdministrarStock/composables/useAdminStock'
import { ref } from 'vue'

const { getTableColumns, getStocks } = useAdminStock()

// const adminStockStore = useadminStockStore()

const tablaRef = ref()

</script>

<template>
    <h2 class="text-center mb-10">Administrar Stock</h2>

    <BaseTable
        ref="tablaRef"
        :headers="getTableColumns()"
        :fetch-callback="getStocks"
    />
    <CategoryModal :onRefresh="tablaRef?.fetchData"/>
</template>
