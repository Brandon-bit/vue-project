<script setup lang="ts">
import { ref } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import useAuditStore from '../store/auditStore'
import { useAuditActions } from '../composables/useAuditActions'
import { useAuditTableHeaders } from '../composables/useAuditTableHeaders'
import AuditModal from '../components/AuditModal.vue'
import FindingModal from '../components/FindingModal.vue'
import AuditStatsCards from '../components/AuditStatsCards.vue'
import ChecklistExecution from '../components/ChecklistExecution.vue'
import FindingsKanban from '../components/FindingsKanban.vue'
import type { AuditStats, ChecklistItem, Finding, Audit } from '../types/auditTypes'

const modalStore = useModalStore()
const auditStore = useAuditStore()
const { getAudits, getFindings } = useAuditActions()

const tablaRef = ref()
const findingsData = ref<Finding[]>([])

// Estadísticas (mock data - reemplazar con datos reales)
const stats = ref<AuditStats>({
    activas: 3,
    hallazgosAbiertos: 12,
    tareasCorrectivas: 8,
    completadasAnio: 15
})

// Checklist items (mock data - reemplazar con datos reales)
const checklistItems = ref<ChecklistItem[]>([
    { id: 1, auditoriaId: 1, categoria: 'Documentación', item: 'Todos los CFDI emitidos tienen XML válido', cumple: true },
    { id: 2, auditoriaId: 1, categoria: 'Documentación', item: 'Las facturas tienen cancelación oportuna', cumple: true },
    { id: 3, auditoriaId: 1, categoria: 'Procesos', item: 'Existe procedimiento documentado de facturación', cumple: false },
    { id: 4, auditoriaId: 1, categoria: 'Procesos', item: 'Se realiza conciliación mensual con SAT', cumple: true },
    { id: 5, auditoriaId: 1, categoria: 'Controles', item: 'Segregación de funciones en autorización', cumple: false },
    { id: 6, auditoriaId: 1, categoria: 'Controles', item: 'Bitácora de accesos al sistema', cumple: true }
])

// Auditorías mock (para el selector del checklist)
const audits = ref<Audit[]>([
    { id: 1, nombre: 'Auditoría Fiscal Q4 2024', tipo: 'Fiscal', area: 'Contabilidad', auditor: 'Despacho Externo ABC', fechaInicio: '2025-01-15', fechaFin: '2025-01-30', estado: 'Planificada', hallazgos: 0, progreso: 0, objetivo: '', activo: true, eliminado: false },
    { id: 2, nombre: 'Revisión de Procesos RH', tipo: 'Operativa', area: 'Recursos Humanos', auditor: 'Equipo Interno', fechaInicio: '2025-01-08', fechaFin: '2025-01-20', estado: 'En Ejecución', hallazgos: 3, progreso: 45, objetivo: '', activo: true, eliminado: false }
])

const openCreateModal = () => {
    auditStore.setAuditData()
    modalStore.open(auditStore.auditModalId, { 
        type: 'CREATE', 
        title: 'Planificar Nueva Auditoría' 
    })
}

const handleRegisterFinding = (item: ChecklistItem) => {
    auditStore.setChecklistItem(item)
    modalStore.open(auditStore.findingModalId, { 
        type: 'CREATE', 
        title: 'Registrar Hallazgo de Auditoría' 
    })
}

const loadFindings = async () => {
    try {
        const response = await getFindings()
        if (response.data) {
            findingsData.value = response.data
        }
    } catch (error) {
        // Mock data si falla
        findingsData.value = [
            { id: 1, auditoriaId: 2, auditoriaNombre: 'Revisión de Procesos RH', severidad: 'Alta', descripcion: 'No existe manual de políticas de vacaciones actualizado', responsable: 'Director RH', fechaLimite: '2025-02-15', estado: 'Pendiente', activo: true, eliminado: false },
            { id: 2, auditoriaId: 3, auditoriaNombre: 'Control de Inventarios', severidad: 'Media', descripcion: 'Diferencias en conteo físico vs sistema (3%)', responsable: 'Jefe Almacén', fechaLimite: '2025-01-30', estado: 'En Proceso', activo: true, eliminado: false },
            { id: 3, auditoriaId: 3, auditoriaNombre: 'Control de Inventarios', severidad: 'Baja', descripcion: 'Falta etiquetado en 5% de productos', responsable: 'Supervisor Almacén', fechaLimite: '2025-01-20', estado: 'Completado', activo: true, eliminado: false }
        ]
    }
}

loadFindings()
</script>

<template>
    <div class="space-y-6">
        <BaseTitle 
            title="Auditorías Administrativas" 
            subtitle="Sistema de gestión de auditorías y mejora continua"
        />

        <!-- Stats Cards -->
        <AuditStatsCards :stats="stats" />

        <!-- Tabs -->
        <div role="tablist" class="tabs tabs-lifted">
            <!-- Tab 1: Auditorías -->
            <input 
                type="radio" 
                name="audit_tabs" 
                role="tab" 
                class="tab" 
                aria-label="Auditorías"
                checked
            />
            <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
                <div class="space-y-4">
                    <div class="flex justify-between items-center">
                        <div>
                            <h2 class="text-xl font-semibold">Registro de Auditorías</h2>
                            <p class="text-sm text-base-content/70">Gestión y seguimiento de todas las auditorías</p>
                        </div>
                        <BaseButton 
                            text="Nueva Auditoría" 
                            @click="openCreateModal()" 
                            icon="add" 
                        />
                    </div>

                    <BaseTable
                        ref="tablaRef"
                        :headers="useAuditTableHeaders()"
                        :fetch-callback="getAudits"
                    />
                </div>
            </div>

            <!-- Tab 2: Ejecución -->
            <input 
                type="radio" 
                name="audit_tabs" 
                role="tab" 
                class="tab" 
                aria-label="Ejecución"
            />
            <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
                <ChecklistExecution 
                    :items="checklistItems"
                    :audits="audits"
                    @registerFinding="handleRegisterFinding"
                    @selectAudit="(id) => console.log('Selected audit:', id)"
                />
            </div>

            <!-- Tab 3: Hallazgos y Planes de Acción -->
            <input 
                type="radio" 
                name="audit_tabs" 
                role="tab" 
                class="tab" 
                aria-label="Hallazgos y Planes de Acción"
            />
            <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
                <div class="space-y-4">
                    <div>
                        <h2 class="text-xl font-semibold">Tablero Kanban de Planes de Acción</h2>
                        <p class="text-sm text-base-content/70">Seguimiento de tareas correctivas generadas por hallazgos</p>
                    </div>
                    <FindingsKanban :findings="findingsData" />
                </div>
            </div>
        </div>

        <!-- Modals -->
        <AuditModal :onRefresh="tablaRef?.fetchData" />
        <FindingModal :onRefresh="loadFindings" />
    </div>
</template>
