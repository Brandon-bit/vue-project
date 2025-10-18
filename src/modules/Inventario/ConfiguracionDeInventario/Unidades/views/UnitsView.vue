<script setup lang="ts">
// #region Imports
import { ref } from 'vue'
import useUnit from '../composables/useUnit'
import { useModalStore } from '@/shared/stores/modal.store'
import useUnitStore from '../store/unit.store'
import BaseTable from '@/shared/components/BaseTable.vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import UnitsModal from '@inventario/ConfiguracionDeInventario/Unidades/components/UnitsModal.vue'
import { useUnitActions } from '@inventario/ConfiguracionDeInventario/Unidades/composables/useUnitActions'
import BaseTitle from '@/shared/components/BaseTitle.vue'
// #endregion

// #region Data
const tablaRef = ref()

const { getUnitsTableColumns } = useUnit()
const { getUnits } = useUnitActions()

const unitStore = useUnitStore()
const modalStore = useModalStore()

const openCreateModal = () => {
    unitStore.setData()
    modalStore.open(unitStore.modalId, { type: 'CREATE', title: 'Agregar Unidad' })
}
// #endregion
</script>

<template>
    <BaseTitle 
        title="Unidades" 
        subtitle="Gestión de unidades"
    />

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
