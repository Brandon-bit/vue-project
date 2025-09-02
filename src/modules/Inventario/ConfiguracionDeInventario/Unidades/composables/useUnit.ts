import { getUnitsService } from '../services/unitServices';
import { ColumnTableType } from '@/shared/types/columnTableType'
import { h  , withDirectives } from 'vue'
import useUnitStore from '../store/unit.store';
import { useModalStore } from '@/shared/stores/modal.store'

export const useUnit = () => {
    const unitStore = useUnitStore()
    const modalStore = useModalStore()
    
    const getUnits = async () => {
        try{
            const response = await getUnitsService()
            unitStore.units = response
        }
        catch(error){}
    }

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
                accessorKey: 'creationDate'
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

    return {
        getUnits,
        getUnitsTableColumns
    }
}