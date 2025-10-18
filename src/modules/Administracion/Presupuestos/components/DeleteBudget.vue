<script setup lang="ts">
import useBudgetStore from '@/modules/Administracion/Presupuestos/store/budgetStore'
const budgetStore = useBudgetStore()
</script>

<template>
    <p>
        ¿Estás seguro que deseas eliminar el presupuesto del área
        <span class="!font-semibold"> "{{ budgetStore.selectedBudget?.area }}" </span>
        por un monto de
        <span class="!font-semibold"> ${{ budgetStore.selectedBudget?.budgeted.toLocaleString() }}?</span>
    </p>
</template>
