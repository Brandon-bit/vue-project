import usePayrollPeriodStore from '@/modules/Nomina/PeriodosNomina/store/payrollPeriodStore'
import { useModalStore } from '@/shared/stores/modal.store'
import { ColumnTableType } from '@/shared/types/columnTableType'
import { h } from 'vue'
import { editTableButton, deleteTableButton, detailTableButton } from '@/utils/tableButtons'
import { useRouter } from 'vue-router'

export const usePayrollPeriods = (): ColumnTableType[] => {
    const payrollPeriodStore = usePayrollPeriodStore()
    const modalStore = useModalStore()
    const router = useRouter()

    return [
        {
            header: 'Nombre',
            accessorKey: 'name'
        },
        {
            header: 'Tipo',
            accessorKey: 'type',
            cell: ({ row }: any) => {
                const tipo = row.original.type
                const badges: Record<string, string> = {
                    semanal: 'badge-info',
                    quincenal: 'badge-primary',
                    mensual: 'badge-secondary'
                }
                return h(
                    'span',
                    {
                        class: `badge ${badges[tipo]}`
                    },
                    tipo.charAt(0).toUpperCase() + tipo.slice(1)
                )
            }
        },
        {
            header: 'Período',
            accessorKey: '',
            cell: ({ row }: any) => {
                const period = row.original
                return h(
                    'span',
                    {
                        class: 'text-sm'
                    },
                    `${period.startDate} al ${period.endDate}`
                )
            }
        },
        {
            header: 'Tipo Nómina',
            accessorKey: 'payrollType',
            cell: ({ row }: any) => {
                const tipo = row.original.payrollType
                return h(
                    'span',
                    {
                        class: `badge ${tipo === 'ordinaria' ? 'badge-success' : 'badge-warning'}`
                    },
                    tipo === 'ordinaria' ? 'Ordinaria' : 'Extraordinaria'
                )
            }
        },
        {
            header: 'Estado',
            accessorKey: 'status',
            cell: ({ row }: any) => {
                const estado = row.original.status
                const badges: Record<string, string> = {
                    borrador: 'badge-ghost',
                    calculada: 'badge-info',
                    pagada: 'badge-success',
                    cerrada: 'badge-error'
                }
                const labels: Record<string, string> = {
                    borrador: 'Borrador',
                    calculada: 'Calculada',
                    pagada: 'Pagada',
                    cerrada: 'Cerrada'
                }
                return h(
                    'span',
                    {
                        class: `badge ${badges[estado]}`
                    },
                    labels[estado]
                )
            }
        },
        {
            header: 'Total Percepciones',
            accessorKey: 'totalPerceptions',
            cell: ({ row }: any) => {
                const total = row.original.totalPerceptions || 0
                return h(
                    'span',
                    {
                        class: 'text-sm font-semibold text-green-600'
                    },
                    `$${total.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`
                )
            }
        },
        {
            header: 'Total Deducciones',
            accessorKey: 'totalDeductions',
            cell: ({ row }: any) => {
                const total = row.original.totalDeductions || 0
                return h(
                    'span',
                    {
                        class: 'text-sm font-semibold text-red-600'
                    },
                    `$${total.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`
                )
            }
        },
        {
            header: 'Total Neto',
            accessorKey: 'totalNet',
            cell: ({ row }: any) => {
                const total = row.original.totalNet || 0
                return h(
                    'span',
                    {
                        class: 'text-sm font-bold text-blue-600'
                    },
                    `$${total.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`
                )
            }
        },
        {
            header: 'Acciones',
            accessorKey: '',
            cell: ({ row }: any) => {
                const data = row.original

                const viewDetail = () => {
                    router.push(`/nomina/detalle-nomina/${data.id}`)
                }

                const editModal = () => {
                    payrollPeriodStore.setData(data)
                    modalStore.open(payrollPeriodStore.modalId, {
                        type: 'UPDATE',
                        title: 'Editar período de nómina'
                    })
                }
                const deleteModal = () => {
                    payrollPeriodStore.setData(data)
                    modalStore.open(payrollPeriodStore.modalId, {
                        type: 'DELETE',
                        title: 'Eliminar período de nómina'
                    })
                }

                const editButton = editTableButton(editModal)
                const detailButton = detailTableButton(viewDetail)
                const deleteButton = deleteTableButton(deleteModal)
                return h('div', { class: 'flex gap-2 justify-center' }, [
                    detailButton,
                    editButton,
                    deleteButton
                ])
            }
        }
    ]
}
