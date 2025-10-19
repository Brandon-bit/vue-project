import type { LessonFormData, PeriodClosure } from '../types/evaluationTypes'

// Mock service - replace with actual API calls
export const evaluationService = {
    async createLesson(data: LessonFormData) {
        console.log('Creating Lesson:', data)
        return { success: true, data: { id: Date.now(), ...data, active: true, deleted: false } }
    },

    async updateLesson(id: number, data: LessonFormData) {
        console.log('Updating Lesson:', id, data)
        return { success: true, data: { id, ...data } }
    },

    async deleteLesson(id: number) {
        console.log('Deleting Lesson:', id)
        return { success: true }
    },

    async generatePeriodClosureReport(data: PeriodClosure) {
        console.log('Generating Period Closure Report:', data)
        return { success: true, reportUrl: '/reports/period-closure.pdf' }
    }
}
