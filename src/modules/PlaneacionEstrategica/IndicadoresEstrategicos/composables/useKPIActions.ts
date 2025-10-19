import { kpiService } from '../services/kpiService'
import type { KPIFormData } from '../types/kpiTypes'

export const useKPIActions = () => {
    const createKPI = async (data: KPIFormData) => {
        try {
            await kpiService.createKPI(data)
            return {
                message: 'Indicador creado exitosamente',
                status: 'success' as const
            }
        } catch (error) {
            return {
                message: 'Error al crear indicador',
                status: 'error' as const
            }
        }
    }

    const updateKPI = async (id: number, data: KPIFormData) => {
        try {
            await kpiService.updateKPI(id, data)
            return {
                message: 'Indicador actualizado exitosamente',
                status: 'success' as const
            }
        } catch (error) {
            return {
                message: 'Error al actualizar indicador',
                status: 'error' as const
            }
        }
    }

    const deleteKPI = async (id: number) => {
        try {
            await kpiService.deleteKPI(id)
            return {
                message: 'Indicador eliminado exitosamente',
                status: 'success' as const
            }
        } catch (error) {
            return {
                message: 'Error al eliminar indicador',
                status: 'error' as const
            }
        }
    }

    return {
        createKPI,
        updateKPI,
        deleteKPI
    }
}
