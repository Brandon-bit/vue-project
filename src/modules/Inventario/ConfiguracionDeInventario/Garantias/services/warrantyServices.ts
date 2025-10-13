import axiosApiInstance from '@/api/axiosApiInstance'
import type { ApiResponseType } from '@/shared/types/apiResponseType'
import type { WarrantyResponseType, WarrantyRequestType } from '@inventario/ConfiguracionDeInventario/Garantias/types/warrantyTypes';
import type { PagedResponseType } from '@/shared/types/pagedResponseType';

export const getWarrantiesService = async (page : number, pageSize: number) : Promise<ApiResponseType<PagedResponseType<WarrantyResponseType>>> => {
    const response = await axiosApiInstance.get('/producto/garantia', {
        params: {
            limit: page,
            skip: pageSize
        }
    })
    return response.data
}

export const createWarrantyService = async (model : WarrantyRequestType) : Promise<ApiResponseType<WarrantyResponseType>> => {
    const response = await axiosApiInstance.post('/producto/garantia', model);
    return response.data
}

export const updateWarrantyService = async (data: WarrantyRequestType): Promise<ApiResponseType<WarrantyResponseType>> => {
    const response = await axiosApiInstance.put(`/producto/garantia/${data.id}`, data)
    return response.data
}

export const deleteWarrantyService = async (id: number, borradoLogico : boolean = false): Promise<ApiResponseType<WarrantyResponseType>> => {
    const response = await axiosApiInstance.delete(`/producto/garantia/${id}`, {
        params: { borradoLogico }
    })
    return response.data
}
  