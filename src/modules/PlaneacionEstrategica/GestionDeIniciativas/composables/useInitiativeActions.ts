import { initiativeService } from '../services/initiativeService'
import type { InitiativeFormData, ProjectFormData } from '../types/initiativeTypes'

export const useInitiativeActions = () => {
    const createInitiative = async (data: InitiativeFormData) => {
        try {
            await initiativeService.createInitiative(data)
            return {
                message: 'Iniciativa creada exitosamente',
                status: 'success' as const
            }
        } catch (error) {
            return {
                message: 'Error al crear iniciativa',
                status: 'error' as const
            }
        }
    }

    const updateInitiative = async (id: number, data: InitiativeFormData) => {
        try {
            await initiativeService.updateInitiative(id, data)
            return {
                message: 'Iniciativa actualizada exitosamente',
                status: 'success' as const
            }
        } catch (error) {
            return {
                message: 'Error al actualizar iniciativa',
                status: 'error' as const
            }
        }
    }

    const deleteInitiative = async (id: number) => {
        try {
            await initiativeService.deleteInitiative(id)
            return {
                message: 'Iniciativa eliminada exitosamente',
                status: 'success' as const
            }
        } catch (error) {
            return {
                message: 'Error al eliminar iniciativa',
                status: 'error' as const
            }
        }
    }

    const convertToProject = async (initiativeId: number, data: ProjectFormData) => {
        try {
            await initiativeService.convertToProject(initiativeId, data)
            return {
                message: 'Proyecto creado exitosamente a partir de la iniciativa',
                status: 'success' as const
            }
        } catch (error) {
            return {
                message: 'Error al convertir iniciativa en proyecto',
                status: 'error' as const
            }
        }
    }

    return {
        createInitiative,
        updateInitiative,
        deleteInitiative,
        convertToProject
    }
}
