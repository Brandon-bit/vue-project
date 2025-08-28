import { VariantAttributeValueType } from './../types/variantAttributeValueType';
import { getVariantAttributesService } from '../services/variantAttributeServices';
import { ColumnTableType } from '@/shared/types/columnTableType'
import { h  , withDirectives } from 'vue'
import useVariantAttributeStore from '../store/variantAttribute.store'
import { useModalStore } from '@/shared/stores/modal.store'

export const useVariantAttribute = () => {
    const variantAttributeStore = useVariantAttributeStore()
    const modalStore = useModalStore()
    
    const getVariantAttributes = async () => {
        try{
            const response = await getVariantAttributesService()
            variantAttributeStore.variantAttributes = response
        }
        catch(error){}
    }

    const getVariantAttributesTableColumns = () : ColumnTableType[] => {
        const columns = [
            {
                header: 'Atributo Variante',
                accessorKey: 'name'
            },
            {
                header: 'Valores',
                accessorKey: 'values',
                cell: ({row} : any) => {
                    const values : VariantAttributeValueType[] = row.original.values 

                    return h(
                        'div',
                        { class: 'flex gap-1 flex-wrap' },
                        values.map(item =>
                            h('span', { class: 'badge badge-sm badge-info' }, item.value)
                        )
                    )
                }
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
                                        variantAttributeStore.setData(data)
                                        modalStore.open(variantAttributeStore.modalId, {
                                            type: 'EDIT',
                                            title: 'Editar Atributo Variante'
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
                                        variantAttributeStore.setData(data)
                                        modalStore.open(variantAttributeStore.modalId, {
                                            type: 'DELETE',
                                            title: 'Eliminar Atributo Variante'
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
        getVariantAttributes,
        getVariantAttributesTableColumns
    }
}