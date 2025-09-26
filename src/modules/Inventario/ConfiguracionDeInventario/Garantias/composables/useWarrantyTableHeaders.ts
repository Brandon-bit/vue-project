import { ColumnTableType } from "@/shared/types/columnTableType";
import { h  , withDirectives } from 'vue'
import { useModalStore } from '@/shared/stores/modal.store'
import useWarrantyStore from '@/modules/Inventario/ConfiguracionDeInventario/Garantias/store/warrantyStore'

export const useWarrantyTableHeaders = () : ColumnTableType[] => {
    const modalStore = useModalStore()
    const warrantyStore = useWarrantyStore()

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

                return h('span', { class: '' }, formatDuration(duration, period))
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

const formatDuration = (duration : number, period : string) => {
    switch(period){
        case "DIAS":
            return duration === 1 ? `${duration} día` : `${duration} días`;
        case "SEMANAS":
            return duration === 1 ? `${duration} semana` : `${duration} semanas`;
        case "MESES":
            return duration === 1 ? `${duration} mes` : `${duration} meses`;
        default:
            return duration === 1 ? `${duration} año` : `${duration} años`;
    }
}