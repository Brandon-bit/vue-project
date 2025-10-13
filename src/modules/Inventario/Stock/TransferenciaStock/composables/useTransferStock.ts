import useTransferStore from '@/modules/Inventario/Stock/TransferenciaStock/store/transferStore'
import type { ColumnTableType } from '@/shared/types/columnTableType'
import { h } from 'vue'
import { editTableButton, deleteTableButton } from '@/utils/tableButtons'

import { useModalStore } from '@/shared/stores/modal.store'

export const useTransferTableHeaders = () => {
    
    const transferStore = useTransferStore()
    const modalStore = useModalStore()

    const getTableColumns = (): ColumnTableType[] => {
        const columns: ColumnTableType[] = [
            {
                header: 'Documento de Referencia',
                accessorKey: 'referenceDocument',
                cell: ({ row }: any) => {
                    const reference = row.original.referenceDocument;
                    const id = row.original.id;
                    return h('div', {}, [
                        h('div', { class: 'font-bold' }, reference),
                        h('div', { class: 'text-sm opacity-50' }, `ID: ${id}`)
                    ]);
                }
            },
            {
                header: 'Almacén Origen',
                accessorKey: 'idWarehouseOrigin'
            },
            {
                header: 'Almacén Destino',
                accessorKey: 'idWarehouseDestination'
            },
            {
                header: 'Fecha de Traslado',
                accessorKey: 'transferDate',
                cell: ({ row }: any) => {
                    const dateValue = row.original.transferDate;
                    if (!dateValue) return h('p', {}, 'N/A');
                    
                    const transferDate = new Date(dateValue);
                    return h('p', {}, transferDate.toISOString().split("T")[0]);
                }
            },
            {
                header: 'Acciones',
                accessorKey: '', // No se necesita accessorKey para una columna de acciones
                cell: ({ row }: any) => {
                    const data = row.original;
                    
                    const editModal = () => {
                        transferStore.setData(data);
                        modalStore.open(transferStore.modalId, { // Asume que tu transferStore tiene una propiedad 'modalId'
                            type: 'EDIT',
                            title: 'Editar Traslado'
                        });
                    };

                    const deleteModal = () => {
                        transferStore.setData(data);
                        modalStore.open(transferStore.modalId, {
                            type: 'DELETE',
                            title: 'Eliminar Traslado'
                        });
                    };

                    const editButton = editTableButton(editModal);
                    const deleteButton = deleteTableButton(deleteModal);
                    
                    return h('div', { class: 'flex gap-4 justify-center' }, [
                        editButton,
                        deleteButton
                    ]);
                }
            }
        ];

        return columns;
    }

    return { getTableColumns };
}