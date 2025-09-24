import { getUnitsService } from '../services/unitServices';
import { ColumnTableType } from '@/shared/types/columnTableType'
import { h  , withDirectives } from 'vue'
import useUnitStore from '../store/unit.store';
import { useModalStore } from '@/shared/stores/modal.store'
import { UnitType } from '../types/unitType';
import { UnitResponseType } from '../types/unitResponseType';
import { UnitFormType } from '../types/unitFormType';
import { UnitRequestType } from '../types/unitRequestType';

export const useUnit = () => {
    const unitStore = useUnitStore()
    const modalStore = useModalStore()
    
    const getUnits = async (page : number, pageSize : number) : Promise<{ items: UnitType[], total: number }> => {
        const response = await getUnitsService(page, pageSize)
        return {
            items: response.data.items.map(mapUnit),
            total: response.data.totalItems
        }
    }

    const mapUnit = (model : UnitResponseType) : UnitType => {
        return {
            id: model.id,
            name: model.nombre,
            shortName: model.nombreCorto,
            active: model.activo,
            creationDate: model.fechaCreacion,
            productsCount: 0
        }
    }

    const mapUnitRequest = (model : UnitFormType) : UnitRequestType => {
        return {
            Nombre: model.name,
            NombreCorto: model.shortName,
            FechaCreacion: new Date().toISOString(),
            FechaActualizacion: new Date().toISOString(),
            Activo: model.active,
            Eliminado: false
        }
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

    return {
        getUnits,
        getUnitsTableColumns,
        mapUnitRequest,
        mapUnit
    }
}