import axiosApiInstance from '@/api/axiosApiInstance'
import type { ApiResponseType } from '@/shared/types/apiResponseType'
import { ParentCategoryResponseType, SubCategoryResponseType } from '@inventario/ConfiguracionDeInventario/SubCategoria/types/subCategoryTypes'
import type { PagedResponseType } from '@/shared/types/pagedResponseType'

export const getSubCategoriesService = async (page : number, pageSize: number) : Promise<ApiResponseType<PagedResponseType<SubCategoryResponseType>>> => {
  const response = await axiosApiInstance.get('/producto/subcategoria', {
    params: {
      limit: page,
      skip: pageSize
    }
  })
  return response.data
}

export const getParentCategoriesService = async () : Promise<ParentCategoryResponseType[]> => {
  const response = await axiosApiInstance.get('/producto/categoria/lista')
  return response.data.data.categoria
};

export const createSubCategoryService = async (data: FormData): Promise<ApiResponseType<SubCategoryResponseType>> => {
  
  const response = await axiosApiInstance.post('/producto/subcategoria', data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const updateSubCategoryService = async (id : number, data: FormData): Promise<ApiResponseType<SubCategoryResponseType>> => {
  
  const response = await axiosApiInstance.put(`/producto/subcategoria/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  
  return response.data
}

export const deleteSubCategoryService = async (id: number, borradoLogico : boolean = false): Promise<ApiResponseType<SubCategoryResponseType>> => {
    const response = await axiosApiInstance.delete(`/producto/subcategoria/${id}`, {
        params: { borradoLogico }
    })
    return response.data
}

