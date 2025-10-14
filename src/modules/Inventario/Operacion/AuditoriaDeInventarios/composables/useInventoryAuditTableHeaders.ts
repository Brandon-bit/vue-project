import { ColumnTableType } from '@/shared/types/columnTableType'
import { h } from 'vue'
import { editTableButton } from '@/utils/tableButtons'
import router from '@/router'
export const useInventoryAuditTableHeaders = (): ColumnTableType[] => {
    return [
        {
            header: 'Fecha',
            accessorKey: 'date'
        },
        {
            header: 'Auditor',
            accessorKey: 'auditorName'
        },
        {
            header: 'Calificacion',
            accessorKey: 'calification'
        },
        {
            header: 'Productos auditados',
            accessorKey: 'auditedProducts'
        },
        {
            header: 'Nota',
            accessorKey: 'generalNote'
        },
        {
            header: 'Estado',
            accessorKey: '',
            cell: ({ row }: any) => {
                const data = row.original
                const states: Record<number, string> = {
                    1: 'info', //borrador
                    2: 'success', //finalizada
                    3: 'warning', //ajustada
                    4: 'error' //cancelado
                }

                const color = states[data.stateId] || 'neutral'

                return h('span', { class: `badge badge-sm badge-${color}` }, `${data.state}`)
            }
        },
        {
            header: 'Acciones',
            accessorKey: '',
            cell: ({ row }: any) => {
                const data = row.original

                const changeEditView = () => {
                    router.push(
                        `/inventario/operacion/actualizar-auditoria-de-inventario/${data.id}`
                    )
                }
                const editButton = editTableButton(changeEditView)

                return h('div', { class: 'flex gap-4 justify-center' }, [editButton])
            }
        }
    ]
}
