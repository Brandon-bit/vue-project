<script setup lang="ts">
import usePettyCashStore from '@/modules/Administracion/CajaChica/store/pettycashStore'
const pettyCashStore = usePettyCashStore()
</script>

<template>
    <p>
        ¿Estás seguro que deseas eliminar el gasto
        <span class="!font-semibold"> "{{ pettyCashStore.selectedExpense?.concept }}" </span>
        por un monto de
        <span class="!font-semibold"> ${{ pettyCashStore.selectedExpense?.amount.toLocaleString() }}?</span>
    </p>
</template>
