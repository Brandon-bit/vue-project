import axiosExampleInstance from '@/api/axiosExampleInstance'
import type { CategoryType, CategoryFormType } from '../types/categoryType'

export const getCategoriesService = async (): Promise<CategoryType[]> => {
    const response = await axiosExampleInstance.get('/category')
    return response.data
}

export const createCategoryService = async (data: CategoryFormType): Promise<T> => {
    const response = await axiosExampleInstance.post('/category', { data })
    return response.data
}

export const updateCategoryService = async (): Promise<T> => {
    const response = await axiosExampleInstance.put('/category')
    return response.data
}

export const deleteCategoryService = async (): Promise<T> => {
    const response = await axiosExampleInstance.delete('/category')
    return response.data
}
