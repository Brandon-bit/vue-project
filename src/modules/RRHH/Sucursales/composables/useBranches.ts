import { h } from 'vue'
import { ColumnTableType } from '@/shared/types/columnTableType'
import { useModalStore } from '@/shared/stores/modal.store'
import { editTableButton } from '@/utils/tableButtons'

export const useBranches = () => {
    const modalStore = useModalStore()
    const MODAL_ID = 'branch-modal'

    const getTableColumns = (): ColumnTableType[] => {
        const columns = [
            {
                header: 'Empresa',
                accessorKey: 'companyName'
            },
            {
                header: 'Nombre',
                accessorKey: 'name'
            },
            {
                header: 'Dirección',
                accessorKey: 'address'
            },
            {
                header: 'Teléfono',
                accessorKey: 'phone'
            },
            {
                header: 'Estado',
                accessorKey: 'active',
                cell: ({ row }: any) => {
                    const isActive = row.original.active
                    return isActive
                        ? h('span', { class: 'badge badge-sm badge-success' }, 'Activa')
                        : h('span', { class: 'badge badge-sm badge-error' }, 'Inactiva')
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
                            title: 'Editar sucursal',
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
