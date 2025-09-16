import type { SaleType } from '../types/saleType';
import { FAKE_SALES_DATA } from './mock.data'; // Usaremos datos de prueba

/**
 * Obtiene los datos de ventas.
 * Temporalmente devuelve datos de prueba (mock).
 */
export const getSalesService = async (): Promise<SaleType[]> => {
  console.warn('⚠️ Usando datos simulados (mock) para Ventas.');

  // Simula un retraso de red de 0.5 segundos
  await new Promise(resolve => setTimeout(resolve, 500));

  return FAKE_SALES_DATA;
};