<script setup lang="ts">
import useGastoStore from '@/modules/Administracion/CajaChica/store/gastoStore'
const gastoStore = useGastoStore()
</script>

<template>
    <p>
        ¿Estás seguro que deseas eliminar el gasto
        <span class="!font-semibold"> "{{ gastoStore.selectedGasto?.concepto }}" </span>
        por un monto de
        <span class="!font-semibold"> ${{ gastoStore.selectedGasto?.monto.toLocaleString() }}?</span>
    </p>
</template>
