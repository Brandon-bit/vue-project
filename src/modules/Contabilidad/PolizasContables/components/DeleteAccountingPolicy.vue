<script setup lang="ts">
import useAccountingPoliciesStore from '@/modules/Contabilidad/PolizasContables/store/accountingPoliciesStore'

const accountingPoliciesStore = useAccountingPoliciesStore()
</script>

<template>
    <p>
        ¿Estás seguro que deseas eliminar la póliza contable
        <span class="!font-semibold"> "{{ accountingPoliciesStore.selectedPolicy?.folio }}" </span>
        con concepto
        <span class="!font-semibold"> "{{ accountingPoliciesStore.selectedPolicy?.concept }}" </span>?
    </p>
    <p class="text-sm text-error mt-2">
        Esta acción no se puede deshacer y eliminará todas las partidas asociadas.
    </p>
</template>
