import axiosApiInstance from '@/api/axiosApiInstance'
import type { ApiResponseType } from '@/shared/types/apiResponseType'
import type { WarrantyType } from '../types/warrantyType';
import type { PagedResponseType } from '@/shared/types/pagedResponseType';

export const getWarrantiesService = async (page : number, pageSize: number) : Promise<ApiResponseType<PagedResponseType<WarrantyType>>> => {
    const response = await axiosApiInstance.get('/garantia/garantia', {
        params: {
            page: page,
            pageSize: pageSize
        }
    })
    return response.data
}

export const addNewWarrantie = async (model : WarrantyType) : Promise<WarrantyType> => {
    const response = await axiosApiInstance.post('/warranty', model);
    return response.data
}
  