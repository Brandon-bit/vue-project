import { taskService } from '../services/taskService'
import type { TaskFormData } from '../types/taskTypes'

export const useTaskActions = () => {
    const createTask = async (data: TaskFormData) => {
        try {
            await taskService.createTask(data)
            return {
                message: 'Tarea creada exitosamente',
                status: 'success' as const
            }
        } catch (error) {
            return {
                message: 'Error al crear tarea',
                status: 'error' as const
            }
        }
    }

    const updateTask = async (id: number, data: TaskFormData) => {
        try {
            await taskService.updateTask(id, data)
            return {
                message: 'Tarea actualizada exitosamente',
                status: 'success' as const
            }
        } catch (error) {
            return {
                message: 'Error al actualizar tarea',
                status: 'error' as const
            }
        }
    }

    const deleteTask = async (id: number) => {
        try {
            await taskService.deleteTask(id)
            return {
                message: 'Tarea eliminada exitosamente',
                status: 'success' as const
            }
        } catch (error) {
            return {
                message: 'Error al eliminar tarea',
                status: 'error' as const
            }
        }
    }

    const updateTaskStatus = async (id: number, status: string) => {
        try {
            await taskService.updateTaskStatus(id, status)
            return {
                message: 'Estado actualizado exitosamente',
                status: 'success' as const
            }
        } catch (error) {
            return {
                message: 'Error al actualizar estado',
                status: 'error' as const
            }
        }
    }

    return {
        createTask,
        updateTask,
        deleteTask,
        updateTaskStatus
    }
}
