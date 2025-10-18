<script setup lang="ts">
import { ref, computed, h } from 'vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import ContractModal from '@/modules/Administracion/ContratosYConvenios/components/ContractModal.vue'
import StatsCard from '@/modules/Administracion/ContratosYConvenios/components/StatsCard.vue'
import useContractStore from '@/modules/Administracion/ContratosYConvenios/store/contractStore'
import type { ContractType } from '@/modules/Administracion/ContratosYConvenios/types/contractTypes'

const contractStore = useContractStore()
const modalStore = useModalStore()

const tablaRef = ref()

// Mock data - Contratos
const contracts = ref<ContractType[]>([
    {
        id: 'CT-2024-001',
        name: 'Contrato de Servicios de Software',
        counterpart: 'TechSolutions Inc.',
        type: 'Servicios',
        startDate: new Date('2024-01-15'),
        expirationDate: new Date('2025-01-15'),
        amount: 150000,
        status: 'vigente',
        daysToExpiration: 98
    },
    {
        id: 'CT-2024-002',
        name: 'Arrendamiento Oficinas',
        counterpart: 'Inmobiliaria Central',
        type: 'Arrendamiento',
        startDate: new Date('2023-06-01'),
        expirationDate: new Date('2024-11-30'),
        amount: 240000,
        status: 'proximo-vencer',
        daysToExpiration: 23
    },
    {
        id: 'CT-2024-003',
        name: 'Suministro de Equipos',
        counterpart: 'Proveedor Global S.A.',
        type: 'Compras',
        startDate: new Date('2024-03-01'),
        expirationDate: new Date('2024-10-15'),
        amount: 85000,
        status: 'vencido',
        daysToExpiration: -23
    },
    {
        id: 'CT-2024-004',
        name: 'Servicios de Consultoría',
        counterpart: 'Consultores Asociados',
        type: 'Servicios',
        startDate: new Date('2024-02-20'),
        expirationDate: new Date('2025-02-20'),
        amount: 200000,
        status: 'vigente',
        daysToExpiration: 135
    }
])

const openCreateModal = () => {
    contractStore.setData()
    modalStore.open(contractStore.modalId, { type: 'CREATE', title: 'Nuevo Contrato' })
}

const openDeleteModal = (contract: ContractType) => {
    contractStore.setData(contract)
    modalStore.open(contractStore.modalId, { type: 'DELETE', title: 'Eliminar Contrato' })
}

const refreshAll = () => {
    console.log('Refrescando datos...')
}

const getStatusBadge = (status: string, days: number) => {
    if (status === 'vencido') {
        return h('span', { class: 'badge badge-error' }, 'Vencido')
    }
    if (status === 'proximo-vencer') {
        return h('span', { class: 'badge badge-warning' }, `Próximo a vencer (${days}d)`)
    }
    return h('span', { class: 'badge badge-success' }, 'Vigente')
}

// Estadísticas calculadas
const activeContracts = computed(() => contracts.value.filter(c => c.status === 'vigente').length)
const expiringSoonContracts = computed(() => contracts.value.filter(c => c.status === 'proximo-vencer').length)
const expiredContracts = computed(() => contracts.value.filter(c => c.status === 'vencido').length)

// Columnas para BaseTable
const columns = [
    {
        key: 'id',
        label: 'ID',
        render: (row: ContractType) => {
            return h('span', { class: 'font-medium' }, row.id)
        }
    },
    {
        key: 'name',
        label: 'Nombre del Contrato',
        render: (row: ContractType) => {
            return h('span', {}, row.name)
        }
    },
    {
        key: 'counterpart',
        label: 'Contraparte',
        render: (row: ContractType) => {
            return h('span', {}, row.counterpart)
        }
    },
    {
        key: 'type',
        label: 'Tipo',
        render: (row: ContractType) => {
            return h('span', { class: 'badge badge-outline' }, row.type)
        }
    },
    {
        key: 'expirationDate',
        label: 'Fecha Vencimiento',
        render: (row: ContractType) => {
            return h('span', {}, new Date(row.expirationDate).toLocaleDateString())
        }
    },
    {
        key: 'amount',
        label: 'Monto',
        render: (row: ContractType) => {
            return h('span', { class: 'text-right font-medium' }, `$${row.amount.toLocaleString()}`)
        }
    },
    {
        key: 'status',
        label: 'Estado',
        render: (row: ContractType) => {
            return getStatusBadge(row.status, row.daysToExpiration)
        }
    }
]
</script>

<template>
    <BaseTitle 
        title="Contratos y Convenios" 
        subtitle="Control y seguimiento de contratos con clientes y proveedores"
    />

    <div class="mb-6 flex justify-end">
        <BaseButton text="Nuevo Contrato" @click="openCreateModal" icon="add" />
    </div>

    <!-- Tarjetas de Estadísticas -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatsCard 
            title="Contratos Vigentes"
            :value="activeContracts"
            subtitle="Activos en el sistema"
            icon="description"
            iconColor="text-base-content/70"
        />
        <StatsCard 
            title="Próximos a Vencer"
            :value="expiringSoonContracts"
            subtitle="Requieren atención"
            icon="warning"
            iconColor="text-yellow-500"
            borderColor="border-2 border-yellow-500/50"
            valueColor="text-yellow-600"
        />
        <StatsCard 
            title="Contratos Vencidos"
            :value="expiredContracts"
            subtitle="Acción inmediata"
            icon="event_busy"
            iconColor="text-error"
            borderColor="border-2 border-error/50"
            valueColor="text-error"
        />
    </div>

    <!-- Búsqueda y Tabla -->
    <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
            <h2 class="card-title">Base de Datos de Contratos</h2>
            <p class="text-sm text-base-content/70 mb-4">Búsqueda y gestión de todos los contratos</p>
            
            <div class="flex gap-4 mb-6">
                <div class="flex-1 relative">
                    <span class="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50">
                        search
                    </span>
                    <input 
                        type="text" 
                        placeholder="Buscar por ID, nombre, contraparte..." 
                        class="input input-bordered w-full pl-10"
                    />
                </div>
                <button class="btn btn-outline">
                    <span class="material-symbols-outlined">filter_alt</span>
                    Filtros
                </button>
            </div>

            <BaseTable 
                ref="tablaRef"
                :columns="columns"
                :data="contracts"
                :showSearch="false"
                @refresh="refreshAll"
            />
        </div>
    </div>
    
    <ContractModal :onRefresh="refreshAll"/>
</template>
