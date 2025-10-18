<script setup lang="ts">
import type { BudgetType } from '@/modules/Administracion/Presupuestos/types/budgetTypes'

defineProps<{
    budget: BudgetType
}>()

const getProgressColor = (status: string) => {
    if (status === 'danger') return 'bg-error'
    if (status === 'warning') return 'bg-warning'
    return 'bg-success'
}

const getBadgeClass = (status: string) => {
    if (status === 'danger') return 'badge-error'
    if (status === 'warning') return 'badge-warning'
    return 'badge-success'
}
</script>

<template>
    <div class="space-y-2">
        <div class="flex items-center justify-between">
            <div class="space-y-1">
                <p class="text-sm font-medium">{{ budget.area }}</p>
                <p class="text-sm text-base-content/70">
                    ${{ budget.spent.toLocaleString() }} de ${{ budget.budgeted.toLocaleString() }}
                </p>
            </div>
            <span :class="['badge', getBadgeClass(budget.status)]">
                {{ budget.percentage }}%
            </span>
        </div>
        <div class="w-full bg-base-200 rounded-full h-2">
            <div 
                :class="['h-2 rounded-full transition-all', getProgressColor(budget.status)]"
                :style="{ width: `${budget.percentage > 100 ? 100 : budget.percentage}%` }"
            />
        </div>
    </div>
</template>
