import { ColumnTableType } from '@/shared/types/columnTableType'
import { h  , withDirectives } from 'vue'
import useUnitStore from '../store/unit.store';
import { useModalStore } from '@/shared/stores/modal.store'

const useUnit = () => {

    const unitStore = useUnitStore()
    const modalStore = useModalStore()

    const getUnitsTableColumns = () : ColumnTableType[] => {
        const columns = [
            {
                header: 'Unidad',
                accessorKey: 'name'
            },
            {
                header: 'Abreviación',
                accessorKey: 'shortName'
            },
            {
                header: 'Cantidad de Productos',
                accessorKey: 'productsCount'
            },
            {
                header: 'Fecha de Creación',
                accessorKey: 'creationDate',
                cell: ({ row }: any) => {
                    const creationDate = new Date(row.original.creationDate)
                    return h('p', {}, creationDate.toISOString().split("T")[0])
                }
            },
            {
                header: 'Estado',
                accessorKey: 'active',
                cell: ({ row } : any) => {
                    const isActive = row.original.active    
                    return isActive
                        ? h('span', { class: 'badge badge-sm badge-success' }, 'Activo')
                        : h('span', { class: 'badge badge-sm badge-error' }, 'Inactivo')
                }
            },
            {
                header: 'Acciones',
                accessorKey: '',
                cell: ({ row } : any) => {
                    const data = row.original
                    
                    return h('div', { class: 'flex gap-4 justify-center' }, [
                        withDirectives(
                            h(
                                'div',
                                { 
                                    class: 'tooltip', 
                                    'data-tip': 'Editar' 
                                },
                                [
                                    h('button', { 
                                    class: 'btn btn-outline btn-primary action-btn-table',
                                    onClick: () => {
                                        unitStore.setData(data)
                                        modalStore.open(unitStore.modalId, {
                                            type: 'EDIT',
                                            title: 'Editar Unidad'
                                        })
                                    }
                                    }, [h('span', { class: 'material-symbols-outlined' }, 'edit_square')])
                                ]
                            ),
                            []
                        ),
                        withDirectives(
                            h(
                                'div',
                                { 
                                    class: 'tooltip', 
                                    'data-tip': 'Eliminar' 
                                },
                                [
                                    h('button', { 
                                    class: 'btn btn-outline btn-error action-btn-table',
                                    onClick: () => {
                                        unitStore.setData(data)
                                        modalStore.open(unitStore.modalId, {
                                            type: 'DELETE',
                                            title: 'Eliminar Unidad'
                                        })
                                    }
                                    }, [h('span', { class: 'material-symbols-outlined' }, 'delete')])
                                ]
                            ),
                            []
                        )
                    ])
                }
            }
        ]

        return columns;
    }

    return { getUnitsTableColumns }
}

export default useUnit