<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import CreateProductForm from '@inventario/ConfiguracionDeInventario/CrearProducto/components/CreateProductForm.vue'
import CreateProductVariantForm from '@inventario/ConfiguracionDeInventario/CrearProducto/components/CreateProductVariantForm.vue'
import DeleteProductVariantModal from '@inventario/ConfiguracionDeInventario/CrearProducto/components/DeleteProductVariantModal.vue'

const route = useRoute()

const isEditMode = computed(() => route.name === 'EditarProducto')
const pageTitle = computed(() => (isEditMode.value ? 'Editar producto' : 'Crear producto'))
</script>

<template>
    <h2 class="text-center mb-8">{{ pageTitle }}</h2>
    <CreateProductForm />
    <CreateProductVariantForm />
    <DeleteProductVariantModal />
</template>
