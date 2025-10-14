import axiosExampleInstance from '@/api/axiosExampleInstance'
import axiosExampleInstanceTwo from '@/api/axiosExampleInstanceTwo'
import {
    Warehouse,
    Supplier,
    InventoryWithdrawal,
    InventoryWithdrawalRequestPayload
} from '@inventario/Operacion/SalidasDeInventario/types/inventoryWithdrawalsTypes'

export const getInventoryWithdrawalsService = async (
    page: number,
    pageSize: number
): Promise<InventoryWithdrawal[]> => {
    console.log(page, pageSize)
    const response = await axiosExampleInstance.get('/salidasDeInventario')
    return response.data
}

export const getInventoryWithdrawalByIdService = async (): Promise<InventoryWithdrawal> => {
    const response = await axiosExampleInstance.get('/salidasDeInventario')
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

export const createInventoryWithdrawalService = async (
    data: InventoryWithdrawalRequestPayload
): Promise<any> => {
    console.log(data)
}

export const updateInventoryWithdrawalService = async (
    data: InventoryWithdrawalRequestPayload,
    id: number | undefined
): Promise<any> => {
    console.log(data)
    console.log(id)
}
