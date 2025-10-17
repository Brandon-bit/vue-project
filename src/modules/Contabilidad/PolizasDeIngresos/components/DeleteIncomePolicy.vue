<script setup lang="ts">
import useIncomePoliciesStore from '@/modules/Contabilidad/PolizasDeIngresos/store/incomePoliciesStore'

const incomePoliciesStore = useIncomePoliciesStore()
</script>

<template>
    <p>
        ¿Estás seguro que deseas eliminar la póliza de ingreso
        <span class="!font-semibold"> "{{ incomePoliciesStore.selectedPolicy?.folio }}" </span>
        del cliente
        <span class="!font-semibold"> "{{ incomePoliciesStore.selectedPolicy?.client }}" </span>?
    </p>
    <p class="text-sm text-error mt-2">
        Esta acción no se puede deshacer.
    </p>
</template>
