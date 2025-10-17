// src/modules/Marketing/types/marketingTypes.ts

export interface DataPoint {
  label: string;
  value: number;
}

// ✅ NUEVO: Define y exporta el tipo Brand aquí
export interface Brand {
  id: string;
  name:string;
  // Puedes añadir más campos opcionales si los necesitas, como 'logo'
  // logo?: string;
}

export interface MarketingData {
  sales: DataPoint[];
  users: DataPoint[];
  revenue: DataPoint[];
  expenses: DataPoint[];
}