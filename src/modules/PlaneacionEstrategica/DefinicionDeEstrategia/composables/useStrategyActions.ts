import { strategyService } from '../services/strategyService'
import type { IdentityFormData, ObjectiveFormData } from '../types/strategyTypes'

export const useStrategyActions = () => {
    const updateIdentity = async (data: IdentityFormData) => {
        try {
            await strategyService.updateIdentity(data)
            return {
                message: 'Identidad actualizada exitosamente',
                status: 'success' as const
            }
        } catch (error) {
            return {
                message: 'Error al actualizar identidad',
                status: 'error' as const
            }
        }
    }

    const createObjective = async (data: ObjectiveFormData) => {
        try {
            await strategyService.createObjective(data)
            return {
                message: 'Objetivo creado exitosamente',
                status: 'success' as const
            }
        } catch (error) {
            return {
                message: 'Error al crear objetivo',
                status: 'error' as const
            }
        }
    }

    const updateObjective = async (id: number, data: ObjectiveFormData) => {
        try {
            await strategyService.updateObjective(id, data)
            return {
                message: 'Objetivo actualizado exitosamente',
                status: 'success' as const
            }
        } catch (error) {
            return {
                message: 'Error al actualizar objetivo',
                status: 'error' as const
            }
        }
    }

    const deleteObjective = async (id: number) => {
        try {
            await strategyService.deleteObjective(id)
            return {
                message: 'Objetivo eliminado exitosamente',
                status: 'success' as const
            }
        } catch (error) {
            return {
                message: 'Error al eliminar objetivo',
                status: 'error' as const
            }
        }
    }

    return {
        updateIdentity,
        createObjective,
        updateObjective,
        deleteObjective
    }
}
