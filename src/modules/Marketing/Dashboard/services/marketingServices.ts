// src/modules/Marketing/services/marketingServices.ts

import type { MarketingData, Brand } from '../types/marketingTypes';
// Ya no necesitamos axios por ahora, pero lo dejamos comentado para el futuro
// import axiosExampleInstance from '@/api/axiosExample-instance'; 

// --- 1. DATOS DE EJEMPLO (MOCK DATA) ---

const mockBrands: Brand[] = [
  { id: '1', name: 'Empresa A' },
  { id: '2', name: 'Empresa B (Sin redes)' },
];

const mockMarketingData: Record<string, MarketingData> = {
  // Datos para 'Empresa A' (ID: 1)
  '1': {
    sales: [
      { label: 'Ene', value: 120 }, { label: 'Feb', value: 150 }, { label: 'Mar', value: 170 },
      { label: 'Abr', value: 130 }, { label: 'May', value: 190 }, { label: 'Jun', value: 210 },
    ],
    expenses: [
      { label: 'Ene', value: 80 }, { label: 'Feb', value: 90 }, { label: 'Mar', value: 85 },
      { label: 'Abr', value: 100 }, { label: 'May', value: 110 }, { label: 'Jun', value: 115 },
    ],
    revenue: [
      { label: 'Producto X', value: 4500 },
      { label: 'Producto Y', value: 3200 },
      { label: 'Servicio Z', value: 1800 },
    ],
    users: [
      { label: 'Facebook', value: 1250 },
      { label: 'Instagram', value: 3400 },
    ],
  },
  // Datos para 'Empresa B (Sin redes)' (ID: 2)
  '2': {
    sales: [
      { label: 'Ene', value: 30 }, { label: 'Feb', value: 45 }, { label: 'Mar', value: 40 },
      { label: 'Abr', value: 55 }, { label: 'May', value: 60 }, { label: 'Jun', value: 70 },
    ],
    expenses: [
      { label: 'Ene', value: 20 }, { label: 'Feb', value: 25 }, { label: 'Mar', value: 22 },
      { label: 'Abr', value: 30 }, { label: 'May', value: 35 }, { label: 'Jun', value: 40 },
    ],
    revenue: [
      { label: 'Consultoría', value: 1500 },
      { label: 'Soporte Básico', value: 900 },
    ],
    // La propiedad 'users' está vacía, ya que no tiene redes conectadas
    users: [],
  }
};


// --- 2. FUNCIONES DE SERVICIO MODIFICADAS ---
// Estas funciones ahora devuelven los datos de ejemplo después de un pequeño retraso
// para simular una llamada de red.

export const getBrands = async (): Promise<Brand[]> => {
  console.log("SIMULANDO: Obteniendo lista de marcas...");
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("SIMULANDO: Marcas obtenidas.", mockBrands);
      resolve(mockBrands);
    }, 500); // Retraso de 0.5 segundos
  });
};

export const getMarketingData = async (brandId: string): Promise<MarketingData> => {
  console.log(`SIMULANDO: Obteniendo datos de marketing para la marca ID: ${brandId}...`);
  return new Promise(resolve => {
    setTimeout(() => {
      const data = mockMarketingData[brandId] || { sales: [], expenses: [], revenue: [], users: [] };
      console.log(`SIMULANDO: Datos obtenidos para ${brandId}.`, data);
      resolve(data);
    }, 800); // Retraso de 0.8 segundos
  });
};