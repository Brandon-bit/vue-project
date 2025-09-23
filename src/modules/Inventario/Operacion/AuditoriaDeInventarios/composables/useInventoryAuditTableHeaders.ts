import useInventoryAuditStore from '@inventario/Operacion/AuditoriaDeInventarios/store/useInventoryAuditStore'
import { useModalStore } from '@/shared/stores/modal.store'
import { ColumnTableType } from '@/shared/types/columnTableType'
import { h } from 'vue'
import { editTableButton } from '@/utils/tableButtons'
export const useInventoryAuditTableHeaders = (): ColumnTableType[] => {
    const inventoryAuditStore = useInventoryAuditStore()
    const modalStore = useModalStore()

    return [
        {
            header: 'Fecha',
            accessorKey: 'date'
        },
        {
            header: 'Auditor',
            accessorKey: 'auditorName'
        },
        {
            header: 'Producto',
            accessorKey: 'product'
        },
        {
            header: 'Conteo',
            accessorKey: 'count'
        },
        {
            header: 'Diferencia',
            accessorKey: 'difference'
        },
        {
            header: 'Nota',
            accessorKey: 'note'
        },
        {
            header: 'Acciones',
            accessorKey: '',
            cell: ({ row }: any) => {
                const data = row.original
                const editModal = () => {
                    inventoryAuditStore.setData(data)
                    modalStore.open(inventoryAuditStore.modalId, {
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
