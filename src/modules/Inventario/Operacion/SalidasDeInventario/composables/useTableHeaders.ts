import { ColumnTableType } from '@/shared/types/columnTableType'
import { h } from 'vue'
import { editTableButton } from '@/utils/tableButtons'
import router from '@/router'
export const useTableHeaders = (): ColumnTableType[] => {
    return [
        {
            header: 'Almacén',
            accessorKey: 'warehouseName'
        },
        {
            header: 'Destino',
            accessorKey: 'destinationName'
        },
        {
            header: 'Fecha',
            accessorKey: 'date'
        },
        {
            header: 'Documento de referencia',
            accessorKey: 'referenceDocument'
        },
        {
            header: 'Observaciones',
            accessorKey: 'observations'
        },
        {
            header: 'Tipo de movimiento',
            accessorKey: 'movementType'
        },
        {
            header: 'Estado',
            accessorKey: '',
            cell: ({ row }: any) => {
                const data = row.original

                const states: Record<number, string> = {
                    1: 'success', //Despachado
                    2: 'info', //Parcialmente despachado
                    3: 'warning', //Pendiente
                    4: 'error', //Cancelado
                    5: 'success' //Facturado
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
                    router.push(`/inventario/operacion/actualizar-salida-de-inventario/${data.id}`)
                }
                const editButton = editTableButton(changeEditView)

                return h('div', { class: 'flex gap-4 justify-center' }, [editButton])
            }
        }
    ]
}
