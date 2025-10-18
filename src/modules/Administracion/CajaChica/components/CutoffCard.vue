<script setup lang="ts">
import type { PettyBoxType } from '@/modules/Administracion/CajaChica/types/pettycashTypes'
import { usePettyCashActions } from '@/modules/Administracion/CajaChica/composables/usePettyCashActions'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    pettyBox: PettyBoxType
}>()

const emit = defineEmits<{
    refresh: []
}>()

const { generateCutoff } = usePettyCashActions()

const handleGenerateCutoff = async () => {
    try {
        const { message, status } = await generateCutoff(props.pettyBox.id)
        showNotification(message, status)
        if (status === 'success') {
            emit('refresh')
        }
    } catch (error) {
        console.error(error)
        showNotification('Error al generar corte de caja', 'error')
    }
}

// Calcular gastos aprobados (simulado - debería venir del backend)
const approvedExpenses = 5500
const suggestedReplenishment = approvedExpenses
</script>

<template>
    <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
            <h3 class="card-title text-lg">{{ pettyBox.name }}</h3>
            <p class="text-sm text-base-content/70">Generar corte de caja</p>

            <div class="space-y-4 mt-4">
                <div class="space-y-2">
                    <div class="flex justify-between">
                        <span class="text-sm text-base-content/70">Gastos aprobados</span>
                        <span class="font-medium">${{ approvedExpenses.toLocaleString() }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-sm text-base-content/70">Saldo actual</span>
                        <span class="font-medium">${{ pettyBox.balance.toLocaleString() }}</span>
                    </div>
                    <div class="flex justify-between pt-2 border-t border-base-300">
                        <span class="text-sm font-medium">Reposición sugerida</span>
                        <span class="font-bold text-primary">${{ suggestedReplenishment.toLocaleString() }}</span>
                    </div>
                </div>

                <button @click="handleGenerateCutoff" class="btn btn-primary w-full">
                    <span class="material-symbols-outlined">trending_up</span>
                    Generar Corte
                </button>
            </div>
        </div>
    </div>
</template>
