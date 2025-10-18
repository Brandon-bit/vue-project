<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import CreateProductForm from '@inventario/ConfiguracionDeInventario/CrearProducto/components/CreateProductForm.vue'
import CreateProductVariantForm from '@inventario/ConfiguracionDeInventario/CrearProducto/components/CreateProductVariantForm.vue'
import DeleteProductVariantModal from '@inventario/ConfiguracionDeInventario/CrearProducto/components/DeleteProductVariantModal.vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'

const route = useRoute()

const isEditMode = computed(() => route.name === 'EditarProducto')
const pageTitle = computed(() => (isEditMode.value ? 'Editar producto' : 'Crear producto'))
</script>

<template>
    <div class="flex items-center justify-center">
        <BaseTitle 
            :title="pageTitle" 
        />
    </div>

    <CreateProductForm />
    <CreateProductVariantForm />
    <DeleteProductVariantModal />
</template>
