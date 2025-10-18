<script setup lang="ts">
import type { ExpenseType } from '@/modules/Administracion/CajaChica/types/pettycashTypes'
import { useModalStore } from '@/shared/stores/modal.store'
import usePettyCashStore from '@/modules/Administracion/CajaChica/store/pettycashStore'

const props = defineProps<{
    expense: ExpenseType
}>()

const modalStore = useModalStore()
const pettyCashStore = usePettyCashStore()

const openApprovalModal = () => {
    pettyCashStore.setData(props.expense)
    modalStore.open(pettyCashStore.modalId, { type: 'APPROVE', title: 'Revisión de Gasto' })
}

const getStatusBadge = (status: string) => {
    const classes: Record<string, string> = {
        'Pendiente': 'badge-warning',
        'Aprobado': 'badge-success',
        'Rechazado': 'badge-error'
    }
    return classes[status] || 'badge-warning'
}

const getStatusIcon = (status: string) => {
    const icons: Record<string, string> = {
        'Pendiente': 'schedule',
        'Aprobado': 'check_circle',
        'Rechazado': 'cancel'
    }
    return icons[status] || 'schedule'
}
</script>

<template>
    <div class="border border-base-300 rounded-lg p-4 space-y-3 hover:bg-base-200 transition-colors">
        <div class="flex justify-between items-start">
            <div class="space-y-1">
                <h4 class="font-semibold">{{ expense.concept }}</h4>
                <p class="text-sm text-base-content/70">{{ expense.responsible }} • {{ new Date(expense.date).toLocaleDateString() }}</p>
                <p class="text-sm text-base-content/70">{{ expense.pettyBoxName }}</p>
            </div>
            <div class="text-right">
                <p class="text-2xl font-bold">${{ expense.amount.toLocaleString() }}</p>
                <span :class="['badge badge-sm', getStatusBadge(expense.status)]">
                    <span class="material-symbols-outlined text-xs mr-1">{{ getStatusIcon(expense.status) }}</span>
                    {{ expense.status }}
                </span>
            </div>
        </div>
        
        <div class="flex gap-2">
            <button @click="openApprovalModal" class="btn btn-outline btn-sm flex-1">
                <span class="material-symbols-outlined text-lg">receipt_long</span>
                Ver Comprobante
            </button>
        </div>
    </div>
</template>
