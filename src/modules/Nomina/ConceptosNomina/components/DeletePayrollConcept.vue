<script setup lang="ts">
import usePayrollConceptStore from '@/modules/Nomina/ConceptosNomina/store/payrollConceptStore'

const payrollConceptStore = usePayrollConceptStore()
</script>

<template>
    <div class="text-center">
        <p class="text-lg mb-4">
            ¿Está seguro que desea eliminar el concepto
            <strong>{{ payrollConceptStore.selectedPayrollConcept?.name }}</strong>
            ({{ payrollConceptStore.selectedPayrollConcept?.code }})?
        </p>
        <p class="text-sm text-gray-500">Esta acción no se puede deshacer.</p>
    </div>
</template>
