import { VariantAttributeType } from './../types/variantAttributeType';
import axios from '@/api/axiosExampleInstance'
//import type { ApiResponseType } from '@/shared/types/apiResponseType'

export const getVariantAttributesService = async () : Promise<VariantAttributeType[]> => {
    const response = await axios.get('/variant');
    return response.data
}