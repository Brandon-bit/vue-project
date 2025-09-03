<script setup lang="ts">
// #region Imports
import BaseSkeletonTable from '@/shared/components/BaseSkeletonTable.vue'
import { onMounted, ref } from 'vue'
import { useVariantAttribute } from '@inventario/ConfiguracionDeInventario/AtributosVariantes/composables/useVariantAttribute'
import { useModalStore } from '@/shared/stores/modal.store'
import useVariantAttributeStore from '@inventario/ConfiguracionDeInventario/AtributosVariantes/store/variantAttribute.store'
import BaseTable from '@/shared/components/BaseTable.vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import VariantAttributesModal from '@inventario/ConfiguracionDeInventario/AtributosVariantes/components/VariantAttributesModal.vue'
// #endregion

// #region Data
let loading = ref<boolean>(false)
const { getVariantAttributes, getVariantAttributesTableColumns } = useVariantAttribute()
const modalStore = useModalStore()
const variantAttributeStore = useVariantAttributeStore()
// #endregion

// #region OnMounted
onMounted(async () => {
    // Once the view is rendered, the data is loaded
    loading.value = true
    await getVariantAttributes()
    loading.value = false
})
// #endregion

// #region Methods
const openCreateModal = () => {
    variantAttributeStore.setData()
    modalStore.open(variantAttributeStore.modalId, {
        type: 'CREATE',
        title: 'Agregar Atributo Variante'
    })
}
// #endregion
</script>

<template>
    <h2 class="text-center mb-10">Atributos Variantes</h2>

    <div class="mb-10 text-right">
        <BaseButton text="Nuevo Atributo" @click="openCreateModal()" icon="add" />
    </div>

    <BaseSkeletonTable v-if="loading" />
    <BaseTable
        v-else
        :data="variantAttributeStore.variantAttributes"
        :headers="getVariantAttributesTableColumns()"
    />
    <VariantAttributesModal />
</template>
