import { ColumnTableType } from '@/shared/types/columnTableType'
import { h } from 'vue'
import { EmployeePayrollSummary } from '@/modules/Nomina/DetalleNomina/types/payrollDetailTypes'
import usePayrollDetailStore from '@/modules/Nomina/DetalleNomina/store/payrollDetailStore'
import { useModalStore } from '@/shared/stores/modal.store'
import { detailTableButton, deleteTableButton } from '@/utils/tableButtons'

export const usePayrollDetailColumns = (): ColumnTableType[] => {
    const payrollDetailStore = usePayrollDetailStore()
    const modalStore = useModalStore()

    return [
        {
            header: 'No. Empleado',
            accessorKey: 'employeeNumber'
        },
        {
            header: 'Nombre',
            accessorKey: 'employeeName',
            cell: ({ row }: any) => {
                const employee = row.original as EmployeePayrollSummary
                return h('div', [
                    h('div', { class: 'font-semibold' }, employee.employeeName),
                    h('div', { class: 'text-xs text-gray-500' }, employee.position)
                ])
            }
        },
        {
            header: 'Salario Base',
            accessorKey: 'baseSalary',
            cell: ({ row }: any) => {
                const salary = row.original.baseSalary
                return h(
                    'span',
                    { class: 'text-sm' },
                    `$${salary.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`
                )
            }
        },
        {
            header: 'Total Percepciones',
            accessorKey: 'totalPerceptions',
            cell: ({ row }: any) => {
                const total = row.original.totalPerceptions
                return h(
                    'span',
                    { class: 'text-sm font-semibold text-green-600' },
                    `$${total.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`
                )
            }
        },
        {
            header: 'Total Deducciones',
            accessorKey: 'totalDeductions',
            cell: ({ row }: any) => {
                const total = row.original.totalDeductions
                return h(
                    'span',
                    { class: 'text-sm font-semibold text-red-600' },
                    `$${total.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`
                )
            }
        },
        {
            header: 'Neto a Pagar',
            accessorKey: 'netAmount',
            cell: ({ row }: any) => {
                const total = row.original.netAmount
                return h(
                    'span',
                    { class: 'text-lg font-bold text-blue-600' },
                    `$${total.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`
                )
            }
        },
        {
            header: 'Acciones',
            accessorKey: '',
            cell: ({ row }: any) => {
                const employee = row.original as EmployeePayrollSummary

                const viewConcepts = () => {
                    payrollDetailStore.setEmployee(employee)
                    modalStore.open('employee-concepts-modal', {
                        type: 'VIEW',
                        title: `Detalle de concepto`
                    })
                }

                const viewButton = detailTableButton(viewConcepts)

                return h('div', { class: 'flex gap-2 justify-center' }, [viewButton])
            }
        }
    ]
}
