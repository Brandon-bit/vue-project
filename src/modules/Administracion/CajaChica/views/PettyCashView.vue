<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import ExpenseModal from '@/modules/Administracion/CajaChica/components/ExpenseModal.vue'
import PettyBoxCard from '@/modules/Administracion/CajaChica/components/PettyBoxCard.vue'
import ApprovalCard from '@/modules/Administracion/CajaChica/components/ApprovalCard.vue'
import CutoffCard from '@/modules/Administracion/CajaChica/components/CutoffCard.vue'
import usePettyCash from '@/modules/Administracion/CajaChica/composables/usePettyCash'
import usePettyCashStore from '@/modules/Administracion/CajaChica/store/pettycashStore'
import { usePettyCashActions } from '@/modules/Administracion/CajaChica/composables/usePettyCashActions'
import type { PettyBoxType, ExpenseType } from '@/modules/Administracion/CajaChica/types/pettycashTypes'

const { getTableColumns } = usePettyCash()
const { getExpenses, getPettyBoxes, getPendingExpenses } = usePettyCashActions()

const pettyCashStore = usePettyCashStore()
const modalStore = useModalStore()

const tablaRef = ref()
const pettyBoxes = ref<PettyBoxType[]>([])
const pendingExpenses = ref<ExpenseType[]>([])
const activeTab = ref<'expenses' | 'approvals' | 'cutoffs'>('expenses')

const openCreateModal = () => {
    pettyCashStore.setData()
    modalStore.open(pettyCashStore.modalId, { type: 'CREATE', title: 'Registrar Nuevo Gasto' })
}

const loadPettyBoxes = async () => {
    try {
        // Intentar cargar desde API, si falla usar data simulada
        try {
            pettyBoxes.value = await getPettyBoxes()
        } catch {
            // Data simulada
            pettyBoxes.value = [
                { 
                    id: 1, 
                    name: 'Caja Oficina Central', 
                    assigned: 10000, 
                    balance: 4500, 
                    responsible: 'María García',
                    usedPercentage: 55
                },
                { 
                    id: 2, 
                    name: 'Caja Sucursal Norte', 
                    assigned: 5000, 
                    balance: 2300, 
                    responsible: 'Juan Pérez',
                    usedPercentage: 54
                },
                { 
                    id: 3, 
                    name: 'Caja Eventos', 
                    assigned: 15000, 
                    balance: 8200, 
                    responsible: 'Ana Martínez',
                    usedPercentage: 45.33
                }
            ]
        }
    } catch (error) {
        console.error('Error loading petty boxes:', error)
    }
}

const loadPendingExpenses = async () => {
    try {
        // Intentar cargar desde API, si falla usar data simulada
        try {
            pendingExpenses.value = await getPendingExpenses()
        } catch {
            // Data simulada
            pendingExpenses.value = [
                {
                    id: 1,
                    pettyBoxId: 1,
                    pettyBoxName: 'Caja Oficina Central',
                    date: new Date('2025-01-08'),
                    concept: 'Papelería',
                    amount: 450,
                    responsible: 'Carlos López',
                    costCenter: 'Administración',
                    description: 'Compra de material de oficina para el departamento',
                    status: 'Pendiente' as const,
                    receiptUrl: 'ticket_001.jpg',
                    creationDate: new Date('2025-01-08')
                },
                {
                    id: 3,
                    pettyBoxId: 2,
                    pettyBoxName: 'Caja Sucursal Norte',
                    date: new Date('2025-01-06'),
                    concept: 'Cafetería',
                    amount: 180,
                    responsible: 'Juan Pérez',
                    costCenter: 'Ventas',
                    description: 'Refrigerios para reunión con clientes',
                    status: 'Pendiente' as const,
                    receiptUrl: 'ticket_003.jpg',
                    creationDate: new Date('2025-01-06')
                }
            ]
        }
    } catch (error) {
        console.error('Error loading pending expenses:', error)
    }
}

const refreshAll = () => {
    tablaRef.value?.fetchData()
    loadPettyBoxes()
    loadPendingExpenses()
}

onMounted(() => {
    loadPettyBoxes()
    loadPendingExpenses()
})
</script>

<template>
    <BaseTitle 
        title="Caja Chica" 
        subtitle="Gestión digital de gastos menores y reposiciones"
    />

    <div class="mb-6 text-right">
        <BaseButton text="Registrar Gasto" @click="openCreateModal" icon="add" />
    </div>

    <!-- Dashboard de Cajas -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <PettyBoxCard 
            v-for="pettyBox in pettyBoxes" 
            :key="pettyBox.id" 
            :pettyBox="pettyBox"
        />
    </div>

    <!-- Tabs -->
    <div class="mb-6">
        <div role="tablist" class="tabs tabs-bordered">
            <a 
                role="tab" 
                class="tab"
                :class="{ 'tab-active': activeTab === 'expenses' }"
                @click="activeTab = 'expenses'"
            >
                Gastos Registrados
            </a>
            <a 
                role="tab" 
                class="tab"
                :class="{ 'tab-active': activeTab === 'approvals' }"
                @click="activeTab = 'approvals'"
            >
                Pendientes de Aprobación
                <span v-if="pendingExpenses.length > 0" class="badge badge-warning badge-sm ml-2">
                    {{ pendingExpenses.length }}
                </span>
            </a>
            <a 
                role="tab" 
                class="tab"
                :class="{ 'tab-active': activeTab === 'cutoffs' }"
                @click="activeTab = 'cutoffs'"
            >
                Cortes y Reposiciones
            </a>
        </div>
    </div>

    <!-- Tab Content: Gastos Registrados -->
    <div v-show="activeTab === 'expenses'" class="card bg-base-100 shadow-xl">
        <div class="card-body">
            <h2 class="card-title">Histórico de Gastos</h2>
            <p class="text-sm text-base-content/70 mb-4">Todos los gastos registrados en caja chica</p>
            
            <BaseTable
                ref="tablaRef"
                :headers="getTableColumns()"
                :fetch-callback="getExpenses"
            />
        </div>
    </div>

    <!-- Tab Content: Pendientes de Aprobación -->
    <div v-show="activeTab === 'approvals'" class="card bg-base-100 shadow-xl">
        <div class="card-body">
            <h2 class="card-title">Gastos Pendientes de Aprobación</h2>
            <p class="text-sm text-base-content/70 mb-4">Revise y apruebe los gastos registrados</p>
            
            <div v-if="pendingExpenses.length === 0" class="text-center py-8">
                <span class="material-symbols-outlined text-6xl text-base-content/30">check_circle</span>
                <p class="text-base-content/70 mt-2">No hay gastos pendientes de aprobación</p>
            </div>
            
            <div v-else class="space-y-4">
                <ApprovalCard 
                    v-for="expense in pendingExpenses" 
                    :key="expense.id" 
                    :expense="expense"
                />
            </div>
        </div>
    </div>

    <!-- Tab Content: Cortes y Reposiciones -->
    <div v-show="activeTab === 'cutoffs'">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <CutoffCard 
                v-for="pettyBox in pettyBoxes" 
                :key="pettyBox.id" 
                :pettyBox="pettyBox"
                @refresh="refreshAll"
            />
        </div>
    </div>
    
    <ExpenseModal :onRefresh="refreshAll"/>
</template>

<style scoped>
.tab {
    font-size: 1rem;
}
</style>
