<script setup lang="ts">
import BaseTable from '@/shared/components/BaseTable.vue'
import { ref } from 'vue'
import { useExpiration } from '@inventario/ConfiguracionDeInventario/ProductosConExpiracion/composables/useExpiration'
import { useExpirationActions } from '@inventario/ConfiguracionDeInventario/ProductosConExpiracion/composables/useExpirationAction'
import ExpirationModal from '@inventario/ConfiguracionDeInventario/ProductosConExpiracion/components/ExpirationModal.vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'

const { getTableColumns } = useExpiration()
const { getProductsWithExpiration } = useExpirationActions()

const tablaRef = ref()

</script>
<template>
    <BaseTitle 
        title="Productos con expiración" 
        subtitle="Gestión de productos con expiración"
    />

    <BaseTable 
        ref="tablaRef"
        :headers="getTableColumns()" 
        :fetch-callback="getProductsWithExpiration"
    />

    <ExpirationModal :onRefresh="tablaRef?.fetchData"/>
</template>
<style></style>
