import useExpensePoliciesStore from '@/modules/Contabilidad/PolizasDeGastos/store/expensePoliciesStore'
import { useModalStore } from '@/shared/stores/modal.store'
import type { ColumnTableType } from '@/shared/types/columnTableType'
import { h } from 'vue'
import { editTableButton, deleteTableButton } from '@/utils/tableButtons'

const useExpensePolicies = () => {
    const expensePoliciesStore = useExpensePoliciesStore()
    const modalStore = useModalStore()

    const getTableColumns = (): ColumnTableType[] => {
        const columns = [
            {
                header: 'Folio',
                accessorKey: 'folio',
                cell: ({ row }: any) => {
                    return h('span', { class: 'font-medium' }, row.original.folio)
                }
            },
            {
                header: 'Fecha',
                accessorKey: 'date',
                cell: ({ row }: any) => {
                    const date = new Date(row.original.date)
                    return h('p', {}, date.toLocaleDateString('es-MX'))
                }
            },
            {
                header: 'Proveedor',
                accessorKey: 'supplier',
                cell: ({ row }: any) => {
                    return h('span', {}, row.original.supplier)
                }
            },
            {
                header: 'Concepto',
                accessorKey: 'concept',
                cell: ({ row }: any) => {
                    return h('span', {}, row.original.concept)
                }
            },
            {
                header: 'Total',
                accessorKey: 'total',
                cell: ({ row }: any) => {
                    const total = row.original.total
                    return h(
                        'span',
                        { class: 'font-mono' },
                        `$${total.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`
                    )
                }
            },
            {
                header: 'Centro de Costo',
                accessorKey: 'costCenter',
                cell: ({ row }: any) => {
                    const costCenterMap: Record<string, string> = {
                        'produccion': 'Producción',
                        'administracion': 'Administración',
                        'ventas': 'Ventas',
                        'marketing': 'Marketing'
                    }
                    return h(
                        'span',
                        { class: 'badge badge-secondary' },
                        costCenterMap[row.original.costCenter] || row.original.costCenter
                    )
                }
            },
            {
                header: 'Acciones',
                accessorKey: '',
                cell: ({ row }: any) => {
                    const data = row.original
                    const editModal = () => {
                        expensePoliciesStore.setData(data)
                        modalStore.open(expensePoliciesStore.modalId, {
                            type: 'EDIT',
                            title: 'Editar póliza de gasto'
                        })
                    }
                    const deleteModal = () => {
                        expensePoliciesStore.setData(data)
                        modalStore.open(expensePoliciesStore.modalId, {
                            type: 'DELETE',
                            title: 'Eliminar póliza de gasto'
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

        return columns
    }

    return { getTableColumns }
}

export default useExpensePolicies
