<script setup lang="ts">
import useContractStore from '@/modules/Administracion/ContratosYConvenios/store/contractStore'
const contractStore = useContractStore()
</script>

<template>
    <p>
        ¿Estás seguro que deseas eliminar el contrato
        <span class="!font-semibold"> "{{ contractStore.selectedContract?.name }}"</span>?
        Esta acción no se puede deshacer.
    </p>
</template>
