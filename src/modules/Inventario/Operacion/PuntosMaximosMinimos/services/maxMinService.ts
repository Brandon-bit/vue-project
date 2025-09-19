import axiosExampleInstance from '@/api/axiosExampleInstance'
import {
    InventoryThresholdsType,
    InventoryFormResponseType
} from '@inventario/Operacion/PuntosMaximosMinimos/types/maxMinTypes'

export const getMaxMinPointsService = async (
    page: number,
    pageSize: number
): Promise<InventoryThresholdsType[]> => {
    console.log(page)
    console.log(pageSize)
    const response = await axiosExampleInstance.get('/puntosMaximosMinimos')
    return response.data
}

export const createMaxMinPointsService = async (data: InventoryFormResponseType): Promise<any> => {
    const response = await axiosExampleInstance.post('/puntosMaximosMinimos', data)
    return response.data
}

export const updateMaxMinService = async (data: InventoryFormResponseType): Promise<any> => {
    const response = await axiosExampleInstance.put(`/puntosMaximosMinimos/${data.id}`, data)
    return response.data
}

export const deleteMaxMinService = async (id: number): Promise<any> => {
    const response = await axiosExampleInstance.delete(`/puntosMaximosMinimos/${id}`)
    return response.data
}
