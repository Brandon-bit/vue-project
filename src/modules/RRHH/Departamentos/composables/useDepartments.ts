import useDepartmentStore from '@/modules/RRHH/Departamentos/store/departmentStore'
import { useModalStore } from '@/shared/stores/modal.store'
import { ColumnTableType } from '@/shared/types/columnTableType'
import { h } from 'vue'
import { editTableButton } from '@/utils/tableButtons'

export const useDepartments = (): ColumnTableType[] => {
    const departmentStore = useDepartmentStore()
    const modalStore = useModalStore()

    return [
        {
            header: 'Nombre',
            accessorKey: 'name'
        },
        {
            header: 'Descripción',
            accessorKey: 'description',
            cell: ({ row }: any) => {
                const description = row.original.description
                return h(
                    'span',
                    {
                        class: 'text-sm text-gray-600'
                    },
                    description || 'Sin descripción'
                )
            }
        },
        {
            header: 'Estado',
            accessorKey: 'active',
            cell: ({ row }: any) => {
                const isActive = row.original.active
                return h(
                    'span',
                    {
                        class: `badge ${isActive ? 'badge-success' : 'badge-error'}`
                    },
                    isActive ? 'Activo' : 'Inactivo'
                )
            }
        },
        {
            header: 'Acciones',
            accessorKey: '',
            cell: ({ row }: any) => {
                const data = row.original
                const editModal = () => {
                    departmentStore.setData(data)
                    modalStore.open(departmentStore.modalId, {
                        type: 'UPDATE',
                        title: 'Editar departamento'
                    })
                }
                const editButton = editTableButton(editModal)
                return h('div', { class: 'flex gap-4 justify-center' }, [editButton])
            }
        }
    ]
}
