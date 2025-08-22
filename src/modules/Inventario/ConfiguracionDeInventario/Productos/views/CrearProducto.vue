<script setup lang="ts">
import CreateProductForm from '@inventario/ConfiguracionDeInventario/Productos/components/CreateProductForm.vue'
import CreateProductVariantForm from '@inventario/ConfiguracionDeInventario/Productos/components/CreateProductVariantForm.vue'
import DeleteProductVariantModal from '@inventario/ConfiguracionDeInventario/Productos/components/DeleteProductVariantModal.vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import lottie from 'lottie-web'
const loadContainer = ref(null)
let animationInstance = null

onMounted(() => {
    if (loadContainer.value) {
        animationInstance = lottie.loadAnimation({
            container: loadContainer.value,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: '/icono.json' // importante: usa ruta absoluta o asegúrate de que esté en 'public'
        })
    }
})
onBeforeUnmount(() => {
    if (animationInstance) {
        animationInstance.destroy()
    }
})
</script>

<template>
    <div ref="loadContainer" class="loader"></div>
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
