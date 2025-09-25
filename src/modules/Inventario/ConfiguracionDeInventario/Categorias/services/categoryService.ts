import axiosApiInstance from '@/api/axiosApiInstance'
import type { ApiResponseType } from '@/shared/types/apiResponseType'
import type { CategoryResponseType } from '@inventario/ConfiguracionDeInventario/Categorias/types/categoryResponseType'
import type { CategoryRequestType } from '@inventario/ConfiguracionDeInventario/Categorias/types/categoryRequestType'
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

export const createCategoryService = async (data: CategoryRequestType): Promise<ApiResponseType<CategoryResponseType>> => {
    const response = await axiosApiInstance.post('/producto/categoria', data)
    return response.data
}

export const updateCategoryService = async (data: CategoryRequestType): Promise<ApiResponseType<CategoryResponseType>> => {
    const response = await axiosApiInstance.put(`/producto/categoria/${data.Id}`, data)
    return response.data
}

export const deleteCategoryService = async (id: number): Promise<ApiResponseType<CategoryResponseType>> => {
    const response = await axiosApiInstance.delete(`/producto/categoria/${id}`)
    console.log(response)
    return response.data
}

