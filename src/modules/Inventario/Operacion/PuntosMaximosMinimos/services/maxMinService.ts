import axiosExampleInstance from '@/api/axiosExampleInstance'
import {
    InventoryThreshold,
    InventoryForm
} from '@inventario/Operacion/PuntosMaximosMinimos/types/maxMinTypes'

export const getMaxMinPointsService = async (
    page: number,
    pageSize: number
): Promise<InventoryThreshold[]> => {
    console.log(page)
    console.log(pageSize)
    const response = await axiosExampleInstance.get('/puntosMaximosMinimos')
    return response.data
}

export const createMaxMinPointsService = async (data: InventoryForm): Promise<any> => {
    console.log(data)
    // const response = await axiosExampleInstance.post('/puntosMaximosMinimos', data)
    // return response.data
}

export const updateMaxMinService = async (data: InventoryForm): Promise<any> => {
    console.log(data)
    return
}

export const deleteMaxMinService = async (id: number): Promise<any> => {
    console.log(id)
    // const response = await axiosExampleInstance.delete(`/puntosMaximosMinimos/${id}`)
    // return response.data
}
