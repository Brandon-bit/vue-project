import type { TaskFormData } from '../types/taskTypes'

// Mock service - replace with actual API calls
export const taskService = {
    async createTask(data: TaskFormData) {
        console.log('Creating Task:', data)
        return { success: true, data: { id: Date.now(), ...data, status: 'pending' } }
    },

    async updateTask(id: number, data: TaskFormData) {
        console.log('Updating Task:', id, data)
        return { success: true, data: { id, ...data } }
    },

    async deleteTask(id: number) {
        console.log('Deleting Task:', id)
        return { success: true }
    },

    async updateTaskStatus(id: number, status: string) {
        console.log('Updating Task Status:', id, status)
        return { success: true }
    }
}
