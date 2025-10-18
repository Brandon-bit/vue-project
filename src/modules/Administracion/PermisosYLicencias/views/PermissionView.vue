<script setup lang="ts">
import { ref, computed, h } from 'vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import PermissionModal from '@/modules/Administracion/PermisosYLicencias/components/PermissionModal.vue'
import StatsCard from '@/modules/Administracion/PermisosYLicencias/components/StatsCard.vue'
import usePermissionStore from '@/modules/Administracion/PermisosYLicencias/store/permissionStore'
import type { PermissionType, TabType, PermissionTypeInfo } from '@/modules/Administracion/PermisosYLicencias/types/permissionTypes'

const permissionStore = usePermissionStore()
const modalStore = useModalStore()

const tablaRef = ref()
const activeTab = ref<TabType>('my-requests')

// Tipos de permisos
const permissionTypes: PermissionTypeInfo[] = [
    { id: 'vehiculo', name: 'Uso de Vehículo', icon: 'directions_car', color: 'text-blue-500', description: 'Solicitar vehículo de la empresa' },
    { id: 'equipo', name: 'Equipo de Cómputo', icon: 'laptop', color: 'text-purple-500', description: 'Solicitar laptop, proyector u otro equipo' },
    { id: 'sala', name: 'Sala de Juntas', icon: 'meeting_room', color: 'text-green-500', description: 'Reservar sala de reuniones' },
    { id: 'ausencia', name: 'Licencia de Ausencia', icon: 'flight_takeoff', color: 'text-orange-500', description: 'Solicitar día(s) de ausencia justificada' }
]

// Mock data - Solicitudes
const requests = ref<PermissionType[]>([
    { id: 1, type: 'Uso de Vehículo', resource: 'Vehículo #3 - Toyota Corolla', applicant: 'Carlos López', startDate: new Date('2025-01-15'), endDate: new Date('2025-01-15'), status: 'Pendiente', reason: 'Visita a cliente en Guadalajara' },
    { id: 2, type: 'Sala de Juntas', resource: 'Sala A - Planta Baja', applicant: 'María García', startDate: new Date('2025-01-12'), endDate: new Date('2025-01-12'), status: 'Aprobado', reason: 'Presentación a inversionistas' },
    { id: 3, type: 'Equipo de Cómputo', resource: 'Proyector HD', applicant: 'Ana Martínez', startDate: new Date('2025-01-14'), endDate: new Date('2025-01-16'), status: 'Pendiente', reason: 'Capacitación interna' },
    { id: 4, type: 'Licencia de Ausencia', resource: 'N/A', applicant: 'Juan Pérez', startDate: new Date('2025-01-20'), endDate: new Date('2025-01-22'), status: 'Aprobado', reason: 'Asunto personal' },
    { id: 5, type: 'Uso de Vehículo', resource: 'Vehículo #1 - Honda Civic', applicant: 'Pedro Ramírez', startDate: new Date('2025-01-10'), endDate: new Date('2025-01-10'), status: 'Rechazado', reason: 'Entrega de documentos' }
])

// Solicitudes pendientes de aprobación
const pendingApprovals = computed(() => requests.value.filter(r => r.status === 'Pendiente'))

const openCreateModal = () => {
    permissionStore.setData()
    permissionStore.setSelectedPermissionType('')
    modalStore.open(permissionStore.modalId, { type: 'CREATE', title: 'Nueva Solicitud de Permiso' })
}

const openDeleteModal = (permission: PermissionType) => {
    permissionStore.setData(permission)
    modalStore.open(permissionStore.modalId, { type: 'DELETE', title: 'Eliminar Solicitud' })
}

const refreshAll = () => {
    console.log('Refrescando datos...')
}

const getStatusBadge = (status: string) => {
    const badges: Record<string, { class: string, icon: string }> = {
        'Pendiente': { class: 'badge-warning', icon: 'schedule' },
        'Aprobado': { class: 'badge-success', icon: 'check_circle' },
        'Rechazado': { class: 'badge-error', icon: 'cancel' }
    }
    const config = badges[status] || badges['Pendiente']
    return h('div', { class: 'flex items-center gap-1' }, [
        h('span', { class: `material-symbols-outlined text-sm` }, config.icon),
        h('span', { class: `badge ${config.class}` }, status)
    ])
}

const handleApprove = (id: number) => {
    console.log('Aprobando:', id)
    alert(`Solicitud ${id} aprobada`)
}

const handleReject = (id: number) => {
    console.log('Rechazando:', id)
    alert(`Solicitud ${id} rechazada`)
}

// Columnas para BaseTable
const columns = [
    {
        key: 'type',
        label: 'Tipo',
        render: (row: PermissionType) => {
            return h('span', { class: 'font-medium' }, row.type)
        }
    },
    {
        key: 'resource',
        label: 'Recurso',
        render: (row: PermissionType) => {
            return h('span', {}, row.resource)
        }
    },
    {
        key: 'startDate',
        label: 'Fecha Inicio',
        render: (row: PermissionType) => {
            return h('span', {}, new Date(row.startDate).toLocaleDateString())
        }
    },
    {
        key: 'endDate',
        label: 'Fecha Fin',
        render: (row: PermissionType) => {
            return h('span', {}, new Date(row.endDate).toLocaleDateString())
        }
    },
    {
        key: 'status',
        label: 'Estado',
        render: (row: PermissionType) => {
            return getStatusBadge(row.status)
        }
    },
    {
        key: 'actions',
        label: 'Acciones',
        render: (row: PermissionType) => {
            return h('button', {
                class: 'btn btn-ghost btn-sm',
                onClick: () => console.log('Ver detalles', row.id)
            }, 'Ver Detalles')
        }
    }
]
</script>

<template>
    <BaseTitle 
        title="Permisos y Licencias" 
        subtitle="Portal de autoservicio para solicitudes de recursos y ausencias"
    />

    <div class="mb-6 flex justify-end">
        <BaseButton text="Nueva Solicitud" @click="openCreateModal" icon="add" />
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatsCard 
            label="Solicitudes Activas"
            value="12"
            icon="description"
            iconColor="text-blue-500"
        />
        <StatsCard 
            label="Pendientes"
            value="5"
            icon="schedule"
            iconColor="text-yellow-500"
        />
        <StatsCard 
            label="Aprobadas Hoy"
            value="8"
            icon="check_circle"
            iconColor="text-green-500"
        />
        <StatsCard 
            label="Recursos Disponibles"
            value="15"
            icon="meeting_room"
            iconColor="text-purple-500"
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
                Pendientes de Aprobación
            </a>
            <a 
                role="tab" 
                :class="['tab', { 'tab-active': activeTab === 'calendar' }]"
                @click="activeTab = 'calendar'"
            >
                Calendario de Recursos
            </a>
        </div>
    </div>

    <!-- Tab Content: Mis Solicitudes -->
    <div v-show="activeTab === 'my-requests'" class="card bg-base-100 shadow-xl">
        <div class="card-body">
            <h2 class="card-title">Histórico de Solicitudes</h2>
            <p class="text-sm text-base-content/70 mb-4">Todas tus solicitudes de permisos y licencias</p>
            
            <BaseTable 
                ref="tablaRef"
                :columns="columns"
                :data="requests"
                :showSearch="false"
                @refresh="refreshAll"
            />
        </div>
    </div>

    <!-- Tab Content: Pendientes de Aprobación -->
    <div v-show="activeTab === 'approvals'" class="card bg-base-100 shadow-xl">
        <div class="card-body">
            <h2 class="card-title">Solicitudes Pendientes de Aprobación</h2>
            <p class="text-sm text-base-content/70 mb-4">Revise y apruebe las solicitudes de su equipo</p>
            
            <div class="space-y-4">
                <div 
                    v-for="request in pendingApprovals" 
                    :key="request.id"
                    class="border rounded-lg p-4 space-y-3 hover:bg-base-200 transition-colors"
                >
                    <div class="flex justify-between items-start">
                        <div class="space-y-1">
                            <div class="flex items-center gap-2">
                                <h4 class="font-semibold">{{ request.type }}</h4>
                                <span class="badge badge-warning gap-1">
                                    <span class="material-symbols-outlined text-xs">schedule</span>
                                    {{ request.status }}
                                </span>
                            </div>
                            <p class="text-sm text-base-content/70">{{ request.applicant }}</p>
                            <p class="text-sm">
                                <span class="font-medium">Recurso:</span> {{ request.resource }}
                            </p>
                            <p class="text-sm">
                                <span class="font-medium">Período:</span> 
                                {{ new Date(request.startDate).toLocaleDateString() }} al 
                                {{ new Date(request.endDate).toLocaleDateString() }}
                            </p>
                            <p class="text-sm text-base-content/70">{{ request.reason }}</p>
                        </div>
                    </div>
                    <div class="flex gap-2">
                        <button 
                            class="btn btn-error btn-sm flex-1"
                            @click="handleReject(request.id!)"
                        >
                            <span class="material-symbols-outlined text-sm">cancel</span>
                            Rechazar
                        </button>
                        <button 
                            class="btn btn-success btn-sm flex-1"
                            @click="handleApprove(request.id!)"
                        >
                            <span class="material-symbols-outlined text-sm">check_circle</span>
                            Aprobar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Tab Content: Calendario de Recursos -->
    <div v-show="activeTab === 'calendar'" class="card bg-base-100 shadow-xl">
        <div class="card-body">
            <h2 class="card-title">Calendario de Recursos</h2>
            <p class="text-sm text-base-content/70 mb-4">Vista consolidada de todos los recursos y sus reservas</p>
            
            <div class="border-2 border-dashed rounded-lg p-12 text-center">
                <span class="material-symbols-outlined text-6xl text-base-content/30 mb-4">calendar_month</span>
                <p class="text-lg font-medium text-base-content/70">Vista de calendario interactivo próximamente</p>
                <p class="text-sm text-base-content/50 mt-2">Aquí podrá ver la disponibilidad de todos los recursos en tiempo real</p>
            </div>
        </div>
    </div>
    
    <PermissionModal :onRefresh="refreshAll" :permissionTypes="permissionTypes" />
</template>

<style scoped>
.tab {
    font-size: 1rem;
}
</style>
