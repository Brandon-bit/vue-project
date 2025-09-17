// Define la estructura de un solo objeto de venta
export interface SaleType {
    id: number;
    customer_name: string;
    reference: string;
    sale_date: string; // O puedes usar el tipo Date
    status: string;
    grand_total: number;
    paid: number;
    due: number;
    payment_status: string;
    biller_name: string;
}