<script setup lang="ts">
import { watch, ref } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { showNotification } from '@/utils/toastNotifications'
import useProductStore from '@inventario/ConfiguracionDeInventario/CrearProducto/store/product.store'

const modalId = 'delete-product-variant'
const productStore = useProductStore()
const modalStore = useModalStore()
const selectedVariant = ref(0)
const onSubmit = async () => {
    await productStore.removeItemVariantsData(selectedVariant.value)
    modalStore.close(modalId)
    showNotification('Variante eliminada correctamente', 'success')
}

const onClose = () => {}

watch(
    () => productStore.selectedVariantIndex,
    (newValue) => {
        selectedVariant.value = newValue
    }
)
</script>
<template>
    <BaseModal :onSubmit="onSubmit" :onClose="onClose" :modalId="modalId" :isSubmitting="false">
        <template v-slot:modalBody>
            <div class="text-center">
                ¿Estás seguro que deseas eliminar la variante {{ selectedVariant + 1 }} ?
            </div>
        </template>
    </BaseModal>
</template>
