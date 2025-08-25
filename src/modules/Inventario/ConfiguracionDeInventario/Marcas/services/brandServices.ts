import axios from '@/api/axiosExampleInstance'
import type { ApiResponseType } from '@/shared/types/apiResponseType'
import type { BrandType } from '../types/brandType'

export const getBrands = async () : Promise<ApiResponseType<BrandType>> => {
    const response = await axios.get('/brand');
    console.log(response)
    return response.data
}