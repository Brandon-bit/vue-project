import { h } from 'vue'
import { ColumnTableType } from '@/shared/types/columnTableType'
import { useModalStore } from '@/shared/stores/modal.store'
import { editTableButton } from '@/utils/tableButtons'

export const usePositions = () => {
    const modalStore = useModalStore()
    const MODAL_ID = 'position-modal'

    const getTableColumns = (): ColumnTableType[] => {
        const columns = [
            {
                header: 'Departamento',
                accessorKey: 'departmentName'
            },
            {
                header: 'Nombre del Puesto',
                accessorKey: 'name'
            },
            {
                header: 'Descripción',
                accessorKey: 'description'
            },
            {
                header: 'Estado',
                accessorKey: 'active',
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
                    const editModal = () => {
                        modalStore.open(MODAL_ID, {
                            type: 'EDIT',
                            title: 'Editar puesto',
                            data: data
                        })
                    }
                    const editButton = editTableButton(editModal)
                    return h('div', { class: 'flex gap-4 justify-center' }, [editButton])
                }
            }
        ]

        return columns
    }

    return { getTableColumns, MODAL_ID }
}
