import { evaluationService } from '../services/evaluationService'
import type { LessonFormData, PeriodClosure } from '../types/evaluationTypes'

export const useEvaluationActions = () => {
    const createLesson = async (data: LessonFormData) => {
        try {
            await evaluationService.createLesson(data)
            return {
                message: 'Lección registrada exitosamente',
                status: 'success' as const
            }
        } catch (error) {
            return {
                message: 'Error al registrar lección',
                status: 'error' as const
            }
        }
    }

    const updateLesson = async (id: number, data: LessonFormData) => {
        try {
            await evaluationService.updateLesson(id, data)
            return {
                message: 'Lección actualizada exitosamente',
                status: 'success' as const
            }
        } catch (error) {
            return {
                message: 'Error al actualizar lección',
                status: 'error' as const
            }
        }
    }

    const deleteLesson = async (id: number) => {
        try {
            await evaluationService.deleteLesson(id)
            return {
                message: 'Lección eliminada exitosamente',
                status: 'success' as const
            }
        } catch (error) {
            return {
                message: 'Error al eliminar lección',
                status: 'error' as const
            }
        }
    }

    const generatePeriodClosureReport = async (data: PeriodClosure) => {
        try {
            await evaluationService.generatePeriodClosureReport(data)
            return {
                message: 'Reporte de cierre generado exitosamente',
                status: 'success' as const
            }
        } catch (error) {
            return {
                message: 'Error al generar reporte',
                status: 'error' as const
            }
        }
    }

    return {
        createLesson,
        updateLesson,
        deleteLesson,
        generatePeriodClosureReport
    }
}
