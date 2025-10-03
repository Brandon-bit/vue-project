import axiosExampleInstance from '@/api/axiosExampleInstance'
import axiosExampleInstanceTwo from '@/api/axiosExampleInstanceTwo'
import {
    Warehouse,
    Supplier,
    InventoryEntry,
    InventoryEntryRequestPayload
} from '@inventario/Operacion/EntradasDeInventario/types/inventoryEntriesTypes'

export const getInventoryEntriesService = async (
    page: number,
    pageSize: number
): Promise<InventoryEntry[]> => {
    console.log(page, pageSize)
    const response = await axiosExampleInstance.get('/entradasDeInventario')
    return response.data
}

export const getInventoryEntyByIdService = async (): Promise<InventoryEntry> => {
    const response = await axiosExampleInstance.get('/entradaDeInventarioId')
    return response.data
}
export const getWarehousesService = async (): Promise<Warehouse[]> => {
    const response = await axiosExampleInstance.get('/almacenes')
    return response.data
}

export const getSuppliersService = async (): Promise<Supplier[]> => {
    const response = await axiosExampleInstance.get('/proveedores1')
    return response.data
}

export const getProductsBySearchService = async (
    query: string,
    limit: number = 10,
    skip: number = 1
): Promise<any[]> => {
    const response = await axiosExampleInstanceTwo.get(
        `/products/search?q=${query}&limit=${limit}&skip=${skip * limit - limit}`
    )
    return response.data
}

export const createInventoryEntryService = async (
    data: InventoryEntryRequestPayload
): Promise<any> => {
    console.log(data)
    // const response = await axiosExampleInstance.post('/inventoryAudit', data)
    // return response.data
}

export const updateInventoryEntryService = async (
    data: InventoryEntryRequestPayload,
    id: number | undefined
): Promise<any> => {
    console.log(data)
    console.log(id)
    // const response = await axiosExampleInstance.put(`/inventoryAudit/${data.id}`, data)
    // return response.data
}

// export const deleteInventoryEntryService = async (
//     data: InventoryEntryDeletePayload,
//     id: number | undefined
// ): Promise<any> => {
//     console.log(data)
//     console.log(id)
//     // const response = await axiosExampleInstance.put(`/inventoryAudit/${data.id}`, data)
//     // return response.data
// }
