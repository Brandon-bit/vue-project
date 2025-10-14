import useOrderAuthorizationsStore from '@inventario/Operacion/AutorizacionesDePedidos/store/useOrderAthorizationsStore'
import { useModalStore } from '@/shared/stores/modal.store'
import { ColumnTableType } from '@/shared/types/columnTableType'
import { h } from 'vue'
import { editTableButton } from '@/utils/tableButtons'
export const useOrderAuthorizationsTableHeaders = (): ColumnTableType[] => {
    const orderAuthorizationsStore = useOrderAuthorizationsStore()
    const modalStore = useModalStore()

    return [
        {
            header: 'Folio',
            accessorKey: 'folio'
        },
        {
            header: 'Proveedor',
            accessorKey: 'supplier'
        },
        {
            header: 'Fecha',
            accessorKey: 'date'
        },
        {
            header: 'Acciones',
            accessorKey: '',
            cell: ({ row }: any) => {
                const data = row.original
                const editModal = () => {
                    orderAuthorizationsStore.setData(data)
                    modalStore.open(orderAuthorizationsStore.modalId, {
                        type: 'UPDATE',
                        title: 'Actualizar estado'
                    })
                }
                const editButton = editTableButton(editModal)
                return h('div', { class: 'flex gap-4 justify-center' }, [editButton])
            }
        }
    ]
}
