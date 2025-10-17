import { h } from 'vue'
import router from '@/router'
import { ColumnTableType } from '@/shared/types/columnTableType'
import { useModalStore } from '@/shared/stores/modal.store'
import { editTableButton, deleteTableButton } from '@/utils/tableButtons'

export const useEmployees = () => {
    const modalStore = useModalStore()
    const MODAL_ID = 'delete-employee-modal'

    const getTableColumns = (): ColumnTableType[] => {
        const columns = [
            {
                header: 'Número',
                accessorKey: 'employeeNumber'
            },
            {
                header: 'Nombre Completo',
                accessorKey: 'fullName'
            },
            {
                header: 'Email',
                accessorKey: 'email'
            },
            {
                header: 'Puesto',
                accessorKey: 'position'
            },
            {
                header: 'Departamento',
                accessorKey: 'department'
            },
            {
                header: 'Empresa',
                accessorKey: 'company'
            },
            {
                header: 'Estado',
                cell: ({ row }: any) => {
                    const isActive = row.original.active
                    return isActive
                        ? h('span', { class: 'badge badge-sm badge-success' }, 'Activo')
                        : h('span', { class: 'badge badge-sm badge-error' }, 'Inactivo')
                }
            },
            {
                header: 'Acciones',
                accessorKey: '',
                cell: ({ row }: any) => {
                    const data = row.original
                    const editAction = () => {
                        router.push(`/rrhh/empleados/editar/${data.id}`)
                    }
                    const deleteAction = () => {
                        modalStore.open(MODAL_ID, {
                            type: 'DELETE',
                            title: 'Eliminar empleado',
                            data: data
                        })
                    }
                    const editButton = editTableButton(editAction)
                    const deleteButton = deleteTableButton(deleteAction)
                    return h('div', { class: 'flex gap-4 justify-center' }, [
                        editButton,
                        deleteButton
                    ])
                }
            }
        ]

        return columns
    }

    return { getTableColumns, MODAL_ID }
}
