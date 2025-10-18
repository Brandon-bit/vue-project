<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import FixedAssetsModal from '@/modules/Contabilidad/ActivosFijos/components/FixedAssetsModal.vue'
import FixedAssetsStats from '@/modules/Contabilidad/ActivosFijos/components/FixedAssetsStats.vue'
import FixedAssetsFilters from '@/modules/Contabilidad/ActivosFijos/components/FixedAssetsFilters.vue'
import useFixedAssets from '@/modules/Contabilidad/ActivosFijos/composables/useFixedAssets'
import useFixedAssetsStore from '@/modules/Contabilidad/ActivosFijos/store/fixedAssetsStore'
import { useFixedAssetsActions } from '@/modules/Contabilidad/ActivosFijos/composables/useFixedAssetsActions'
import BaseTitle from '@/shared/components/BaseTitle.vue'

const { getTableColumns } = useFixedAssets()
const { getFixedAssets, getFixedAssetsStats } = useFixedAssetsActions()

const fixedAssetsStore = useFixedAssetsStore()
const modalStore = useModalStore()

const tablaRef = ref()
const filters = ref({
    search: '',
    area: '',
    status: ''
})

const stats = ref({
    totalAssets: 0,
    totalValue: 0,
    areasCount: 0,
    inactiveAssets: 0
})

const fetchCallback = async (page: number, pageSize: number) => {
    return await getFixedAssets(page, pageSize, filters.value.search, filters.value.area, filters.value.status)
}

const handleFilter = (newFilters: { search: string; area: string; status: string }) => {
    filters.value = newFilters
    tablaRef.value?.fetchData()
}

const loadStats = async () => {
    stats.value = await getFixedAssetsStats()
}

const openCreateModal = () => {
    fixedAssetsStore.setData()
    modalStore.open(fixedAssetsStore.modalId, { type: 'CREATE', title: 'Dar de alta activo fijo' })
}

onMounted(() => {
    loadStats()
})
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <BaseTitle title="Activos Fijos" subtitle="Control integral de bienes con trazabilidad contable y documental" />
        <div class="flex items-center justify-end">
            <BaseButton text="Agregar Activo" @click="openCreateModal" icon="add" />
        </div>

        <!-- Stats Cards -->
        <FixedAssetsStats
            :total-assets="stats.totalAssets"
            :total-value="stats.totalValue"
            :areas-count="stats.areasCount"
            :inactive-assets="stats.inactiveAssets"
        />

        <!-- Filters -->
        <FixedAssetsFilters @filter="handleFilter" />

        <!-- Table -->
        <BaseTable
            ref="tablaRef"
            :headers="getTableColumns()"
            :fetch-callback="fetchCallback"
        />
        
        <FixedAssetsModal :onRefresh="() => { tablaRef?.fetchData(); loadStats(); }"/>
    </div>
</template>

<style></style>
