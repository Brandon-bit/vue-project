import { 
    getAuditsService, 
    createAuditService, 
    updateAuditService, 
    deleteAuditService,
    getFindingsService,
    createFindingService,
    updateFindingService,
    deleteFindingService
} from '../services/auditService'
import useAuditStore from '../store/auditStore'
import type { AuditFormType, FindingFormType } from '../types/auditTypes'

export const useAuditActions = () => {
    const auditStore = useAuditStore()

    // Acciones de Auditorías
    const getAudits = async (page: number, pageSize: number) => {
        const params = { page, pageSize }
        const response = await getAuditsService(params)
        return {
            items: response.data || [],
            total: response.data?.length || 0
        }
    }

    const createAudit = async (formData: AuditFormType) => {
        try {
            const response = await createAuditService(formData)
            return {
                message: response.message || 'Auditoría creada correctamente',
                status: 'success' as const
            }
        } catch (error: any) {
            return {
                message: error.response?.data?.message || 'Error al crear la auditoría',
                status: 'error' as const
            }
        }
    }

    const editAudit = async (formData: AuditFormType) => {
        try {
            if (!auditStore.selectedAudit.id) {
                throw new Error('No hay auditoría seleccionada')
            }
            const response = await updateAuditService(auditStore.selectedAudit.id, formData)
            return {
                message: response.message || 'Auditoría actualizada correctamente',
                status: 'success' as const
            }
        } catch (error: any) {
            return {
                message: error.response?.data?.message || 'Error al actualizar la auditoría',
                status: 'error' as const
            }
        }
    }

    const deleteAudit = async () => {
        try {
            if (!auditStore.selectedAudit.id) {
                throw new Error('No hay auditoría seleccionada')
            }
            const response = await deleteAuditService(auditStore.selectedAudit.id, true)
            return {
                message: response.message || 'Auditoría eliminada correctamente',
                status: 'success' as const
            }
        } catch (error: any) {
            return {
                message: error.response?.data?.message || 'Error al eliminar la auditoría',
                status: 'error' as const
            }
        }
    }

    // Acciones de Hallazgos
    const getFindings = async (params?: any) => {
        const response = await getFindingsService(params)
        return response
    }

    const createFinding = async (formData: FindingFormType) => {
        try {
            const response = await createFindingService(formData)
            return {
                message: response.message || 'Hallazgo registrado correctamente',
                status: 'success' as const
            }
        } catch (error: any) {
            return {
                message: error.response?.data?.message || 'Error al registrar el hallazgo',
                status: 'error' as const
            }
        }
    }

    const editFinding = async (formData: FindingFormType) => {
        try {
            if (!auditStore.selectedFinding.id) {
                throw new Error('No hay hallazgo seleccionado')
            }
            const response = await updateFindingService(auditStore.selectedFinding.id, formData)
            return {
                message: response.message || 'Hallazgo actualizado correctamente',
                status: 'success' as const
            }
        } catch (error: any) {
            return {
                message: error.response?.data?.message || 'Error al actualizar el hallazgo',
                status: 'error' as const
            }
        }
    }

    const deleteFinding = async () => {
        try {
            if (!auditStore.selectedFinding.id) {
                throw new Error('No hay hallazgo seleccionado')
            }
            const response = await deleteFindingService(auditStore.selectedFinding.id, true)
            return {
                message: response.message || 'Hallazgo eliminado correctamente',
                status: 'success' as const
            }
        } catch (error: any) {
            return {
                message: error.response?.data?.message || 'Error al eliminar el hallazgo',
                status: 'error' as const
            }
        }
    }

    return {
        getAudits,
        createAudit,
        editAudit,
        deleteAudit,
        getFindings,
        createFinding,
        editFinding,
        deleteFinding
    }
}
