<script setup lang="ts">
import useGastoStore from '@/modules/Administracion/CajaChica/store/gastoStore'
const gastoStore = useGastoStore()
</script>

<template>
    <div class="space-y-4">
        <p>
            ¿Estás seguro que deseas aprobar el siguiente gasto?
        </p>
        
        <div class="bg-base-200 p-4 rounded-lg space-y-2">
            <div class="flex justify-between">
                <span class="font-semibold">Concepto:</span>
                <span>{{ gastoStore.selectedGasto?.concepto }}</span>
            </div>
            <div class="flex justify-between">
                <span class="font-semibold">Monto:</span>
                <span class="text-lg font-bold">${{ gastoStore.selectedGasto?.monto.toLocaleString() }}</span>
            </div>
            <div class="flex justify-between">
                <span class="font-semibold">Responsable:</span>
                <span>{{ gastoStore.selectedGasto?.responsable }}</span>
            </div>
            <div class="flex justify-between">
                <span class="font-semibold">Centro de Costo:</span>
                <span>{{ gastoStore.selectedGasto?.centroCosto }}</span>
            </div>
        </div>

        <p class="text-sm text-warning">
            Esta acción actualizará el saldo de la caja chica correspondiente.
        </p>
    </div>
</template>
