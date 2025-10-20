<script setup lang="ts">
import { ref } from 'vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import { usePayrollConcepts } from '@/modules/Nomina/ConceptosNomina/composables/usePayrollConcepts'
import CreateButton from '@/modules/Nomina/ConceptosNomina/components/CreateButton.vue'
import { usePayrollConceptActions } from '@/modules/Nomina/ConceptosNomina/composables/usePayrollConceptActions'
import PayrollConceptModal from '@/modules/Nomina/ConceptosNomina/components/PayrollConceptModal.vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'

const { getPayrollConcepts } = usePayrollConceptActions()
const tableRef = ref()

const handleRefresh = () => {
    tableRef.value?.fetchData()
}
</script>

<template>
    <BaseTitle title="Conceptos de nómina" subtitle="Gestiona los conceptos de nómina" />
    <div class="mb-10 text-right">
        <CreateButton />
    </div>
    <BaseTable ref="tableRef" :fetchCallback="getPayrollConcepts" :headers="usePayrollConcepts()" />
    <PayrollConceptModal :onRefresh="handleRefresh" />
</template>
