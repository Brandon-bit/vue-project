import { diagnosticService } from '../services/diagnosticService'
import type { SWOTFormData, PESTELFormData, RiskFormData } from '../types/diagnosticTypes'

export const useDiagnosticActions = () => {
    const createSWOT = async (data: SWOTFormData) => {
        try {
            const response = await diagnosticService.createSWOT(data)
            return {
                message: 'Elemento FODA creado exitosamente',
                status: 'success' as const
            }
        } catch (error) {
            return {
                message: 'Error al crear elemento FODA',
                status: 'error' as const
            }
        }
    }

    const updateSWOT = async (id: number, data: SWOTFormData) => {
        try {
            const response = await diagnosticService.updateSWOT(id, data)
            return {
                message: 'Elemento FODA actualizado exitosamente',
                status: 'success' as const
            }
        } catch (error) {
            return {
                message: 'Error al actualizar elemento FODA',
                status: 'error' as const
            }
        }
    }

    const deleteSWOT = async (id: number) => {
        try {
            const response = await diagnosticService.deleteSWOT(id)
            return {
                message: 'Elemento FODA eliminado exitosamente',
                status: 'success' as const
            }
        } catch (error) {
            return {
                message: 'Error al eliminar elemento FODA',
                status: 'error' as const
            }
        }
    }

    const createPESTEL = async (data: PESTELFormData) => {
        try {
            const response = await diagnosticService.createPESTEL(data)
            return {
                message: 'Factor PESTEL creado exitosamente',
                status: 'success' as const
            }
        } catch (error) {
            return {
                message: 'Error al crear factor PESTEL',
                status: 'error' as const
            }
        }
    }

    const updatePESTEL = async (id: number, data: PESTELFormData) => {
        try {
            const response = await diagnosticService.updatePESTEL(id, data)
            return {
                message: 'Factor PESTEL actualizado exitosamente',
                status: 'success' as const
            }
        } catch (error) {
            return {
                message: 'Error al actualizar factor PESTEL',
                status: 'error' as const
            }
        }
    }

    const deletePESTEL = async (id: number) => {
        try {
            const response = await diagnosticService.deletePESTEL(id)
            return {
                message: 'Factor PESTEL eliminado exitosamente',
                status: 'success' as const
            }
        } catch (error) {
            return {
                message: 'Error al eliminar factor PESTEL',
                status: 'error' as const
            }
        }
    }

    const createRisk = async (data: RiskFormData) => {
        try {
            const response = await diagnosticService.createRisk(data)
            return {
                message: 'Riesgo creado exitosamente',
                status: 'success' as const
            }
        } catch (error) {
            return {
                message: 'Error al crear riesgo',
                status: 'error' as const
            }
        }
    }

    const updateRisk = async (id: number, data: RiskFormData) => {
        try {
            const response = await diagnosticService.updateRisk(id, data)
            return {
                message: 'Riesgo actualizado exitosamente',
                status: 'success' as const
            }
        } catch (error) {
            return {
                message: 'Error al actualizar riesgo',
                status: 'error' as const
            }
        }
    }

    const deleteRisk = async (id: number) => {
        try {
            const response = await diagnosticService.deleteRisk(id)
            return {
                message: 'Riesgo eliminado exitosamente',
                status: 'success' as const
            }
        } catch (error) {
            return {
                message: 'Error al eliminar riesgo',
                status: 'error' as const
            }
        }
    }

    return {
        createSWOT,
        updateSWOT,
        deleteSWOT,
        createPESTEL,
        updatePESTEL,
        deletePESTEL,
        createRisk,
        updateRisk,
        deleteRisk
    }
}
