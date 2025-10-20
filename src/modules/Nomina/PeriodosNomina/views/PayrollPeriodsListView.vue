<script setup lang="ts">
import { ref } from 'vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import { usePayrollPeriods } from '@/modules/Nomina/PeriodosNomina/composables/usePayrollPeriods'
import CreateButton from '@/modules/Nomina/PeriodosNomina/components/CreateButton.vue'
import { usePayrollPeriodActions } from '@/modules/Nomina/PeriodosNomina/composables/usePayrollPeriodActions'
import PayrollPeriodModal from '@/modules/Nomina/PeriodosNomina/components/PayrollPeriodModal.vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'

const { getPayrollPeriods } = usePayrollPeriodActions()
const tableRef = ref()

const handleRefresh = () => {
    tableRef.value?.fetchData()
}
</script>

<template>
    <BaseTitle title="Períodos de nómina" subtitle="Gestiona los períodos de nómina" />
    <div class="mb-10 text-right">
        <CreateButton />
    </div>
    <BaseTable ref="tableRef" :fetchCallback="getPayrollPeriods" :headers="usePayrollPeriods()" />
    <PayrollPeriodModal :onRefresh="handleRefresh" />
</template>
