<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import GastoModal from '@/modules/Administracion/CajaChica/components/GastoModal.vue'
import useGasto from '@/modules/Administracion/CajaChica/composables/useGasto'
import useGastoStore from '@/modules/Administracion/CajaChica/store/gastoStore'
import { useGastoActions } from '@/modules/Administracion/CajaChica/composables/useGastoActions'
import BaseTitle from '@/shared/components/BaseTitle.vue'

const { getTableColumns } = useGasto()
const { getGastos } = useGastoActions()

const gastoStore = useGastoStore()
const modalStore = useModalStore()

const tablaRef = ref()

const openCreateModal = () => {
    gastoStore.setData()
    modalStore.open(gastoStore.modalId, { type: 'CREATE', title: 'Registrar Nuevo Gasto' })
}
</script>

<template>
    <BaseTitle 
        title="Caja Chica" 
        subtitle="Gestión digital de gastos menores y reposiciones"
    />

    <div class="mb-10 text-right">
        <BaseButton text="Registrar Gasto" @click="openCreateModal" icon="add" />
    </div>

    <BaseTable
        ref="tablaRef"
        :headers="getTableColumns()"
        :fetch-callback="getGastos"
    />
    
    <GastoModal :onRefresh="tablaRef?.fetchData"/>
</template>

<style scoped>
</style>
