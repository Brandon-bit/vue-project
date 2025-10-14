

export interface DataPoint {
  label: string;  
  value: number;  
}

export interface MarketingData {
  sales: DataPoint[];
  users: DataPoint[];
  revenue: DataPoint[];
   expenses: DataPoint[];
}