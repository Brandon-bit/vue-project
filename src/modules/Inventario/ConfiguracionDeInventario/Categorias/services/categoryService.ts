import axiosApiInstance from '@/api/axiosApiInstance'
import type { ApiResponseType } from '@/shared/types/apiResponseType'
import type { CategoryApiType } from '@inventario/ConfiguracionDeInventario/Categorias/types/CategoryApiType'
import type { CategoryRequestType } from '@inventario/ConfiguracionDeInventario/Categorias/types/CategoryRequestType'
import type { pagedResponseType } from '@/shared/types/pagedResponseType'

export const getCategoriesService = async (page : number, pageSize: number) : Promise<ApiResponseType<pagedResponseType<CategoryApiType>>> => {
  const response = await axiosApiInstance.get('/producto/categoria', {
    params: {
      page: page,
      pageSize: pageSize
    }
  })
  return response.data
}

export const createCategoryService = async (data: CategoryRequestType): Promise<ApiResponseType<CategoryApiType>> => {
    const response = await axiosApiInstance.post('/producto/categoria', data)
    return response.data
}

export const updateCategoryService = async (data: CategoryRequestType): Promise<ApiResponseType<CategoryApiType>> => {
    const response = await axiosApiInstance.put(`/producto/categoria/${data.Id}`, data)
    return response.data
}

export const deleteCategoryService = async (id: number): Promise<ApiResponseType<CategoryApiType>> => {
    const response = await axiosApiInstance.delete(`/producto/categoria/${id}`)
    console.log(response)
    return response.data
}

