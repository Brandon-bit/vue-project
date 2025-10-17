import type { SupplierEvaluationType, IncidentFormType, EvaluationStatsType } from '@/modules/Compras/EvaluacionDeProveedores/types/supplierEvaluationTypes'

// Mock data
const mockSuppliers: SupplierEvaluationType[] = [
    {
        id: 1,
        name: 'Tech Solutions México',
        category: 'Tecnología',
        totalScore: 4.6,
        quality: 4.8,
        deliveryTime: 4.5,
        price: 4.2,
        support: 4.9,
        completedOrders: 28,
        incidents: 2
    },
    {
        id: 2,
        name: 'Distribuidora Nacional S.A.',
        category: 'Materiales',
        totalScore: 4.3,
        quality: 4.5,
        deliveryTime: 4.2,
        price: 4.0,
        support: 4.5,
        completedOrders: 45,
        incidents: 5
    },
    {
        id: 3,
        name: 'Servicios Industriales',
        category: 'Servicios',
        totalScore: 4.7,
        quality: 4.9,
        deliveryTime: 4.6,
        price: 4.3,
        support: 5.0,
        completedOrders: 32,
        incidents: 1
    }
]

export const useSupplierEvaluationActions = () => {
    const getSuppliers = async (): Promise<SupplierEvaluationType[]> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        return mockSuppliers
    }

    const getEvaluationStats = async (): Promise<EvaluationStatsType> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 300))
        
        const totalOrders = mockSuppliers.reduce((sum, s) => sum + s.completedOrders, 0)
        const totalIncidents = mockSuppliers.reduce((sum, s) => sum + s.incidents, 0)
        const averageScore = mockSuppliers.reduce((sum, s) => sum + s.totalScore, 0) / mockSuppliers.length
        
        return {
            activeSuppliers: mockSuppliers.length,
            averageScore: parseFloat(averageScore.toFixed(1)),
            totalOrders,
            totalIncidents
        }
    }

    const registerIncident = async (data: IncidentFormType): Promise<{ message: string; status: string }> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        console.log('Registering incident:', data)
        
        return {
            message: 'Incidencia registrada correctamente. La calificación del proveedor se ha actualizado.',
            status: 'success'
        }
    }

    const generateComparativeReport = async (): Promise<{ message: string; status: string }> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        console.log('Generating comparative report...')
        
        return {
            message: 'Reporte comparativo generado correctamente',
            status: 'success'
        }
    }

    return {
        getSuppliers,
        getEvaluationStats,
        registerIncident,
        generateComparativeReport
    }
}
