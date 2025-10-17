import type { 
    PurchaseRequestType, 
    PurchaseRequestStatsType,
    PurchaseRequestFormType,
    CatalogProductType,
    BudgetValidationType
} from '@/modules/Compras/SolicitudesDeCompra/types/purchaseRequestTypes'

export const usePurchaseRequestActions = () => {
    const getPurchaseRequests = async (): Promise<PurchaseRequestType[]> => {
        await new Promise(resolve => setTimeout(resolve, 500))
        
        return [
            {
                id: 1,
                folio: "SC-2024-001",
                solicitante: "Juan Pérez",
                area: "Marketing",
                fecha: "2024-01-15",
                total: 35000,
                estatus: "Pendiente",
                items: 3,
                justificacion: "Necesitamos material promocional para la campaña del Q1",
                presupuestoDisponible: 45000
            },
            {
                id: 2,
                folio: "SC-2024-002",
                solicitante: "María García",
                area: "Tecnología",
                fecha: "2024-01-14",
                total: 125000,
                estatus: "Aprobada",
                items: 2,
                justificacion: "Renovación de equipos de cómputo para el equipo de desarrollo",
                aprobador: "Carlos Mendoza",
                fechaAprobacion: "2024-01-16",
                presupuestoDisponible: 200000
            },
            {
                id: 3,
                folio: "SC-2024-003",
                solicitante: "Carlos Rodríguez",
                area: "Operaciones",
                fecha: "2024-01-13",
                total: 8500,
                estatus: "Rechazada",
                items: 5,
                justificacion: "Compra de herramientas para mantenimiento",
                aprobador: "Ana López",
                fechaAprobacion: "2024-01-14",
                comentarios: "Presupuesto insuficiente para este periodo",
                presupuestoDisponible: 5000
            },
            {
                id: 4,
                folio: "SC-2024-004",
                solicitante: "Laura Martínez",
                area: "Administración",
                fecha: "2024-01-16",
                total: 12000,
                estatus: "En Revisión",
                items: 4,
                justificacion: "Papelería y suministros de oficina para el trimestre",
                presupuestoDisponible: 25000
            }
        ]
    }

    const getPurchaseRequestStats = async (): Promise<PurchaseRequestStatsType> => {
        await new Promise(resolve => setTimeout(resolve, 300))
        
        return {
            total: 4,
            pendientes: 1,
            aprobadas: 1,
            rechazadas: 1
        }
    }

    const getCatalogProducts = async (): Promise<CatalogProductType[]> => {
        await new Promise(resolve => setTimeout(resolve, 400))
        
        return [
            { id: 1, codigo: "MAT-001", nombre: "Resma de Papel Bond", precio: 85.00, categoria: "Papelería", disponible: true },
            { id: 2, codigo: "TEC-015", nombre: "Laptop Dell Latitude 5420", precio: 18500.00, categoria: "Tecnología", disponible: true },
            { id: 3, codigo: "SRV-008", nombre: "Mantenimiento Industrial", precio: 3500.00, categoria: "Servicios", disponible: true },
            { id: 4, codigo: "MAT-002", nombre: "Tóner HP LaserJet", precio: 1200.00, categoria: "Insumos", disponible: true },
            { id: 5, codigo: "TEC-016", nombre: "Monitor LG 27 pulgadas", precio: 4500.00, categoria: "Tecnología", disponible: true },
            { id: 6, codigo: "MAT-003", nombre: "Carpetas de Archivo", precio: 45.00, categoria: "Papelería", disponible: true },
            { id: 7, codigo: "SRV-009", nombre: "Limpieza de Oficinas", precio: 2500.00, categoria: "Servicios", disponible: true },
            { id: 8, codigo: "TEC-017", nombre: "Mouse Inalámbrico Logitech", precio: 350.00, categoria: "Tecnología", disponible: true }
        ]
    }

    const validateBudget = async (area: string, monto: number): Promise<BudgetValidationType> => {
        await new Promise(resolve => setTimeout(resolve, 300))
        
        // Simulación de presupuestos por área
        const presupuestos: Record<string, number> = {
            'marketing': 45000,
            'tecnologia': 200000,
            'operaciones': 80000,
            'administracion': 25000
        }
        
        const presupuestoDisponible = presupuestos[area.toLowerCase()] || 50000
        const saldoRestante = presupuestoDisponible - monto
        
        return {
            presupuestoDisponible,
            montoSolicitud: monto,
            saldoRestante,
            suficiente: saldoRestante >= 0
        }
    }

    const createPurchaseRequest = async (requestData: PurchaseRequestFormType) => {
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        console.log('Creando solicitud de compra:', requestData)
        
        return {
            status: 'success' as const,
            message: 'Solicitud de compra creada exitosamente'
        }
    }

    const approvePurchaseRequest = async (id: number, comentarios?: string) => {
        await new Promise(resolve => setTimeout(resolve, 800))
        
        console.log('Aprobando solicitud:', id, comentarios)
        
        return {
            status: 'success' as const,
            message: 'Solicitud aprobada exitosamente'
        }
    }

    const rejectPurchaseRequest = async (id: number, comentarios: string) => {
        await new Promise(resolve => setTimeout(resolve, 800))
        
        console.log('Rechazando solicitud:', id, comentarios)
        
        return {
            status: 'success' as const,
            message: 'Solicitud rechazada'
        }
    }

    const deletePurchaseRequest = async (id: number) => {
        await new Promise(resolve => setTimeout(resolve, 600))
        
        console.log('Eliminando solicitud:', id)
        
        return {
            status: 'success' as const,
            message: 'Solicitud eliminada exitosamente'
        }
    }

    return {
        getPurchaseRequests,
        getPurchaseRequestStats,
        getCatalogProducts,
        validateBudget,
        createPurchaseRequest,
        approvePurchaseRequest,
        rejectPurchaseRequest,
        deletePurchaseRequest
    }
}
