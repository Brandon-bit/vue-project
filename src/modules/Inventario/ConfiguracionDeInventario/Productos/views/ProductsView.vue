<script setup lang="ts">
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import { useProducts } from '@inventario/ConfiguracionDeInventario/Productos/composables/useProducts'
import { useProductsActions } from '@inventario/ConfiguracionDeInventario/Productos/composables/useProductsActions'
import { ref } from 'vue'
import ProductsModal from '@inventario/ConfiguracionDeInventario/Productos/components/ProductsModal.vue'
import BulkUploadButton from '@inventario/ConfiguracionDeInventario/Productos/components/BulkUploadButton.vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'

const { getTableColumns } = useProducts()
const { getProducts } = useProductsActions()

const tablaRef = ref()
</script>
<template>
    <BaseTitle 
        title="Productos" 
        subtitle="Gestión de productos"
    />
    <div class="mb-10 flex gap-4 justify-end">
        <BulkUploadButton />
        <router-link to="/inventario/configuracion/crear-producto">
            <BaseButton text="Nuevo producto" icon="add" />
        </router-link>
    </div>
    <BaseTable
        ref="tablaRef"
        :headers="getTableColumns()" 
        :fetch-callback="getProducts"
    />
    <ProductsModal :onRefresh="tablaRef?.fetchData"/>
</template>
