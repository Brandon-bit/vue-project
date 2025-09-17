import { ref } from 'vue';
import type { SaleType } from '../types/saleType';
import { getSalesService } from '../services/sale.service';
import { ColumnTableType } from '@/shared/types/columnTableType';
import { h } from 'vue';

export const useSale = () => {
    // Variable reactiva para guardar la lista de ventas
    const sales = ref<SaleType[]>([]);
    // Variable para el estado de carga
    const isLoading = ref(false);

    /**
     * Función que llama al servicio y llena la variable 'sales'.
     */
    const fetchSales = async () => {
        isLoading.value = true;
        try {
            sales.value = await getSalesService();
        } catch (error) {
            console.error("Error al obtener las ventas:", error);
        } finally {
            isLoading.value = false;
        }
    };

    /**
     * Función que define la estructura de la tabla de ventas.
     */
    const getSalesTableColumns = (): ColumnTableType[] => {
        return [
            { header: 'Cliente', accessorKey: 'customer_name' },
            { header: 'Referencia', accessorKey: 'reference' },
            { header: 'Fecha', accessorKey: 'sale_date' },
            { 
                header: 'Estado', 
                accessorKey: 'status',
                cell: ({ row }: any) => h('span', { class: 'badge badge-sm badge-info' }, row.original.status)
            },
            { header: 'Total', accessorKey: 'grand_total' },
            { header: 'Pagado', accessorKey: 'paid' },
            { header: 'Debido', accessorKey: 'due' },
            { 
                header: 'Estado de Pago', 
                accessorKey: 'payment_status',
                cell: ({ row }: any) => h('span', { class: 'badge badge-sm badge-success' }, row.original.payment_status)
            },
            { header: 'Facturador', accessorKey: 'biller_name' },
            // Aquí iría la columna de Acciones
        ];
    };

    // Expone las variables y funciones que la vista necesitará
    return {
        sales,
        isLoading,
        fetchSales,
        getSalesTableColumns
    };
};  