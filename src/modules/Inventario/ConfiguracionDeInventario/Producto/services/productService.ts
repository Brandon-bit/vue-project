import axiosExampleInstance from '@/api/axiosExampleInstance'
export const getProductDetailService = async (id: string): Promise<T> => {
    const response = await axiosExampleInstance.get(`/detail/${id}`)
    return response.data
}
