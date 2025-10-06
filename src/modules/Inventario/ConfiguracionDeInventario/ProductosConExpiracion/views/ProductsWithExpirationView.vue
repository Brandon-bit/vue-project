<script setup lang="ts">
import BaseTable from '@/shared/components/BaseTable.vue'
import { ref } from 'vue'
import { useExpiration } from '@inventario/ConfiguracionDeInventario/ProductosConExpiracion/composables/useExpiration'
import { useExpirationActions } from '@inventario/ConfiguracionDeInventario/ProductosConExpiracion/composables/useExpirationAction'
import ExpirationModal from '@inventario/ConfiguracionDeInventario/ProductosConExpiracion/components/ExpirationModal.vue'

const { getTableColumns } = useExpiration()
const { getProductsWithExpiration } = useExpirationActions()

const tablaRef = ref()

</script>
<template>
    <h2 class="text-center mb-10 pb-10">Productos con expiración</h2>

    <BaseTable 
        ref="tablaRef"
        :headers="getTableColumns()" 
        :fetch-callback="getProductsWithExpiration"
    />

    <ExpirationModal :onRefresh="tablaRef?.fetchData"/>
</template>
<style></style>
