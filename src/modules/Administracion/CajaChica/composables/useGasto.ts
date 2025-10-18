import useGastoStore from '@/modules/Administracion/CajaChica/store/gastoStore'
import { useModalStore } from '@/shared/stores/modal.store'
import type { ColumnTableType } from '@/shared/types/columnTableType'
import { h } from 'vue'
import { editTableButton, deleteTableButton } from '@/utils/tableButtons'

const useGasto = () => {
    
    const gastoStore = useGastoStore()
    const modalStore = useModalStore()

    const getTableColumns = (): ColumnTableType[] => {
        const columns = [
            {
                header: 'Fecha',
                accessorKey: 'fecha',
                cell: ({ row }: any) => {
                    const fecha = new Date(row.original.fecha)
                    return h('p', {}, fecha.toISOString().split("T")[0])
                }
            },
            {
                header: 'Caja',
                accessorKey: 'cajaNombre'
            },
            {
                header: 'Concepto',
                accessorKey: 'concepto'
            },
            {
                header: 'Responsable',
                accessorKey: 'responsable'
            },
            {
                header: 'Monto',
                accessorKey: 'monto',
                cell: ({ row }: any) => {
                    const monto = row.original.monto
                    return h('p', { class: 'text-right font-medium' }, `$${monto.toLocaleString()}`)
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
                        gastoStore.setData(data)
                        modalStore.open(gastoStore.modalId, {
                            type: 'EDIT',
                            title: 'Editar gasto'
                        })
                    }
                    const deleteModal = () => {
                        gastoStore.setData(data)
                        modalStore.open(gastoStore.modalId, {
                            type: 'DELETE',
                            title: 'Eliminar gasto'
                        })
                    }
                    const approveModal = () => {
                        gastoStore.setData(data)
                        modalStore.open(gastoStore.modalId, {
                            type: 'APPROVE',
                            title: 'Aprobar gasto'
                        })
                    }

                    const editButton = editTableButton(editModal)
                    const deleteButton = deleteTableButton(deleteModal)
                    
                    const approveButton = h(
                        'button',
                        {
                            class: 'btn btn-sm btn-success',
                            onClick: approveModal
                        },
                        [
                            h('span', { class: 'material-symbols-outlined' }, 'check_circle')
                        ]
                    )

                    return h('div', { class: 'flex gap-2 justify-center' }, [
                        data.status === 'Pendiente' ? approveButton : null,
                        editButton,
                        deleteButton
                    ].filter(Boolean))
                }
            }
        ]

        return columns
    }

    return { getTableColumns }
}

export default useGasto
