import { h } from 'vue'
import router from '@/router'
import { ColumnTableType } from '@/shared/types/columnTableType'
import { editTableButton } from '@/utils/tableButtons'

export const useCompanies = () => {
    const getTableColumns = (): ColumnTableType[] => {
        const columns = [
            {
                header: 'Razón Social',
                accessorKey: 'businessName'
            },
            {
                header: 'RFC',
                accessorKey: 'taxId'
            },
            {
                header: 'Domicilio Fiscal',
                accessorKey: 'fiscalAddress'
            },
            {
                header: 'Política de Nómina',
                accessorKey: 'payrollPolicyLabel'
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
                        router.push(`/rrhh/empresas/editar/${data.id}`)
                    }
                    const editButton = editTableButton(editModal)
                    return h('div', { class: 'flex gap-4 justify-center' }, [editButton])
                }
            }
        ]

        return columns
    }

    return { getTableColumns }
}
