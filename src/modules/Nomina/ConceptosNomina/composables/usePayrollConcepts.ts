import usePayrollConceptStore from '@/modules/Nomina/ConceptosNomina/store/payrollConceptStore'
import { useModalStore } from '@/shared/stores/modal.store'
import { ColumnTableType } from '@/shared/types/columnTableType'
import { h } from 'vue'
import { editTableButton, deleteTableButton } from '@/utils/tableButtons'

export const usePayrollConcepts = (): ColumnTableType[] => {
    const payrollConceptStore = usePayrollConceptStore()
    const modalStore = useModalStore()

    return [
        {
            header: 'Clave',
            accessorKey: 'code'
        },
        {
            header: 'Nombre',
            accessorKey: 'name'
        },
        {
            header: 'Tipo',
            accessorKey: 'type',
            cell: ({ row }: any) => {
                const tipo = row.original.type
                return h(
                    'span',
                    {
                        class: `badge ${tipo === 'percepcion' ? 'badge-success' : 'badge-warning'}`
                    },
                    tipo === 'percepcion' ? 'Percepción' : 'Deducción'
                )
            }
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
            header: 'Variable',
            accessorKey: 'isVariable',
            cell: ({ row }: any) => {
                const isVariable = row.original.isVariable
                return h(
                    'span',
                    {
                        class: 'text-sm'
                    },
                    isVariable ? 'Sí' : 'No'
                )
            }
        },
        {
            header: 'Monto/Porcentaje',
            accessorKey: '',
            cell: ({ row }: any) => {
                const concept = row.original
                if (concept.fixedAmount) {
                    return h('span', { class: 'text-sm' }, `$${concept.fixedAmount.toFixed(2)}`)
                }
                if (concept.percentage) {
                    return h('span', { class: 'text-sm' }, `${concept.percentage}%`)
                }
                return h('span', { class: 'text-sm text-gray-400' }, 'Variable')
            }
        },
        {
            header: 'ISR',
            accessorKey: 'appliesISR',
            cell: ({ row }: any) => {
                const applies = row.original.appliesISR
                return h(
                    'span',
                    {
                        class: `badge badge-sm ${applies ? 'badge-info' : 'badge-ghost'}`
                    },
                    applies ? 'Sí' : 'No'
                )
            }
        },
        {
            header: 'IMSS',
            accessorKey: 'appliesIMSS',
            cell: ({ row }: any) => {
                const applies = row.original.appliesIMSS
                return h(
                    'span',
                    {
                        class: `badge badge-sm ${applies ? 'badge-info' : 'badge-ghost'}`
                    },
                    applies ? 'Sí' : 'No'
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
                    payrollConceptStore.setData(data)
                    modalStore.open(payrollConceptStore.modalId, {
                        type: 'UPDATE',
                        title: 'Editar concepto de nómina'
                    })
                }
                const deleteModal = () => {
                    payrollConceptStore.setData(data)
                    modalStore.open(payrollConceptStore.modalId, {
                        type: 'DELETE',
                        title: 'Eliminar concepto de nómina'
                    })
                }
                const editButton = editTableButton(editModal)
                const deleteButton = deleteTableButton(deleteModal)
                return h('div', { class: 'flex gap-4 justify-center' }, [editButton, deleteButton])
            }
        }
    ]
}
