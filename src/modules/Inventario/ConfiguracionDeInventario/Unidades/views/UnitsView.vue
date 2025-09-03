<script setup lang="ts">
// #region Imports
import BaseSkeletonTable from '@/shared/components/BaseSkeletonTable.vue'
import { onMounted, ref } from 'vue'
import { useUnit } from '../composables/useUnit'
import { useModalStore } from '@/shared/stores/modal.store'
import useUnitStore from '../store/unit.store'
import BaseTable from '@/shared/components/BaseTable.vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import UnitsModal from '@inventario/ConfiguracionDeInventario/Unidades/components/UnitsModal.vue'
// #endregion

// #region Data
const { getUnits, getUnitsTableColumns } = useUnit()
const unitStore = useUnitStore()
const modalStore = useModalStore()
let loading = ref<boolean>(false)

// #endregion

// #region OnMounted
onMounted(async () => {
    // Once the view is rendered, the data is loaded
    loading.value = true
    await getUnits()
    loading.value = false
})
// #endregion

// #region Methods
const openCreateModal = () => {
    unitStore.setData()
    modalStore.open(unitStore.modalId, { type: 'CREATE', title: 'Agregar Unidad' })
}
// #endregion
</script>

<template>
    <h2 class="text-center mb-10">Unidades</h2>

    <div class="mb-10 text-right">
        <BaseButton text="Nueva Unidad" @click="openCreateModal()" icon="add" />
    </div>

    <BaseSkeletonTable v-if="loading" />
    <BaseTable v-else :data="unitStore.units" :headers="getUnitsTableColumns()" />
    <UnitsModal />
</template>
