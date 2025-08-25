<script setup lang="ts">
import CreateProductForm from '@inventario/ConfiguracionDeInventario/Productos/components/CreateProductForm.vue'
import CreateProductVariantForm from '@inventario/ConfiguracionDeInventario/Productos/components/CreateProductVariantForm.vue'
import DeleteProductVariantModal from '@inventario/ConfiguracionDeInventario/Productos/components/DeleteProductVariantModal.vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'


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
