import axiosExampleInstance from '@/api/axiosExampleInstance'
import { AdminStockType } from '../types/AdminStockType'

export const getstockService = async (): Promise<AdminStockType[]> => {
    const response = await axiosExampleInstance.get('/administrarStock')
    return response.data
}