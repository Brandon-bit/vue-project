import type { SaleType } from '../types/saleType';

// Un arreglo de datos falsos que sigue la estructura de tu tipo 'SaleType'
export const FAKE_SALES_DATA: SaleType[] = [
    {
        id: 1,
        customer_name: 'Cliente Ejemplo S.A.',
        reference: 'REF-001',
        sale_date: '2025-09-16',
        status: 'Completado',
        grand_total: 1500.50,
        paid: 1500.50,
        due: 0.00,
        payment_status: 'Pagado',
        biller_name: 'Vendedor 1'
    },
    {
        id: 2,
        customer_name: 'Negocio Local S. de R.L.',
        reference: 'REF-002',
        sale_date: '2025-09-15',
        status: 'Pendiente',
        grand_total: 800.00,
        paid: 400.00,
        due: 400.00,
        payment_status: 'Parcial',
        biller_name: 'Vendedor 2'
    }
];