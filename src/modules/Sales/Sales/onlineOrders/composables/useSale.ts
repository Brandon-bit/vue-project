import { ref } from 'vue';
import type { SaleResponseType, SaleType } from '@/modules/Sales/Sales/online-orders/types/saleType'  ;
import { getSalesService } from '../services/sales-services';
import { ColumnTableType } from '@/shared/types/columnTableType';
import { h } from 'vue';

import  useSaleStore  from '@/modules/Sales/Sales/online-orders/store/saleStore';
import { useModalStore } from '@/shared/stores/modal.store';
import { editTableButton, deleteTableButton } from '@/utils/tableButtons';

export const useSale = () => {
    const saleStore = useSaleStore()
    const modalStore = useModalStore()
   
    const getSales = async () => {
      
       const response = await getSalesService();


       console.log('Respuesta del servicio de ventas:', response.map(mapCategory));
        return {
            items: response.map(mapCategory),
            total: 5
            
        }
    };

     const mapCategory = (model : SaleResponseType) : SaleType => {
            return {
                id: model.id,
                name: model.nombre,
                reference: model.referencia,
                sale_date: model.fecha_venta,
                status: model.estado,
                grand_total: model.total_general,
                paid: model.pagado,
                due: model.debido,
                payment_status: model.estado_pago,
                biller_name: model.nombre_facturador
            }
        }

    /**
     * Función que define la estructura de la tabla de ventas.
     */
    const getSalesTableColumns = (): ColumnTableType[] => {
        return [
            { header: 'Cliente', accessorKey: 'name' },
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

            {
                            header: 'Acciones',
                            accessorKey: '',
                            cell: ({ row }: any) => {
                                const data = row.original
                                const editModal = () => {
                                    saleStore.setData(data)
                                    modalStore.open(saleStore.modalId, {
                                        type: 'EDIT',
                                        title: 'Editar venta'
                                    })
                                }
                                const deleteModal = () => {
                                    saleStore.setData(data)
                                    modalStore.open(saleStore.modalId, {
                                        type: 'DELETE',
                                        title: 'Eliminar venta  '
                                    })
                                }
                                const editButton = editTableButton(editModal)
                                const deleteButton = deleteTableButton(deleteModal)
                                return h('div', { class: 'flex gap-4 justify-center' }, [
                                    editButton,
                                    deleteButton
                                ])
                            }
                        }
        ];
    };

    // Expone las variables y funciones que la vista necesitará
    return {
     
        getSales,
        getSalesTableColumns
    };
};  