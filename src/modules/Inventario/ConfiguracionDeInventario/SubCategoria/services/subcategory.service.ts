// src/modules/.../SubCategoria/services/subCategory.service.ts

import axiosExampleInstance from '@/api/axiosExampleInstance';
import type { SubCategoryType, SubCategoryFormType } from '../types/subCategoryType';

/**
 * READ: Obtiene todas las subcategorías.
 */
export const getSubCategoriesService = async (): Promise<SubCategoryType[]> => {
    const response = await axiosExampleInstance.get('/subcategory');
    return response.data;
};

/**
 * CREATE: Crea una nueva subcategoría.
 */
export const createSubCategoryService = async (data: SubCategoryFormType): Promise<SubCategoryType> => {
    const response = await axiosExampleInstance.post('/subcategory', data);
    return response.data;
};

/**
 * UPDATE: Actualiza una subcategoría existente por su ID.
 */
export const updateSubCategoryService = async (id: number, data: SubCategoryFormType): Promise<SubCategoryType> => {
    const response = await axiosExampleInstance.put(`/subcategory/${id}`, data);
    return response.data;
};

/**
 * DELETE: Elimina una subcategoría por su ID.
 */
export const deleteSubCategoryService = async (id: number): Promise<void> => {
    await axiosExampleInstance.delete(`/subcategory/${id}`);
};