import { UnitType } from './../types/unitType';
import axios from '@/api/axiosExampleInstance'
//import type { ApiResponseType } from '@/shared/types/apiResponseType'

export const getUnitsService = async () : Promise<UnitType[]> => {
    const response = await axios.get('/unit');
    return response.data
}