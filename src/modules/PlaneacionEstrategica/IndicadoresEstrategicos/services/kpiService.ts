import type { KPIFormData } from '../types/kpiTypes'

// Mock service - replace with actual API calls
export const kpiService = {
    async createKPI(data: KPIFormData) {
        console.log('Creating KPI:', data)
        return { success: true, data: { id: Date.now(), ...data, currentValue: 0, trend: 'stable', status: 'meeting' } }
    },

    async updateKPI(id: number, data: KPIFormData) {
        console.log('Updating KPI:', id, data)
        return { success: true, data: { id, ...data } }
    },

    async deleteKPI(id: number) {
        console.log('Deleting KPI:', id)
        return { success: true }
    }
}
