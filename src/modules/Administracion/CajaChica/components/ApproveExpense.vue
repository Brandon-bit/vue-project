<script setup lang="ts">
import usePettyCashStore from '@/modules/Administracion/CajaChica/store/pettycashStore'
const pettyCashStore = usePettyCashStore()
</script>

<template>
    <div class="space-y-4">
        <p class="text-base-content/80">
            Verifique la información y el comprobante antes de aprobar o rechazar
        </p>
        
        <div class="grid grid-cols-2 gap-4">
            <div>
                <label class="text-sm text-base-content/70">Concepto</label>
                <p class="font-medium">{{ pettyCashStore.selectedExpense?.concept }}</p>
            </div>
            <div>
                <label class="text-sm text-base-content/70">Monto</label>
                <p class="font-medium">${{ pettyCashStore.selectedExpense?.amount.toLocaleString() }}</p>
            </div>
            <div>
                <label class="text-sm text-base-content/70">Responsable</label>
                <p class="font-medium">{{ pettyCashStore.selectedExpense?.responsible }}</p>
            </div>
            <div>
                <label class="text-sm text-base-content/70">Fecha</label>
                <p class="font-medium">{{ new Date(pettyCashStore.selectedExpense?.date || '').toLocaleDateString() }}</p>
            </div>
            <div class="col-span-2">
                <label class="text-sm text-base-content/70">Centro de Costo</label>
                <p class="font-medium">{{ pettyCashStore.selectedExpense?.costCenter }}</p>
            </div>
            <div class="col-span-2">
                <label class="text-sm text-base-content/70">Descripción</label>
                <p class="font-medium">{{ pettyCashStore.selectedExpense?.description }}</p>
            </div>
        </div>

        <div class="border border-base-300 rounded-lg p-4 bg-base-200/50">
            <div class="flex flex-col items-center justify-center py-8">
                <span class="material-symbols-outlined text-6xl text-base-content/50">camera_alt</span>
                <p class="text-center text-sm text-base-content/70 mt-2">
                    {{ pettyCashStore.selectedExpense?.receiptUrl || 'Sin comprobante' }}
                </p>
            </div>
        </div>
    </div>
</template>
