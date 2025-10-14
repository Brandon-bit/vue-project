import {
    getOrderManagementRecordsService,
    getSuppliersService,
    advanceStateService
} from '@inventario/Operacion/GestionDePedidos/services/orderManagementService'
import {
    OrderManagementRecordsType,
    OrderManagementRecordsTranslatedType,
    SuppliersTransalatedType,
    SuppliersType
} from '@inventario/Operacion/GestionDePedidos/types/orderManagementTypes'

import {
    mapOrderManagementRecords,
    mapInventorySuppliers
} from '@inventario/Operacion/GestionDePedidos/composables/mappingOrderManagement'

import useOrderManagementStore from '@inventario/Operacion/GestionDePedidos/store/useOrderManagementStore'

export const useOrderManagementActions = () => {
    const orderManagementStore = useOrderManagementStore()

    const getOrderManagementRecords = async (
        page: number,
        pageSize: number
    ): Promise<{ items: OrderManagementRecordsTranslatedType[]; total: number }> => {
        const response = await getOrderManagementRecordsService(page, pageSize)
        return {
            items: response.map(mapOrderManagementRecords),
            total: 5
        }
    }

    const getSuppliers = async (): Promise<SuppliersTransalatedType[]> => {
        const response = await getSuppliersService()
        return response.map(mapInventorySuppliers)
    }

    const advanceState = async () => {
        const id = orderManagementStore.selectedOrderManagement.id ?? 0
        const response = await advanceStateService(id)
        return {
            message: response.message,
            status: response.success ? 'success' : 'error',
            data: response.data
        }
    }
    // const createInventoryAudit = async (
    //     data: InventoryAuditRecordsTranslatedType
    // ): Promise<{ message: string; status: string; data: any }> => {
    //     const model = mapInventoryAuditRecordToBackend(data)
    //     model.productoId = inventoryAuditStore.selectedInventoryAudit.productId
    //     const response = await createInventoryAuditService(model)
    //     return {
    //         message: response.message,
    //         status: response.success ? 'success' : 'error',
    //         data: response.data
    //     }
    // }

    // const updateInventoryAudit = async (
    //     data: InventoryAuditRecordsTranslatedType
    // ): Promise<{ message: string; status: string; data: any }> => {
    //     const model = mapInventoryAuditRecordToBackend(data)
    //     model.id = inventoryAuditStore.selectedInventoryAudit?.id
    //     model.productoId = inventoryAuditStore.selectedInventoryAudit.productId
    //     const response = await updateInventoryAuditService(model)
    //     return {
    //         message: response.message,
    //         status: response.success ? 'success' : 'error',
    //         data: response.data
    //     }
    // }

    // const getProductsBySearch = async (
    //     searchWord: string,
    //     limit: number,
    //     pageNumber: number
    // ): Promise<any> => {
    //     const response = await getProductsBySearchService(searchWord, limit, pageNumber)
    //     return response
    // }

    return {
        getOrderManagementRecords,
        getSuppliers,
        advanceState
        // getProductsBySearch,
        // createInventoryAudit,
        // updateInventoryAudit
    }
}
