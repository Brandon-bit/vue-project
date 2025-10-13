import axiosApiInstance from '@/api/axiosApiInstance'
import type { ApiResponseType } from '@/shared/types/apiResponseType'
import type { CategoryResponseType } from '@inventario/ConfiguracionDeInventario/Categorias/types/categoryTypes'
import type { PagedResponseType } from '@/shared/types/pagedResponseType'

export const getCategoriesService = async (page : number, pageSize: number) : Promise<ApiResponseType<PagedResponseType<CategoryResponseType>>> => {
  const response = await axiosApiInstance.get('/producto/categoria', {
    params: {
      limit: page,
      skip: pageSize
    }
  })
  return response.data
}

export const createCategoryService = async (data: FormData): Promise<ApiResponseType<CategoryResponseType>> => {
  
  const response = await axiosApiInstance.post('/producto/categoria', data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const updateCategoryService = async (id : number, data: FormData): Promise<ApiResponseType<CategoryResponseType>> => {
  
  const response = await axiosApiInstance.put(`/producto/categoria/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  
  return response.data
}

export const deleteCategoryService = async (id: number): Promise<ApiResponseType<CategoryResponseType>> => {
    const response = await axiosApiInstance.delete(`/producto/categoria/${id}`)
    return response.data
}

