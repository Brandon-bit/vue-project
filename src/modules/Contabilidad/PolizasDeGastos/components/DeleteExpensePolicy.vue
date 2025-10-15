<script setup lang="ts">
import useExpensePoliciesStore from '@/modules/Contabilidad/PolizasDeGastos/store/expensePoliciesStore'

const expensePoliciesStore = useExpensePoliciesStore()
</script>

<template>
    <p>
        ¿Estás seguro que deseas eliminar la póliza de gasto
        <span class="!font-semibold"> "{{ expensePoliciesStore.selectedPolicy?.folio }}" </span>
        del proveedor
        <span class="!font-semibold"> "{{ expensePoliciesStore.selectedPolicy?.supplier }}" </span>?
    </p>
    <p class="text-sm text-error mt-2">
        Esta acción no se puede deshacer.
    </p>
</template>
