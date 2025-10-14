import axiosExampleInstance from '@/api/axiosExampleInstance'
import axiosExampleInstanceTwo from '@/api/axiosExampleInstanceTwo'
import {
    OrderManagementRecordsType,
    SuppliersType
} from '@inventario/Operacion/GestionDePedidos/types/orderManagementTypes'

export const getOrderManagementRecordsService = async (
    page: number,
    pageSize: number
): Promise<OrderManagementRecordsType[]> => {
    const response = await axiosExampleInstance.get('/gestionPedido')
    return response.data
}

export const getSuppliersService = async (): Promise<SuppliersType[]> => {
    const response = await axiosExampleInstance.get('/proveedores')
    return response.data
}

export const advanceStateService = async (id: number): Promise<any> => {
    const response = await axiosExampleInstance.put(`/proveedores/${id}`)
    return response
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
