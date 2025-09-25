import {
    getInventoryAuditSummaryService,
    getInventoryAuditRecordsService,
    getAuditorsService,
    createInventoryAuditService,
    updateInventoryAuditService,
    getProductsBySearchService
} from '@inventario/Operacion/AuditoriaDeInventarios/services/inventoryAuditService'
import {
    mapInventoryAuditSummaryItem,
    mapInventoryAuditRecords,
    mapInventoryAuditors,
    mapInventoryAuditRecordToBackend
} from '@inventario/Operacion/AuditoriaDeInventarios/composables/mappingInventoryAuditData'
import useInventoryAuditStore from '@inventario/Operacion/AuditoriaDeInventarios/store/useInventoryAuditStore'
import {
    InventoryAuditRecordsTranslatedType,
    InventoryAuditorsTransalatedType
} from '@inventario/Operacion/AuditoriaDeInventarios/types/inventoryAuditTypes'

export const useInventoryAuditActions = () => {
    const inventoryAuditStore = useInventoryAuditStore()
    const getInventoryAuditSummary = async () => {
        const response = await getInventoryAuditSummaryService()
        inventoryAuditStore.summary = response.map(mapInventoryAuditSummaryItem)
    }

    const getInventoryAuditRecords = async (
        page: number,
        pageSize: number
    ): Promise<{ items: InventoryAuditRecordsTranslatedType[]; total: number }> => {
        const response = await getInventoryAuditRecordsService(page, pageSize)
        return {
            items: response.map(mapInventoryAuditRecords),
            total: 5
        }
    }

    const getAuditors = async (): Promise<InventoryAuditorsTransalatedType[]> => {
        const response = await getAuditorsService()
        return response.map(mapInventoryAuditors)
    }

    const createInventoryAudit = async (
        data: InventoryAuditRecordsTranslatedType
    ): Promise<{ message: string; status: string; data: any }> => {
        const model = mapInventoryAuditRecordToBackend(data)
        model.productoId = inventoryAuditStore.selectedInventoryAudit.productId
        const response = await createInventoryAuditService(model)
        return {
            message: response.message,
            status: response.success ? 'success' : 'error',
            data: response.data
        }
    }

    const updateInventoryAudit = async (
        data: InventoryAuditRecordsTranslatedType
    ): Promise<{ message: string; status: string; data: any }> => {
        const model = mapInventoryAuditRecordToBackend(data)
        model.id = inventoryAuditStore.selectedInventoryAudit?.id
        // model.productoId = inventoryAuditStore.selectedInventoryAudit.productId
        const response = await updateInventoryAuditService(model)
        return {
            message: response.message,
            status: response.success ? 'success' : 'error',
            data: response.data
        }
    }

    const getProductsBySearch = async (
        searchWord: string,
        limit: number,
        pageNumber: number
    ): Promise<any> => {
        const response = await getProductsBySearchService(searchWord, limit, pageNumber)
        return response
    }

    return {
        getInventoryAuditSummary,
        getInventoryAuditRecords,
        getAuditors,
        getProductsBySearch,
        createInventoryAudit,
        updateInventoryAudit
    }
}
