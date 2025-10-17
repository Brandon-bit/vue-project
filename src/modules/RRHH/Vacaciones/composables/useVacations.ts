import { h } from 'vue'
import { ColumnTableType } from '@/shared/types/columnTableType'
import { editTableButton, deleteTableButton } from '@/utils/tableButtons'
import { useModalStore } from '@/shared/stores/modal.store'
import useVacationStore from '@rrhh/Vacaciones/store/vacationStore'
import { formatDate } from '@rrhh/Vacaciones/composables/mappingVacations'

export const useVacations = () => {
    const vacationStore = useVacationStore()
    const modalStore = useModalStore()

    const getTableColumns = (): ColumnTableType[] => {
        return [
            {
                header: 'ID',
                accessorKey: 'id'
            },
            {
                header: 'Empleado',
                accessorKey: 'employeeName'
            },
            {
                header: 'Fecha Inicio',
                accessorKey: 'startDate',
                cell: ({ row }: any) => {
                    return formatDate(row.original.startDate)
                }
            },
            {
                header: 'Fecha Fin',
                accessorKey: 'endDate',
                cell: ({ row }: any) => {
                    return formatDate(row.original.endDate)
                }
            },
            {
                header: 'Días',
                accessorKey: 'daysCount'
            },
            {
                header: 'Estado',
                accessorKey: 'statusLabel',
                cell: ({ row }: any) => {
                    const status = row.original.status
                    let badgeClass = 'badge'
                    
                    if (status === 'approved') {
                        badgeClass += ' badge-success'
                    } else if (status === 'rejected') {
                        badgeClass += ' badge-error'
                    } else {
                        badgeClass += ' badge-warning'
                    }

                    return h('span', { class: badgeClass }, row.original.statusLabel)
                }
            },
            {
                header: 'Fecha Solicitud',
                accessorKey: 'requestDate',
                cell: ({ row }: any) => {
                    return formatDate(row.original.requestDate)
                }
            },
            {
                header: 'Acciones',
                accessorKey: '',
                cell: ({ row }: any) => {
                    const data = row.original
                    const editModal = () => {
                        vacationStore.setData(data)
                        modalStore.open(vacationStore.modalId, {
                            type: 'UPDATE',
                            title: 'Editar solicitud de vacaciones'
                        })
                    }
                    const deleteModal = () => {
                        vacationStore.setData(data)
                        modalStore.open(vacationStore.modalId, {
                            type: 'DELETE',
                            title: 'Eliminar solicitud de vacaciones'
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
        ]
    }

    return { getTableColumns }
}
