
import type { SaleResponseType, SaleType } from '@/modules/Sales/Sales/online-orders/types/saleType';

import axiosExampleInstance from '@/api/axiosExampleInstance'


/**
 * Obtiene los datos de ventas.
 * Temporalmente devuelve datos de prueba (mock).
 */
export const getSalesService = async (): Promise<SaleResponseType[]> => {
  console.warn('⚠️ Usando datos simulados (mock) para Ventas.');
    const response = await axiosExampleInstance.get('/sales')


    console.log('AAAAA', response.data)
    return response.data
  // Simula un retraso de red de 0.5 segundos
 
};

export const putSalesService = async (): Promise<SaleResponseType[]> => {
  console.warn('⚠️ Usando datos simulados (mock) para Ventas.');
    const response = await axiosExampleInstance.put('/sales')
    return response.data
  // Simula un retraso de red de 0.5 segundos
};

export const deleteSalesService = async (id: number): Promise<SaleResponseType[]> => {
  console.warn('⚠️ Usando datos simulados (mock) para Ventas.');
  const response = await axiosExampleInstance.delete(`/sales/${id}`)
  return response.data
  // Simula un retraso de red de 0.5 segundos
};