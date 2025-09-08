import axios from '@/api/axiosExampleInstance'
import type { Discount, CreateDiscountPayload, UpdateDiscountPayload } from '../types/discountTypes'

export const getDiscountsService = async (): Promise<Discount[]> => {
    const response = await axios.get('/discounts')
    return response.data
}

export const createDiscountService = async (discount: CreateDiscountPayload): Promise<Discount> => {
    const response = await axios.post('/discounts', discount)
    return response.data
}

export const updateDiscountService = async (discount: UpdateDiscountPayload): Promise<Discount> => {
    const response = await axios.put(`/discounts/${discount.id}`, discount)
    return response.data
}

export const deleteDiscountService = async (id: number): Promise<void> => {
    await axios.delete(`/discounts/${id}`)
}

export const getDiscountByIdService = async (id: number): Promise<Discount> => {
    const response = await axios.get(`/discounts/${id}`)
    return response.data
}

// Servicios auxiliares para obtener datos de referencia
export const getProductsService = async () => {
    const response = await axios.get('/products')
    return response.data
}

export const getCategoriesService = async () => {
    const response = await axios.get('/category')
    return response.data
}

export const getBrandsService = async () => {
    const response = await axios.get('/brand')
    return response.data
}
