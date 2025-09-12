import axiosExampleInstance from '@/api/axiosExampleInstance'
import { productType } from '../types/productTypes'

export const getProductsService = async (): Promise<productType[]> => {
    const response = await axiosExampleInstance.get('/products')
    return response.data
}
