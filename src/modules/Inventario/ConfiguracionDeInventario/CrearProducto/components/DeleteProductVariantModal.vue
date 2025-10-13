<script setup lang="ts">
import { watch, ref } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { showNotification } from '@/utils/toastNotifications'
import useCreateProductStore from '@/modules/Inventario/ConfiguracionDeInventario/CrearProducto/store/createProductStore'

const modalId = 'delete-product-variant'
const createProductStore = useCreateProductStore()
const modalStore = useModalStore()
const selectedVariant = ref(0)

const onSubmit = async () => {
    await createProductStore.removeItemVariantsData(selectedVariant.value)
    modalStore.close(modalId)
    showNotification('Variante eliminada correctamente', 'success')
}

const onClose = () => {}

watch(
    () => createProductStore.selectedVariantIndex,
    (newValue) => {
        selectedVariant.value = newValue
    }
)
</script>
<template>
    <BaseModal :onSubmit="onSubmit" :onClose="onClose" :modalId="modalId" :isSubmitting="false">
        <template v-slot:modalBody>
            <p class="text-center">
                ¿Estás seguro que deseas eliminar la variante <span class="!font-semibold">"{{ createProductStore.currentVariantInfo.variantValue }}"</span> ?
            </p>
        </template>
    </BaseModal>
</template>
