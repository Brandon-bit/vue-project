import axiosExampleInstance from '@/api/axiosExampleInstance'
import { productType } from '@inventario/ConfiguracionDeInventario/Productos/types/productsTypes'

export const getProductsService = async (): Promise<productType[]> => {
    const response = await axiosExampleInstance.get('/products')
    return response.data
}
