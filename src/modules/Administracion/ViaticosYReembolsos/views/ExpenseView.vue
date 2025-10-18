<script setup lang="ts">
import { ref, computed, h } from 'vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import ExpenseModal from '@/modules/Administracion/ViaticosYReembolsos/components/ExpenseModal.vue'
import StatsCard from '@/modules/Administracion/ViaticosYReembolsos/components/StatsCard.vue'
import useExpenseStore from '@/modules/Administracion/ViaticosYReembolsos/store/expenseStore'
import type { ExpenseType, TabType } from '@/modules/Administracion/ViaticosYReembolsos/types/expenseTypes'

const expenseStore = useExpenseStore()
const modalStore = useModalStore()

const tablaRef = ref()

// Mock data - Mis Solicitudes
const myRequests = ref<ExpenseType[]>([
    {
        id: 'VT-2024-045',
        concept: 'Viaje a Monterrey - Reunión con Cliente',
        date: new Date('2024-10-15'),
        amount: 8500,
        status: 'aprobado',
        verified: true
    },
    {
        id: 'VT-2024-046',
        concept: 'Capacitación en Ciudad de México',
        date: new Date('2024-10-20'),
        amount: 12000,
        status: 'pendiente',
        verified: false
    },
    {
        id: 'VT-2024-047',
        concept: 'Material de oficina',
        date: new Date('2024-10-08'),
        amount: 3200,
        status: 'pagado',
        verified: true
    }
])

// Mock data - Solicitudes para Aprobación
const approvalRequests = ref<ExpenseType[]>([
    {
        id: 'VT-2024-048',
        employee: 'Juan Pérez',
        concept: 'Viaje a Guadalajara',
        date: new Date('2024-10-25'),
        amount: 9500,
        status: 'pendiente',
        verified: false
    },
    {
        id: 'VT-2024-049',
        employee: 'María González',
        concept: 'Compra de equipo',
        date: new Date('2024-10-22'),
        amount: 5400,
        status: 'pendiente',
        verified: false
    }
])

const activeTab = ref<TabType>('my-requests')

const openCreateModal = () => {
    expenseStore.setData()
    modalStore.open(expenseStore.modalId, { type: 'CREATE', title: 'Nueva Solicitud' })
}

const openDeleteModal = (expense: ExpenseType) => {
    expenseStore.setData(expense)
    modalStore.open(expenseStore.modalId, { type: 'DELETE', title: 'Eliminar Solicitud' })
}

const refreshAll = () => {
    console.log('Refrescando datos...')
}

const getStatusBadge = (status: string) => {
    const badges: Record<string, string> = {
        aprobado: 'badge-info',
        pendiente: 'badge-warning',
        rechazado: 'badge-error',
        pagado: 'badge-success'
    }
    return badges[status] || 'badge-ghost'
}

const handleApprove = (id: string) => {
    console.log('Aprobando:', id)
    alert(`Solicitud ${id} aprobada`)
}

const handleReject = (id: string) => {
    console.log('Rechazando:', id)
    alert(`Solicitud ${id} rechazada`)
}

// Columnas para tabla de Mis Solicitudes
const myRequestsColumns = [
    {
        key: 'id',
        label: 'ID',
        render: (row: ExpenseType) => {
            return h('span', { class: 'font-medium' }, row.id)
        }
    },
    {
        key: 'concept',
        label: 'Concepto',
        render: (row: ExpenseType) => {
            return h('span', {}, row.concept)
        }
    },
    {
        key: 'date',
        label: 'Fecha',
        render: (row: ExpenseType) => {
            return h('span', {}, new Date(row.date).toLocaleDateString())
        }
    },
    {
        key: 'amount',
        label: 'Monto',
        render: (row: ExpenseType) => {
            return h('span', { class: 'text-right font-medium' }, `$${row.amount.toLocaleString()}`)
        }
    },
    {
        key: 'status',
        label: 'Estado',
        render: (row: ExpenseType) => {
            return h('span', { class: `badge ${getStatusBadge(row.status)}` }, 
                row.status.charAt(0).toUpperCase() + row.status.slice(1)
            )
        }
    },
    {
        key: 'verified',
        label: 'Comprobado',
        render: (row: ExpenseType) => {
            return row.verified 
                ? h('span', { class: 'material-symbols-outlined text-success' }, 'check_circle')
                : h('span', { class: 'material-symbols-outlined text-base-content/30' }, 'cancel')
        }
    }
]
</script>

<template>
    <BaseTitle 
        title="Viáticos y Reembolsos" 
        subtitle="Administración de solicitudes y comprobaciones"
    />

    <div class="mb-6 flex justify-end">
        <BaseButton text="Nueva Solicitud" @click="openCreateModal" icon="add" />
    </div>

    <!-- Dashboard de Estadísticas -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatsCard 
            title="Pendientes"
            value="2"
            subtitle="En revisión"
            icon="schedule"
            iconColor="text-yellow-500"
        />
        <StatsCard 
            title="Aprobadas"
            value="5"
            subtitle="Este mes"
            icon="check_circle"
            iconColor="text-green-500"
        />
        <StatsCard 
            title="Pagadas"
            value="12"
            subtitle="Completadas"
            icon="payments"
            iconColor="text-blue-500"
        />
        <StatsCard 
            title="Total del Mes"
            value="$45,200"
            subtitle="Octubre 2024"
            icon="attach_money"
            iconColor="text-base-content/70"
        />
    </div>

    <!-- Tabs -->
    <div class="mb-6">
        <div role="tablist" class="tabs tabs-boxed bg-base-200 w-fit">
            <a 
                role="tab" 
                :class="['tab', { 'tab-active': activeTab === 'my-requests' }]"
                @click="activeTab = 'my-requests'"
            >
                Mis Solicitudes
            </a>
            <a 
                role="tab" 
                :class="['tab', { 'tab-active': activeTab === 'approvals' }]"
                @click="activeTab = 'approvals'"
            >
                Panel de Aprobaciones
            </a>
        </div>
    </div>

    <!-- Tab Content: Mis Solicitudes -->
    <div v-show="activeTab === 'my-requests'" class="card bg-base-100 shadow-xl">
        <div class="card-body">
            <h2 class="card-title">Mis Solicitudes de Viáticos</h2>
            <p class="text-sm text-base-content/70 mb-4">Historial de tus solicitudes y su estado actual</p>
            
            <BaseTable 
                ref="tablaRef"
                :columns="myRequestsColumns"
                :data="myRequests"
                :showSearch="false"
                @refresh="refreshAll"
            />
        </div>
    </div>

    <!-- Tab Content: Panel de Aprobaciones -->
    <div v-show="activeTab === 'approvals'" class="card bg-base-100 shadow-xl">
        <div class="card-body">
            <h2 class="card-title">Solicitudes Pendientes de Aprobación</h2>
            <p class="text-sm text-base-content/70 mb-4">Revisa y aprueba las solicitudes de tu equipo</p>
            
            <div class="overflow-x-auto">
                <table class="table table-zebra">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Empleado</th>
                            <th>Concepto</th>
                            <th>Fecha</th>
                            <th class="text-right">Monto</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="request in approvalRequests" :key="request.id" class="hover">
                            <td class="font-medium">{{ request.id }}</td>
                            <td>{{ request.employee }}</td>
                            <td>{{ request.concept }}</td>
                            <td>{{ new Date(request.date).toLocaleDateString() }}</td>
                            <td class="text-right font-medium">${{ request.amount.toLocaleString() }}</td>
                            <td>
                                <div class="flex gap-2">
                                    <button 
                                        class="btn btn-success btn-sm"
                                        @click="handleApprove(request.id!)"
                                    >
                                        Aprobar
                                    </button>
                                    <button 
                                        class="btn btn-error btn-sm"
                                        @click="handleReject(request.id!)"
                                    >
                                        Rechazar
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    
    <ExpenseModal :onRefresh="refreshAll"/>
</template>

<style scoped>
.tab {
    font-size: 1rem;
}
</style>
