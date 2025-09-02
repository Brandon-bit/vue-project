import axios from '@/api/axiosExampleInstance'
//import type { ApiResponseType } from '@/shared/types/apiResponseType'
import type { WarrantyType } from '../types/warrantyType';

export const getWarrantiesService = async () : Promise<WarrantyType[]> => {
    const response = await axios.get('/warranty');
    return response.data
}

export const addNewWarrantie = async (model : WarrantyType) : Promise<WarrantyType> => {
    const response = await axios.post('/warranty', model);
    return response.data
}
