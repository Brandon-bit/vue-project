<script setup lang="ts">
import useJournalPoliciesStore from '@/modules/Contabilidad/PolizasDeDiario/store/journalPoliciesStore'

const journalPoliciesStore = useJournalPoliciesStore()
</script>

<template>
    <p>
        ¿Estás seguro que deseas eliminar la póliza de diario
        <span class="!font-semibold"> "{{ journalPoliciesStore.selectedPolicy?.folio }}" </span>
        con concepto
        <span class="!font-semibold"> "{{ journalPoliciesStore.selectedPolicy?.concept }}" </span>?
    </p>
    <p class="text-sm text-error mt-2">
        Esta acción no se puede deshacer.
    </p>
</template>
