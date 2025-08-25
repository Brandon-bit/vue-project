import axios from '@/api/axiosExampleInstance'
//import type { ApiResponseType } from '@/shared/types/apiResponseType'
import type { BrandType } from '../types/brandType'

export const getBrandsService = async () : Promise<BrandType[]> => {
    const response = await axios.get('/brand');
    return response.data
}

export const addNewBrand = async (model : BrandType) : Promise<BrandType> => {
    const response = await axios.post('/brand', model);
    return response.data
}