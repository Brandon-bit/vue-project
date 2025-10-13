import useMaxMinStore from '@inventario/Operacion/PuntosMaximosMinimos/store/maxMinStore'
import { useModalStore } from '@/shared/stores/modal.store'
import { ColumnTableType } from '@/shared/types/columnTableType'
import { h } from 'vue'
import { editTableButton, deleteTableButton } from '@/utils/tableButtons'
export const useMaxMinTableHeaders = (): ColumnTableType[] => {
    const maxMinStore = useMaxMinStore()
    const modalStore = useModalStore()

    return [
        {
            header: 'SKU',
            accessorKey: 'sku'
        },
        {
            header: 'Nombre',
            accessorKey: 'productName'
        },
        {
            header: 'Mínimos',
            accessorKey: 'minimum'
        },
        {
            header: 'Máximos',
            accessorKey: 'maximum'
        },
        {
            header: 'Stock',
            accessorKey: 'stock'
        },
        {
            header: 'Puntos de reorden',
            accessorKey: 'reorderPoints'
        },
        {
            header: 'Sugerencia',
            accessorKey: 'suggestion'
        },
        {
            header: 'Acciones',
            accessorKey: '',
            cell: ({ row }: any) => {
                const data = row.original
                const editModal = () => {
                    maxMinStore.setData(data)
                    modalStore.open(maxMinStore.modalId, {
                        type: 'UPDATE',
                        title: 'Actualizar puntos max/min'
                    })
                }
                const deleteModal = () => {
                    maxMinStore.setData(data)
                    modalStore.open(maxMinStore.modalId, {
                        type: 'DELETE',
                        title: 'Eliminar puntos max/min'
                    })
                }
                const editButton = editTableButton(editModal)
                const deleteButton = deleteTableButton(deleteModal)
                return h('div', { class: 'flex gap-4 justify-center' }, [editButton, deleteButton])
            }
        }
    ]
}
