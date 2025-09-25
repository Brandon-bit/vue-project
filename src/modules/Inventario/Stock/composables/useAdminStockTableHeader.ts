import useAdminStockStore from '@inventario/Stock/store/adminStockStore'
import { useModalStore } from '@/shared/stores/modal.store'
import { ColumnTableType } from '@/shared/types/columnTableType'
import { h } from 'vue'
import { editTableButton } from '@/utils/tableButtons'
export const useAdminStockTableHeaders = (): ColumnTableType[] => {
    const adminStockStore = useAdminStockStore()
    const modalStore = useModalStore()

    return [
        {
            header: 'almacen',
            accessorKey: 'warehouse'
        },
        {
            header: 'Tienda',
            accessorKey: 'store'
        },
        {
            header: 'Producto',
            accessorKey: 'product'
        },
        {
            header: 'Fecha',
            accessorKey: 'date'
        },
        {
            header: 'Cantidad',
            accessorKey: 'quantity'
        },
        {
            header: 'personaResponsable',
            accessorKey: 'user'
        },
        {
            header: 'Acciones',
            accessorKey: '',
            cell: ({ row }: any) => {
                const data = row.original
                const editModal = () => {
                    adminStockStore.setData(data)
                    modalStore.open(adminStockStore.modalId, {
                        type: 'UPDATE',
                        title: 'Actualizar auditoría de inventario'
                    })
                }
                const editButton = editTableButton(editModal)
                return h('div', { class: 'flex gap-4 justify-center' }, [editButton])
            }
        }
    ]
}
