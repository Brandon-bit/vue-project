<script setup lang="ts">
// #region Imports
import { ref } from 'vue'
import { useVariantAttribute } from '@inventario/ConfiguracionDeInventario/AtributosVariantes/composables/useVariantAttribute'
import { useModalStore } from '@/shared/stores/modal.store'
import useVariantAttributeStore from '@/modules/Inventario/ConfiguracionDeInventario/AtributosVariantes/store/variantAttributeStore'
import { useVariantAttributeActions } from '@inventario/ConfiguracionDeInventario/AtributosVariantes/composables/useVariantAttributeActions'
import BaseTable from '@/shared/components/BaseTable.vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import VariantAttributesModal from '@inventario/ConfiguracionDeInventario/AtributosVariantes/components/VariantAttributesModal.vue'
// #endregion

// #region Data
const { getVariantAttributesTableColumns } = useVariantAttribute()
const { getVariantAttributes } = useVariantAttributeActions()
const modalStore = useModalStore()
const variantAttributeStore = useVariantAttributeStore()

const tablaRef = ref()
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
        <BaseButton text="Nuevo atributo variante" @click="openCreateModal()" icon="add" />
    </div>

    <BaseTable
        ref="tablaRef"
        :headers="getVariantAttributesTableColumns()"
        :fetch-callback="getVariantAttributes"
    />
    <VariantAttributesModal :onRefresh="tablaRef?.fetchData"/>
</template>
