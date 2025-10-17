import type { BudgetType, BudgetStatsType, BudgetFormType } from '@/modules/Compras/Presupuestos/types/budgetTypes'

export const useBudgetActions = () => {
    const getBudgets = async (): Promise<BudgetType[]> => {
        // Simulación de datos
        await new Promise(resolve => setTimeout(resolve, 500))
        
        const budgets = [
            {
                id: 1,
                area: "Tecnología",
                proyecto: "Infraestructura IT",
                periodo: "Q1 2024",
                asignado: 500000,
                gastado: 320000,
                comprometido: 100000,
                disponible: 80000,
                porcentajeGastado: 64,
                porcentajeComprometido: 20,
                porcentajeTotal: 84,
                excedido: false,
                fechaCreacion: "2024-01-15",
                fechaActualizacion: "2024-03-20"
            },
            {
                id: 2,
                area: "Marketing",
                proyecto: "Campaña Q1 2024",
                periodo: "Q1 2024",
                asignado: 250000,
                gastado: 180000,
                comprometido: 45000,
                disponible: 25000,
                porcentajeGastado: 72,
                porcentajeComprometido: 18,
                porcentajeTotal: 90,
                excedido: false,
                fechaCreacion: "2024-01-10",
                fechaActualizacion: "2024-03-18"
            },
            {
                id: 3,
                area: "Operaciones",
                proyecto: "Mantenimiento General",
                periodo: "Q1 2024",
                asignado: 150000,
                gastado: 45000,
                comprometido: 30000,
                disponible: 75000,
                porcentajeGastado: 30,
                porcentajeComprometido: 20,
                porcentajeTotal: 50,
                excedido: false,
                fechaCreacion: "2024-01-20",
                fechaActualizacion: "2024-03-15"
            },
            {
                id: 4,
                area: "Administración",
                proyecto: "Papelería y Suministros",
                periodo: "Q1 2024",
                asignado: 80000,
                gastado: 75000,
                comprometido: 8000,
                disponible: -3000,
                porcentajeGastado: 93.75,
                porcentajeComprometido: 10,
                porcentajeTotal: 103.75,
                excedido: true,
                fechaCreacion: "2024-01-05",
                fechaActualizacion: "2024-03-22"
            }
        ]
        
        return budgets
    }

    const getBudgetStats = async (): Promise<BudgetStatsType> => {
        await new Promise(resolve => setTimeout(resolve, 300))
        
        return {
            totalAsignado: 980000,
            totalGastado: 620000,
            totalComprometido: 183000,
            totalDisponible: 177000,
            porcentajeEjecutado: 63.3,
            porcentajeComprometido: 18.7,
            porcentajeDisponible: 18.1
        }
    }

    const createBudget = async (budgetData: BudgetFormType) => {
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        console.log('Creando presupuesto:', budgetData)
        
        return {
            status: 'success' as const,
            message: 'Presupuesto creado exitosamente'
        }
    }

    const updateBudget = async (id: number, budgetData: Partial<BudgetFormType>) => {
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        console.log('Actualizando presupuesto:', id, budgetData)
        
        return {
            status: 'success' as const,
            message: 'Presupuesto actualizado exitosamente'
        }
    }

    const deleteBudget = async (id: number) => {
        await new Promise(resolve => setTimeout(resolve, 800))
        
        console.log('Eliminando presupuesto:', id)
        
        return {
            status: 'success' as const,
            message: 'Presupuesto eliminado exitosamente'
        }
    }

    const generateReport = async (id: number) => {
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        console.log('Generando reporte para presupuesto:', id)
        
        return {
            status: 'success' as const,
            message: 'Reporte generado exitosamente'
        }
    }

    return {
        getBudgets,
        getBudgetStats,
        createBudget,
        updateBudget,
        deleteBudget,
        generateReport
    }
}
