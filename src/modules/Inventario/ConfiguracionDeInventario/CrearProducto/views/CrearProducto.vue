<script setup lang="ts">
import CreateProductForm from '@inventario/ConfiguracionDeInventario/CrearProducto/components/CreateProductForm.vue'
import CreateProductVariantForm from '@inventario/ConfiguracionDeInventario/CrearProducto/components/CreateProductVariantForm.vue'
import DeleteProductVariantModal from '@inventario/ConfiguracionDeInventario/CrearProducto/components/DeleteProductVariantModal.vue'
</script>

<template>
    <h2 class="text-center mb-8">Crear producto</h2>
    <CreateProductForm />
    <CreateProductVariantForm />
    <DeleteProductVariantModal />
</template>

<style scoped>
.loader {
    width: 150px;
    height: 150px;
}
</style>
