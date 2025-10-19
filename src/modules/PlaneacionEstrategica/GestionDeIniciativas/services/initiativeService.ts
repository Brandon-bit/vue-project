import type { InitiativeFormData, ProjectFormData } from '../types/initiativeTypes'

// Mock service - replace with actual API calls
export const initiativeService = {
    // Initiatives
    async createInitiative(data: InitiativeFormData) {
        console.log('Creating Initiative:', data)
        return { success: true, data: { id: Date.now(), ...data, progress: 0, converted: false } }
    },

    async updateInitiative(id: number, data: InitiativeFormData) {
        console.log('Updating Initiative:', id, data)
        return { success: true, data: { id, ...data } }
    },

    async deleteInitiative(id: number) {
        console.log('Deleting Initiative:', id)
        return { success: true }
    },

    // Convert to Project
    async convertToProject(initiativeId: number, data: ProjectFormData) {
        console.log('Converting Initiative to Project:', initiativeId, data)
        return { success: true, data: { id: Date.now(), ...data } }
    }
}
