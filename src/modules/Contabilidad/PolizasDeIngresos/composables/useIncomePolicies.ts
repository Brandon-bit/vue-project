import useIncomePoliciesStore from '@/modules/Contabilidad/PolizasDeIngresos/store/incomePoliciesStore'
import { useModalStore } from '@/shared/stores/modal.store'
import type { ColumnTableType } from '@/shared/types/columnTableType'
import { h } from 'vue'
import { editTableButton, deleteTableButton } from '@/utils/tableButtons'

const useIncomePolicies = () => {
    const incomePoliciesStore = useIncomePoliciesStore()
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
                header: 'Cliente',
                accessorKey: 'client',
                cell: ({ row }: any) => {
                    return h('span', {}, row.original.client)
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
                header: 'Método de Pago',
                accessorKey: 'paymentMethod',
                cell: ({ row }: any) => {
                    return h(
                        'span',
                        { class: 'badge badge-secondary' },
                        row.original.paymentMethod
                    )
                }
            },
            {
                header: 'Acciones',
                accessorKey: '',
                cell: ({ row }: any) => {
                    const data = row.original
                    const editModal = () => {
                        incomePoliciesStore.setData(data)
                        modalStore.open(incomePoliciesStore.modalId, {
                            type: 'EDIT',
                            title: 'Editar póliza de ingreso'
                        })
                    }
                    const deleteModal = () => {
                        incomePoliciesStore.setData(data)
                        modalStore.open(incomePoliciesStore.modalId, {
                            type: 'DELETE',
                            title: 'Eliminar póliza de ingreso'
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

export default useIncomePolicies
