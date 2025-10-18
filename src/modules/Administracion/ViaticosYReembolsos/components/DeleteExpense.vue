<script setup lang="ts">
import useExpenseStore from '@/modules/Administracion/ViaticosYReembolsos/store/expenseStore'
const expenseStore = useExpenseStore()
</script>

<template>
    <p>
        ¿Estás seguro que deseas eliminar la solicitud
        <span class="!font-semibold"> "{{ expenseStore.selectedExpense?.concept }}"</span>?
        Esta acción no se puede deshacer.
    </p>
</template>
