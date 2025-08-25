<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue';
import { watch } from 'vue'
import useBrandStore from '../store/brand.store';
import { useModalStore } from '@/shared/stores/modal.store';
import { useBrand } from '../composables/useBrand'

const brandStore = useBrandStore()
const modalStore = useModalStore()

const { BRAND_MODAL_IDS } = useBrand()

// Check if the "editingBrandId" has changed and if it has changed show the modal to edit the selected brand
// watch(() => brandStore.deletingBrandId, (newValue) => {
//     if(newValue == 0) return    
//     modalStore.open(modalId, { type: 'DELETE', title: 'Eliminar Marca' })
// })  

const modalId = 'delete-brand-modal'


const onSubmit = async () => {
  try {
    const selectedBrand = brandStore.brands.find(b => b.id == brandStore.deletingBrandId)
    if(selectedBrand == undefined) return
    const index = brandStore.brands.indexOf(selectedBrand)
    await brandStore.removeItemFromBrands(index)
    modalStore.close(modalId)

    // TODO: mostrar alerta y cerrar modal
    // nota: actualmente refresca la pagina en lugar de solo agregar el objeto al listado

  } catch (error) {}
}

const onClose = () => {
    console.log(brandStore.currentBrand)
    //brandStore.deletingBrandId = 0
}

</script>

<template>
    <BaseModal :onSubmit="onSubmit" :modalId="BRAND_MODAL_IDS.DELETE" :isSubmitting="false" :onClose="onClose">
        <template v-slot:modalBody>
            <div>
                <p class="text-center">¿Deseas eliminar esta marca?</p>
            </div>
        </template>
    </BaseModal>
</template>