<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import BudgetModal from '@/modules/Administracion/Presupuestos/components/BudgetModal.vue'
import SummaryCard from '@/modules/Administracion/Presupuestos/components/SummaryCard.vue'
import BudgetProgressCard from '@/modules/Administracion/Presupuestos/components/BudgetProgressCard.vue'
import useBudgetStore from '@/modules/Administracion/Presupuestos/store/budgetStore'
import { useBudgetActions } from '@/modules/Administracion/Presupuestos/composables/useBudgetActions'
import type { BudgetType } from '@/modules/Administracion/Presupuestos/types/budgetTypes'

const { getBudgets } = useBudgetActions()

const budgetStore = useBudgetStore()
const modalStore = useModalStore()

const budgets = ref<BudgetType[]>([])
const selectedYear = ref(new Date().getFullYear())
const selectedArea = ref('todas')

const currentYear = new Date().getFullYear()

const fiscalYears = [
    { id: currentYear, label: currentYear.toString() },
    { id: currentYear - 1, label: (currentYear - 1).toString() },
    { id: currentYear - 2, label: (currentYear - 2).toString() }
]

const areas = [
    { id: 'todas', label: 'Todas las áreas' },
    { id: 'Marketing', label: 'Marketing' },
    { id: 'Operaciones', label: 'Operaciones' },
    { id: 'Tecnología', label: 'Tecnología' },
    { id: 'Recursos Humanos', label: 'Recursos Humanos' }
]

const openCreateModal = () => {
    budgetStore.setData()
    modalStore.open(budgetStore.modalId, { type: 'CREATE', title: 'Nuevo Presupuesto' })
}

const loadBudgets = async () => {
    try {
        budgets.value = await getBudgets(selectedYear.value, selectedArea.value)
    } catch {
        // Data simulada
        budgets.value = [
            { 
                id: 1,
                area: 'Marketing', 
                budgeted: 150000, 
                spent: 127500, 
                percentage: 85,
                status: 'warning',
                fiscalYear: currentYear,
                creationDate: new Date()
            },
            { 
                id: 2,
                area: 'Operaciones', 
                budgeted: 300000, 
                spent: 195000, 
                percentage: 65,
                status: 'success',
                fiscalYear: currentYear,
                creationDate: new Date()
            },
            { 
                id: 3,
                area: 'Tecnología', 
                budgeted: 200000, 
                spent: 205000, 
                percentage: 102.5,
                status: 'danger',
                fiscalYear: currentYear,
                creationDate: new Date()
            },
            { 
                id: 4,
                area: 'Recursos Humanos', 
                budgeted: 250000, 
                spent: 187500, 
                percentage: 75,
                status: 'success',
                fiscalYear: currentYear,
                creationDate: new Date()
            }
        ]
    }
}

const totalBudgeted = computed(() => {
    return budgets.value.reduce((sum, item) => sum + item.budgeted, 0)
})

const totalSpent = computed(() => {
    return budgets.value.reduce((sum, item) => sum + item.spent, 0)
})

const totalAvailable = computed(() => {
    return totalBudgeted.value - totalSpent.value
})

const totalPercentage = computed(() => {
    if (totalBudgeted.value === 0) return 0
    return ((totalSpent.value / totalBudgeted.value) * 100).toFixed(1)
})

const remainingPercentage = computed(() => {
    return (100 - parseFloat(totalPercentage.value)).toFixed(1)
})

const refreshAll = () => {
    loadBudgets()
}

onMounted(() => {
    loadBudgets()
})
</script>

<template>
    <BaseTitle 
        title="Presupuestos" 
        subtitle="Control presupuestal por área y proyecto"
    />

    <div class="mb-6 flex justify-between items-center">
        <div class="flex gap-4">
            <BaseFormSelect 
                name="fiscalYear" 
                label="" 
                :options="fiscalYears" 
                v-model="selectedYear"
                @change="loadBudgets"
            />
            
            <BaseFormSelect 
                name="area" 
                label="" 
                :options="areas" 
                v-model="selectedArea"
                @change="loadBudgets"
            />
        </div>

        <BaseButton text="Nuevo Presupuesto" @click="openCreateModal" icon="add" />
    </div>

    <!-- Dashboard General -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <SummaryCard 
            title="Total Presupuestado"
            :value="'$' + totalBudgeted.toLocaleString()"
            :subtitle="`Año fiscal ${selectedYear}`"
            icon="trending_up"
        />

        <SummaryCard 
            title="Total Gastado"
            :value="'$' + totalSpent.toLocaleString()"
            :subtitle="`${totalPercentage}% del presupuesto`"
            icon="trending_down"
        />

        <SummaryCard 
            title="Disponible"
            :value="'$' + totalAvailable.toLocaleString()"
            :subtitle="`${remainingPercentage}% restante`"
            icon="account_balance"
        />
    </div>

    <!-- Tabla de Presupuestos por Área -->
    <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
            <h2 class="card-title">Ejecución Presupuestal por Área</h2>
            <p class="text-sm text-base-content/70 mb-4">
                Comparación entre presupuesto asignado y gasto real
            </p>

            <div v-if="budgets.length === 0" class="text-center py-8">
                <span class="material-symbols-outlined text-6xl text-base-content/30">receipt_long</span>
                <p class="text-base-content/70 mt-2">No hay presupuestos registrados</p>
            </div>

            <div v-else class="space-y-6">
                <BudgetProgressCard 
                    v-for="budget in budgets" 
                    :key="budget.id" 
                    :budget="budget"
                />
            </div>
        </div>
    </div>
    
    <BudgetModal :onRefresh="refreshAll"/>
</template>

<style scoped>
</style>
