import useFixedAssetsStore from '@/modules/Contabilidad/ActivosFijos/store/fixedAssetsStore'
import { useModalStore } from '@/shared/stores/modal.store'
import type { ColumnTableType } from '@/shared/types/columnTableType'
import { h } from 'vue'

const useFixedAssets = () => {
    const fixedAssetsStore = useFixedAssetsStore()
    const modalStore = useModalStore()

    const getTableColumns = (): ColumnTableType[] => {
        const columns = [
            {
                header: 'ID',
                accessorKey: 'id',
                cell: ({ row }: any) => {
                    const id = row.original.id
                    return h('span', { class: 'font-medium' }, id)
                }
            },
            {
                header: 'Descripción',
                accessorKey: 'description',
                cell: ({ row }: any) => {
                    const description = row.original.description
                    return h('div', { class: 'max-w-xs truncate' }, description)
                }
            },
            {
                header: 'Fecha Adquisición',
                accessorKey: 'acquisitionDate',
                cell: ({ row }: any) => {
                    const date = new Date(row.original.acquisitionDate)
                    return h('p', {}, date.toLocaleDateString('es-MX'))
                }
            },
            {
                header: 'Valor Original',
                accessorKey: 'originalValue',
                cell: ({ row }: any) => {
                    const value = row.original.originalValue
                    return h('span', { class: 'font-semibold' }, 
                        `$${value.toLocaleString('es-MX')}`
                    )
                }
            },
            {
                header: 'Área',
                accessorKey: 'area',
                cell: ({ row }: any) => {
                    const area = row.original.area
                    return h('span', { class: 'badge badge-outline' }, area)
                }
            },
            {
                header: 'Responsable',
                accessorKey: 'responsible'
            },
            {
                header: 'Estatus',
                accessorKey: 'status',
                cell: ({ row }: any) => {
                    const status = row.original.status
                    const isActive = status === 'Activo'
                    return isActive
                        ? h('span', { class: 'badge badge-sm badge-success' }, 'Activo')
                        : h('span', { class: 'badge badge-sm badge-error' }, 'Dado de baja')
                }
            },
            {
                header: 'Acciones',
                accessorKey: '',
                cell: ({ row }: any) => {
                    const data = row.original
                    
                    const viewModal = () => {
                        fixedAssetsStore.setData(data)
                        modalStore.open(fixedAssetsStore.modalId, {
                            type: 'VIEW',
                            title: 'Detalle del Activo Fijo'
                        })
                    }

                    const viewButton = h(
                        'button',
                        {
                            class: 'btn btn-sm btn-ghost',
                            onClick: viewModal
                        },
                        [
                            h('span', { class: 'material-symbols-outlined' }, 'visibility')
                        ]
                    )

                    return h('div', { class: 'flex gap-2 justify-center' }, [viewButton])
                }
            }
        ]

        return columns
    }

    return { getTableColumns }
}

export default useFixedAssets
