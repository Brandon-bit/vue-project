// Crea un nuevo archivo: .../composables/marketingMapper.ts

import type { MarketingData, DataPoint, } from '../types/marketingTypes';

// Esta función traduce la respuesta de tu API falsa (o de la real en el futuro)
export const mapApiResponseToMarketingData = (apiResponse: any): MarketingData => {

  // Datos que vendrán del api real


  const salesData: DataPoint[] = apiResponse.ventas.map((item: any) => ({
    label: item.mes,
    value: item.cantidad
  }));

  const usersData: DataPoint[] = apiResponse.usuarios.map((item: any) => ({
    label: item.dia,
    value: item.cantidad
  }));

    const expensesData: DataPoint[] = apiResponse.gastos?.map((item: any) => ({
    label: item.mes,
    value: item.monto
  })) || [];

  const revenueData: DataPoint[] = apiResponse.ingresos.map((item: any) => ({
    label: item.producto,
    value: item.monto
  }));

  return {
    sales: salesData,
    users: usersData,
    revenue: revenueData,
    expenses: expensesData
  };
};