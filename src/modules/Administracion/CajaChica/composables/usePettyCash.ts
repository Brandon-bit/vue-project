import usePettyCashStore from '@/modules/Administracion/CajaChica/store/pettycashStore'
import { useModalStore } from '@/shared/stores/modal.store'
import type { ColumnTableType } from '@/shared/types/columnTableType'
import { h } from 'vue'
import { editTableButton, deleteTableButton } from '@/utils/tableButtons'

const usePettyCash = () => {
    
    const pettyCashStore = usePettyCashStore()
    const modalStore = useModalStore()

    const getTableColumns = (): ColumnTableType[] => {
        const columns = [
            {
                header: 'Fecha',
                accessorKey: 'date',
                cell: ({ row }: any) => {
                    const date = new Date(row.original.date)
                    return h('p', {}, date.toISOString().split("T")[0])
                }
            },
            {
                header: 'Caja',
                accessorKey: 'pettyBoxName'
            },
            {
                header: 'Concepto',
                accessorKey: 'concept'
            },
            {
                header: 'Responsable',
                accessorKey: 'responsible'
            },
            {
                header: 'Monto',
                accessorKey: 'amount',
                cell: ({ row }: any) => {
                    const amount = row.original.amount
                    return h('p', { class: 'text-right font-medium' }, `$${amount.toLocaleString()}`)
                }
            },
            {
                header: 'Estado',
                accessorKey: 'status',
                cell: ({ row }: any) => {
                    const status = row.original.status
                    const badgeClass = status === 'Aprobado' 
                        ? 'badge badge-sm badge-success' 
                        : status === 'Rechazado' 
                        ? 'badge badge-sm badge-error' 
                        : 'badge badge-sm badge-warning'
                    return h('span', { class: badgeClass }, status)
                }
            },
            {
                header: 'Acciones',
                accessorKey: '',
                cell: ({ row }: any) => {
                    const data = row.original
                    const editModal = () => {
                        pettyCashStore.setData(data)
                        modalStore.open(pettyCashStore.modalId, {
                            type: 'EDIT',
                            title: 'Editar gasto'
                        })
                    }
                    const deleteModal = () => {
                        pettyCashStore.setData(data)
                        modalStore.open(pettyCashStore.modalId, {
                            type: 'DELETE',
                            title: 'Eliminar gasto'
                        })
                    }

                    const editButton = editTableButton(editModal)
                    const deleteButton = deleteTableButton(deleteModal)

                    return h('div', { class: 'flex gap-2 justify-center' }, [
                        editButton,
                        deleteButton
                    ])
                }
            }
        ]

        return columns
    }

    return { getTableColumns }
}

export default usePettyCash
