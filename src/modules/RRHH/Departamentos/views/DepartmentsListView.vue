<script setup lang="ts">
import { ref } from 'vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import { useDepartments } from '@/modules/RRHH/Departamentos/composables/useDepartments'
import CreateButton from '@/modules/RRHH/Departamentos/components/CreateButton.vue'
import { useDepartmentActions } from '@/modules/RRHH/Departamentos/composables/useDepartmentActions'
import DepartmentModal from '@/modules/RRHH/Departamentos/components/DepartmentModal.vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'

const { getDepartments } = useDepartmentActions()
const tableRef = ref()

const handleRefresh = () => {
    tableRef.value?.fetchData()
}
</script>

<template>
    <BaseTitle 
        title="Departamentos" 
        subtitle="Gestión de departamentos"
    />
    <div class="mb-10 text-right">
        <CreateButton />
    </div>
    <BaseTable ref="tableRef" :fetchCallback="getDepartments" :headers="useDepartments()" />
    <DepartmentModal :onRefresh="handleRefresh" />
</template>
