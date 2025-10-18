<script setup lang="ts">
import type { PettyBoxType } from '@/modules/Administracion/CajaChica/types/pettycashTypes'
import { useModalStore } from '@/shared/stores/modal.store'
import usePettyCashStore from '@/modules/Administracion/CajaChica/store/pettycashStore'

defineProps<{
    pettyBox: PettyBoxType
}>()

const modalStore = useModalStore()
const pettyCashStore = usePettyCashStore()

const openExpenseModal = () => {
    modalStore.open(pettyCashStore.modalId, { type: 'CREATE', title: 'Registrar Nuevo Gasto' })
}

const getProgressColor = (percentage: number) => {
    if (percentage > 80) return 'bg-error'
    if (percentage > 60) return 'bg-warning'
    return 'bg-primary'
}
</script>

<template>
    <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
        <div class="card-body">
            <div class="flex items-start justify-between mb-4">
                <div>
                    <h3 class="card-title text-lg">{{ pettyBox.name }}</h3>
                    <p class="text-sm text-base-content/70">{{ pettyBox.responsible }}</p>
                </div>
                <span class="material-symbols-outlined text-primary text-4xl">account_balance_wallet</span>
            </div>

            <div class="space-y-4">
                <div class="space-y-2">
                    <div class="flex justify-between items-baseline">
                        <span class="text-sm text-base-content/70">Saldo Disponible</span>
                        <span class="text-2xl font-bold">${{ pettyBox.balance.toLocaleString() }}</span>
                    </div>
                    <div class="flex justify-between text-sm">
                        <span class="text-base-content/70">Monto Asignado</span>
                        <span class="text-base-content/70">${{ pettyBox.assigned.toLocaleString() }}</span>
                    </div>
                    
                    <div class="w-full bg-base-200 rounded-full h-2">
                        <div 
                            :class="['h-2 rounded-full transition-all', getProgressColor(pettyBox.usedPercentage || 0)]"
                            :style="{ width: `${pettyBox.usedPercentage || 0}%` }"
                        />
                    </div>
                    
                    <p class="text-xs text-base-content/70">
                        {{ (pettyBox.usedPercentage || 0).toFixed(1) }}% utilizado
                    </p>
                </div>

                <button @click="openExpenseModal" class="btn btn-outline btn-sm w-full">
                    <span class="material-symbols-outlined text-lg">add</span>
                    Registrar Gasto
                </button>
            </div>
        </div>
    </div>
</template>
