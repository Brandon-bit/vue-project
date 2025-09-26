import useOrderManagementStore from '@inventario/Operacion/GestionDePedidos/store/useOrderManagementStore'
import { useModalStore } from '@/shared/stores/modal.store'
import { ColumnTableType } from '@/shared/types/columnTableType'
import { h } from 'vue'
import { customTableButton, editTableButton } from '@/utils/tableButtons'

export const useOrderManagementTableHeaders = (): ColumnTableType[] => {
    const orderManagementStore = useOrderManagementStore()
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
            header: 'Estado',
            accessorKey: '',
            cell: ({ row }: any) => {
                const data = row.original
                const states: Record<number, string> = {
                    1: 'warning',
                    2: 'info',
                    3: 'success',
                    4: 'error'
                }

                const color = states[data.stateId] || 'neutral'

                return h('span', { class: `badge badge-sm badge-${color}` }, `${data.state}`)
            }
        },
        {
            header: 'Acciones',
            accessorKey: '',
            cell: ({ row }: any) => {
                const data = row.original

                const advanceModal = () => {
                    orderManagementStore.setData(data)
                    modalStore.open(orderManagementStore.modalId, {
                        type: 'LOAD',
                        title: 'Avanzar estado'
                    })
                }

                const editModal = () => {
                    orderManagementStore.setData(data)
                    modalStore.open(orderManagementStore.modalId, {
                        type: 'UPDATE',
                        title: 'Actualizar order de pedido'
                    })
                }

                const editButton = data.stateId === 1 ? editTableButton(editModal) : null
                const customButton =
                    data.stateId != 3 && data.stateId != 4
                        ? customTableButton(advanceModal, 'Avanzar estado', 'arrow_circle_right')
                        : null
                return h('div', { class: 'flex gap-4 justify-center' }, [customButton, editButton])
            }
        }
    ]
}
