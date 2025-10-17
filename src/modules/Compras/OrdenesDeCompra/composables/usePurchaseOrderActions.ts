import type { PurchaseOrderType, ApprovedRequestType, PurchaseOrderFormType, OrderStatsType } from '@/modules/Compras/OrdenesDeCompra/types/purchaseOrderTypes'

// Mock data
const mockOrders: PurchaseOrderType[] = [
    {
        id: 1,
        folio: 'OC-2024-001',
        supplier: 'Distribuidora Nacional S.A.',
        date: '2024-01-16',
        total: 45000,
        status: 'Emitida',
        items: 3
    },
    {
        id: 2,
        folio: 'OC-2024-002',
        supplier: 'Tech Solutions México',
        date: '2024-01-15',
        total: 125000,
        status: 'Confirmada',
        items: 2
    },
    {
        id: 3,
        folio: 'OC-2024-003',
        supplier: 'Servicios Industriales',
        date: '2024-01-14',
        total: 35000,
        status: 'Entregada',
        items: 4
    },
    {
        id: 4,
        folio: 'OC-2024-004',
        supplier: 'Distribuidora Nacional S.A.',
        date: '2024-01-10',
        total: 18500,
        status: 'Cerrada',
        items: 1
    }
]

const mockApprovedRequests: ApprovedRequestType[] = [
    {
        id: 1,
        folio: 'SC-2024-002',
        requester: 'María García',
        area: 'Tecnología',
        total: 125000,
        items: 2
    },
    {
        id: 2,
        folio: 'SC-2024-005',
        requester: 'Pedro Martínez',
        area: 'Marketing',
        total: 35000,
        items: 3
    }
]

export const usePurchaseOrderActions = () => {
    const getPurchaseOrders = async (): Promise<PurchaseOrderType[]> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        return mockOrders
    }

    const getApprovedRequests = async (): Promise<ApprovedRequestType[]> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 300))
        
        return mockApprovedRequests
    }

    const getOrderStats = async (): Promise<OrderStatsType> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 300))
        
        const emitidas = mockOrders.filter(o => o.status === 'Emitida').length
        const confirmadas = mockOrders.filter(o => o.status === 'Confirmada').length
        const entregadas = mockOrders.filter(o => o.status === 'Entregada').length
        const totalComprometido = mockOrders
            .filter(o => o.status !== 'Cerrada')
            .reduce((sum, o) => sum + o.total, 0)
        
        return {
            emitidas,
            confirmadas,
            entregadas,
            totalComprometido
        }
    }

    const createPurchaseOrder = async (data: PurchaseOrderFormType): Promise<{ message: string; status: string }> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        console.log('Creating purchase order:', data)
        
        return {
            message: 'Orden de compra generada correctamente',
            status: 'success'
        }
    }

    const sendPurchaseOrder = async (orderId: number): Promise<{ message: string; status: string }> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        console.log('Sending purchase order:', orderId)
        
        return {
            message: 'Orden de compra enviada al proveedor',
            status: 'success'
        }
    }

    const closePurchaseOrder = async (orderId: number): Promise<{ message: string; status: string }> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        console.log('Closing purchase order:', orderId)
        
        return {
            message: 'Orden de compra cerrada correctamente',
            status: 'success'
        }
    }

    return {
        getPurchaseOrders,
        getApprovedRequests,
        getOrderStats,
        createPurchaseOrder,
        sendPurchaseOrder,
        closePurchaseOrder
    }
}
