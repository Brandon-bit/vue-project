import axiosApiInstance from '@/api/axiosApiInstance'
import type { ApiResponseType } from '@/shared/types/apiResponseType'
import type { PagedResponseType } from '@/shared/types/pagedResponseType'
import { VariantAttributeType, VariantAttributeRequestType, VariantAttributeResponseType } from '@inventario/ConfiguracionDeInventario/AtributosVariantes/types/variantAttributeTypes'

export const getVariantAttributesService = async (page : number, pageSize: number) : Promise<ApiResponseType<PagedResponseType<VariantAttributeResponseType>>> => {
    const response = await axiosApiInstance.get('/producto/atributovariante', {
        params: {
        page: page,
        pageSize: pageSize
        }
    })
    return response.data
}

export const createVariantAttributeService = async (data: VariantAttributeRequestType): Promise<ApiResponseType<VariantAttributeResponseType>> => {
    const response = await axiosApiInstance.post('/producto/atributovariante', data);
    return response.data;
}

export const updateVariantAttributeService = async (id : number, data: VariantAttributeRequestType): Promise<ApiResponseType<VariantAttributeResponseType>> => {
  const response = await axiosApiInstance.put(`/producto/atributovariante/${id}`, data)
  return response.data
}

export const deleteVariantAttributeService = async (id: number): Promise<ApiResponseType<VariantAttributeResponseType>> => {
    const response = await axiosApiInstance.delete(`/producto/atributovariante/${id}`)
    return response.data
}