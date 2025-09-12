import { getWarrantiesService } from '../services/warrantyServices'
import { ColumnTableType } from '@/shared/types/columnTableType'
import { h  , withDirectives } from 'vue'
import useWarrantyStore from '../store/warranty.store'
import { useModalStore } from '@/shared/stores/modal.store'
import { WarrantyType } from '../types/warrantyType'

export const useWarranty = () => {
    const warrantyStore = useWarrantyStore()
    const modalStore = useModalStore()
    
    // const getWarranties = async (page : number, pageSize : number) : Promise<{ items: WarrantyType[], total: number }> => {
    //     const response = await getWarrantiesService(page, pageSize)
    //     return {
    //         items: response.data.items.map(mapCategory),
    //         total: response.data.totalItems
    //     }
    // }

    // const mapWarranty = (model : CategoryApiType) : CategoryType => {
    //     return {
    //         id: model.id,
    //         name: model.nombre,
    //         slug: model.slug,
    //         status: model.activo,
    //         creationDate: model.fechaCreacion
    //     }
    // }

    const getWarrantiesTableColumns = () : ColumnTableType[] => {
        const columns = [
            {
                header: 'Garantía',
                accessorKey: 'name'
            },
            {
                header: 'Descripción',
                accessorKey: 'description'
            },
            {
                header: 'Duración',
                accessorKey: 'duration',
                cell: ({ row } : any) => {
                    const duration = row.original.duration
                    const period = row.original.period

                    return h('span', { class: '' }, `${duration} ${period}`)
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
                                        warrantyStore.setData(data)
                                        modalStore.open(warrantyStore.modalId, {
                                            type: 'EDIT',
                                            title: 'Editar Garantía'
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
                                        warrantyStore.setData(data)
                                        modalStore.open(warrantyStore.modalId, {
                                            type: 'DELETE',
                                            title: 'Eliminar Garantía'
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
        getWarranties,
        getWarrantiesTableColumns
    }
}
