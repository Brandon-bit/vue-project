import { defineStore } from 'pinia'
import type { Audit, Finding, ChecklistItem } from '../types/auditTypes'

const initialAudit: Audit = {
    id: 0,
    nombre: '',
    tipo: 'Fiscal',
    area: '',
    auditor: '',
    fechaInicio: '',
    fechaFin: '',
    estado: 'Planificada',
    hallazgos: 0,
    progreso: 0,
    objetivo: '',
    activo: true,
    eliminado: false
}

const initialFinding: Finding = {
    id: 0,
    auditoriaId: 0,
    auditoriaNombre: '',
    severidad: 'Media',
    descripcion: '',
    responsable: '',
    fechaLimite: '',
    estado: 'Pendiente',
    activo: true,
    eliminado: false
}

const useAuditStore = defineStore('audit-store', {
    state: () => ({
        selectedAudit: initialAudit as Audit,
        selectedFinding: initialFinding as Finding,
        selectedChecklistItem: null as ChecklistItem | null,
        auditModalId: 'audit-modal',
        findingModalId: 'finding-modal',
        activeTab: 'audits' as 'audits' | 'execution' | 'findings'
    }),
    actions: {
        setAuditData(data: Audit = initialAudit) {
            this.selectedAudit = data
        },
        setFindingData(data: Finding = initialFinding) {
            this.selectedFinding = data
        },
        setChecklistItem(item: ChecklistItem | null) {
            this.selectedChecklistItem = item
        },
        setActiveTab(tab: 'audits' | 'execution' | 'findings') {
            this.activeTab = tab
        }
    }
})

export default useAuditStore
