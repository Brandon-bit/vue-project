<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import { useEmployees } from '@/modules/RRHH/Empleados/composables/useEmployees'
import { useEmployeeActions } from '@/modules/RRHH/Empleados/composables/useEmployeeActions'
import DeleteEmployeeModal from '@/modules/RRHH/Empleados/components/DeleteEmployeeModal.vue'
import EmployeeStatsCards from '@/modules/RRHH/Empleados/components/EmployeeStatsCards.vue'

const router = useRouter()
const { getTableColumns, MODAL_ID } = useEmployees()
const { getEmployees } = useEmployeeActions()

const tablaRef = ref()

const handleNewEmployee = () => {
    router.push('/rrhh/empleados/crear')
}
</script>

<template>
    <div>
        <h2 class="text-center mb-10">Empleados</h2>
        <div class="mb-10 flex gap-4 justify-end">
            <BaseButton text="Nuevo empleado" icon="add" @click="handleNewEmployee" />
        </div>

        <!-- Stats Cards -->
        <EmployeeStatsCards />

        <!-- Table -->
        <BaseTable ref="tablaRef" :headers="getTableColumns()" :fetch-callback="getEmployees" />

        <DeleteEmployeeModal :modal-id="MODAL_ID" :on-refresh="tablaRef?.fetchData" />
    </div>
</template>
