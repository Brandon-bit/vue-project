<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import { useEmployees } from '@/modules/RRHH/AltaEmpleados/composables/useEmployees'
import { useEmployeeActions } from '@/modules/RRHH/AltaEmpleados/composables/useEmployeeActions'
import DeleteEmployeeModal from '@/modules/RRHH/AltaEmpleados/components/DeleteEmployeeModal.vue'
import EmployeeStatsCards from '@/modules/RRHH/AltaEmpleados/components/EmployeeStatsCards.vue'

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
        <div class="flex items-center justify-between mb-8">
            <div>
                <h2 class="text-3xl font-bold mb-1">Matriz de Empleados</h2>
                <p class="text-base-content/60">Directorio inteligente de tu plantilla</p>
            </div>
            <BaseButton text="Nuevo empleado" icon="add" @click="handleNewEmployee" />
        </div>

        <!-- Stats Cards -->
        <EmployeeStatsCards />

        <!-- Table -->
        <BaseTable
            ref="tablaRef"
            :headers="getTableColumns()" 
            :fetch-callback="getEmployees"
        />
        
        <DeleteEmployeeModal :modal-id="MODAL_ID" :on-refresh="tablaRef?.fetchData" />
    </div>
</template>
