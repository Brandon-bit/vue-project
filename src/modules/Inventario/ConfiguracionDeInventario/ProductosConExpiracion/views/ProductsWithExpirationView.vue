<script setup lang="ts">
import BaseTable from '@/shared/components/BaseTable.vue'
import BaseSkeletonTable from '@/shared/components/BaseSkeletonTable.vue'
import useExpirationStore from '@inventario/ConfiguracionDeInventario/ProductosConExpiracion/store/expirationStore'
import { onMounted, ref } from 'vue'
import { useExpiration } from '@inventario/ConfiguracionDeInventario/ProductosConExpiracion/composables/useExpiration'
import ExpirationModal from '@inventario/ConfiguracionDeInventario/ProductosConExpiracion/components/ExpirationModal.vue'

const { getProductsWithExpiration, getTableColumns } = useExpiration()
const expirationStore = useExpirationStore()
let loading = ref<boolean>(false)

onMounted(async () => {
    loading.value = true
    await getProductsWithExpiration()
    setTimeout(() => {
        loading.value = false
    }, 500)
})
</script>
<template>
    <h2 class="text-center mb-10 pb-10">Productos con expiración</h2>
    <BaseSkeletonTable v-if="loading" />
    <BaseTable v-else :data="expirationStore.productsExpiration" :headers="getTableColumns()" />
    <ExpirationModal />
</template>
<style></style>
