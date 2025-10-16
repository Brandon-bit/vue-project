<script setup lang="ts">
import useProductCatalogStore from '@/modules/Compras/CatalogoDeProductos/store/productCatalogStore'

const productCatalogStore = useProductCatalogStore()
</script>

<template>
    <p>
        ¿Estás seguro que deseas eliminar el producto
        <span class="!font-semibold"> "{{ productCatalogStore.selectedProduct?.name }}" </span>
        con código
        <span class="!font-semibold"> "{{ productCatalogStore.selectedProduct?.code }}" </span>
        del catálogo?
    </p>
    <p class="text-sm text-error mt-2">
        Esta acción no se puede deshacer. El producto ya no estará disponible para solicitudes de compra.
    </p>
</template>
