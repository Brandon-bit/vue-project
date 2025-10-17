<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import { useVacations } from '@rrhh/Vacaciones/composables/useVacations'
import { useVacationsActions } from '@rrhh/Vacaciones/composables/useVacationsActions'
import VacationModal from '@rrhh/Vacaciones/components/VacationModal.vue'
import useVacationStore from '@rrhh/Vacaciones/store/vacationStore'
import { useModalStore } from '@/shared/stores/modal.store'

const { getTableColumns } = useVacations()
const { getVacations } = useVacationsActions()
const vacationStore = useVacationStore()
const modalStore = useModalStore()

const tableRef = ref()

const openCreateModal = () => {
    vacationStore.clearData()
    modalStore.open(vacationStore.modalId, {
        type: 'CREATE',
        title: 'Nueva solicitud de vacaciones'
    })
}

const refreshTable = () => {
    if (tableRef.value?.fetchData) {
        tableRef.value.fetchData()
    }
}
</script>

<template>
    <h2 class="text-center mb-10">Vacaciones</h2>

    <div class="mb-10 flex gap-4 justify-end">
        <BaseButton text="Nueva solicitud" icon="add" @click="openCreateModal" />
    </div>

    <BaseTable ref="tableRef" :headers="getTableColumns()" :fetchCallback="getVacations" />

    <VacationModal :onRefresh="refreshTable" />
</template>
