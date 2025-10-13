import {
    getInventoryAuditSummaryService,
    getInventoryAuditRecordsService,
    getAuditorsService,
    getProductsBySearchService,
    createInventoryAuditService,
    getInventoryAuditByIdService,
    updateInventoryAuditService
} from '@inventario/Operacion/AuditoriaDeInventarios/services/inventoryAuditService'
import {
    mapInventoryAuditSummary,
    mapInventoryAuditRecords,
    mapInventoryAuditors,
    mapInventoryAuditRequest,
    mapProduct,
    mapProductDTO
} from '@inventario/Operacion/AuditoriaDeInventarios/composables/mappingInventoryAuditData'
import useInventoryAuditStore from '@inventario/Operacion/AuditoriaDeInventarios/store/useInventoryAuditStore'
import {
    InventoryAuditorDTO,
    InventoryAuditDTO,
    InventoryAuditRequest
} from '@inventario/Operacion/AuditoriaDeInventarios/types/inventoryAuditTypes'

export const useInventoryAuditActions = () => {
    const inventoryAuditStore = useInventoryAuditStore()
    const getInventoryAuditSummary = async () => {
        const response = await getInventoryAuditSummaryService()
        inventoryAuditStore.summary = response.map(mapInventoryAuditSummary)
    }

    const getInventoryAuditRecords = async (
        page: number,
        pageSize: number
    ): Promise<{ items: InventoryAuditDTO[]; total: number }> => {
        const response = await getInventoryAuditRecordsService(page, pageSize)
        return {
            items: response.map(mapInventoryAuditRecords),
            total: 5
        }
    }

    const getInventoryAuditById = async (): Promise<any> => {
        const response = await getInventoryAuditByIdService()
        const { id, fecha, auditorId, estadoId, notaGeneral, productos } = response
        inventoryAuditStore.setData({
            id: id,
            date: fecha,
            auditorId: auditorId,
            stateId: estadoId,
            generalNote: notaGeneral
        })
        productos?.forEach((product) => {
            const result = mapProductDTO(product)
            inventoryAuditStore.addProduct(result)
        })
    }

    const getProductsBySearch = async (
        searchWord: string,
        limit: number,
        pageNumber: number
    ): Promise<any> => {
        const response = await getProductsBySearchService(searchWord, limit, pageNumber)
        return response
    }

    const getAuditors = async (): Promise<InventoryAuditorDTO[]> => {
        const response = await getAuditorsService()
        return response.map(mapInventoryAuditors)
    }

    const createInventoryAudit = async (
        data: InventoryAuditRequest
    ): Promise<{ message: string; status: string; data: any }> => {
        console.log(data)
        const model = mapInventoryAuditRequest(data)
        model.productos = inventoryAuditStore.addedProducts.map(mapProduct)
        const response = await createInventoryAuditService(model)
        // return {
        //     message: response.message,
        //     status: response.success ? 'success' : 'error',
        //     data: response.data
        // }
        return {
            message: 'success',
            status: 'success',
            data: data
        }
    }

    const updateInventoryAudit = async (
        data: InventoryAuditRequest
    ): Promise<{ message: string; status: string; data: any }> => {
        console.log(data)

        const model = mapInventoryAuditRequest(data)
        model.productos = inventoryAuditStore.addedProducts.map(mapProduct)
        const id = inventoryAuditStore.selectedInventoryAudit?.id
        const response = await updateInventoryAuditService(model, id!)
        // return {
        //     message: response.message,
        //     status: response.success ? 'success' : 'error',
        //     data: response.data
        // }
        return {
            message: 'success',
            status: 'success',
            data: data
        }
    }

    return {
        getInventoryAuditSummary,
        getInventoryAuditRecords,
        getInventoryAuditById,
        getAuditors,
        getProductsBySearch,
        createInventoryAudit,
        updateInventoryAudit
    }
}
