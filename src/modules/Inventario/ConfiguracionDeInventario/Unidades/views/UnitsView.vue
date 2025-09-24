<script setup lang="ts">
// #region Imports
import { ref } from 'vue'
import { useUnit } from '../composables/useUnit'
import { useModalStore } from '@/shared/stores/modal.store'
import useUnitStore from '../store/unit.store'
import BaseTable from '@/shared/components/BaseTable.vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import UnitsModal from '@inventario/ConfiguracionDeInventario/Unidades/components/UnitsModal.vue'
// #endregion

// #region Data
const tablaRef = ref()

const { getUnits, getUnitsTableColumns } = useUnit()
const unitStore = useUnitStore()
const modalStore = useModalStore()

const openCreateModal = () => {
    unitStore.setData()
    modalStore.open(unitStore.modalId, { type: 'CREATE', title: 'Agregar Unidad' })
}
// #endregion
</script>

<template>
    <h2 class="text-center mb-10">Unidades</h2>

    <div class="mb-10 text-right">
        <BaseButton text="Nueva unidad" @click="openCreateModal()" icon="add" />
    </div>

    <BaseTable
        ref="tablaRef"
        :headers="getUnitsTableColumns()"
        :fetch-callback="getUnits"
    />
    <UnitsModal :onRefresh="tablaRef?.fetchData"/>
</template>
