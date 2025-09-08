import axiosExampleInstance from '@/api/axiosExampleInstance'

export const getProductsWithExpirationService = async (): Promise<any[]> => {
    const response = await axiosExampleInstance.get('/expiration-products')
    return response.data
}

export const updateProductWithExpirationService = async (data: any): Promise<T> => {
    const response = await axiosExampleInstance.put('/expiration-products')
    return response.data
}

export const deleteProductWithExpirationService = async (id: string): Promise<T> => {
    const response = await axiosExampleInstance.delete(`/expiration-products/${id}`)
    return response.data
}
