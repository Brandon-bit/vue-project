// Define la estructura de un solo objeto de venta
export interface SaleType {
    id?: number;
    name: string;
    reference: string;
    sale_date: string; // O puedes usar el tipo Date
    status: string;
    grand_total: number;
    paid: number;
    due: number;
    payment_status: string;
    biller_name: string;
}

export type SaleResponseType = {   
    id: number;
    nombre: string;
    referencia: string;
    fecha_venta: string;
    estado: string;
    total_general: number;
    pagado: number;
    debido: number;
    estado_pago: string;
    nombre_facturador: string;
}

export type saleApi ={
    success: boolean;
  message: string;
  data: any;
}
