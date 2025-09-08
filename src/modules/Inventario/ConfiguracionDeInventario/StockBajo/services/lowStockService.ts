import axiosExampleInstance from '@/api/axiosExampleInstance'

export const getLowStockService = async (): Promise<any[]> => {
    const response = await axiosExampleInstance.get('/stockBajo')
    return response.data
}

export const updateLowStockService = async (data: any): Promise<T> => {
    const response = await axiosExampleInstance.put('/stockBajo')
    return response.data
}

export const deleteLowStockExpirationService = async (id: string): Promise<T> => {
    const response = await axiosExampleInstance.delete(`/stockBajo/${id}`)
    return response.data
}
