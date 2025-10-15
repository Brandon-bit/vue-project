
import axiosExampleInstance from '@/api/axiosExampleInstance';
import type { MarketingData } from '../types/marketingTypes';
import { mapApiResponseToMarketingData } from '../composables/marketingMapper'; 

export const getMarketingData = async (): Promise<MarketingData> => {
  try {
 
    const response = await axiosExampleInstance.get('/marketingData');
  
    const cleanData = mapApiResponseToMarketingData(response.data);
    
    return cleanData;
  } catch (error) {
    console.error("Error al obtener los datos de marketing:", error);
    return { sales: [], users: [], revenue: [] };
  }
};