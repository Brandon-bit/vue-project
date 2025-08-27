import { getBrandsService } from "../services/brandServices"
import { ColumnTableType } from '@/shared/types/columnTableType'
import { h  , withDirectives } from 'vue'
import useBrandStore from "../store/brand.store"
import { useModalStore } from '@/shared/stores/modal.store'

export const useBrand = () => {
    const brandStore = useBrandStore()
    const modalStore = useModalStore()
    
    const getBrands = async () => {
        try{
            const response = await getBrandsService()
            brandStore.brands = response
        }
        catch(error){}
    }

    const getBrandsTableColumns = () : ColumnTableType[] => {
        const columns = [
            {
                header: 'Marca',
                accessorKey: 'name',
                cell: ({ row } : any) => {
                    const brand = row.original.name
                    const imageUrl = row.original.imageUrl

                    const avatar = imageUrl != '' ? 
                        h('div', { class: 'avatar' }, [
                            h('div', { class: 'mask mask-squircle h-8 w-8' }, [
                                h('img', {
                                src: imageUrl,
                                alt: 'Brand image'
                                })
                            ])
                        ]) : 
                        h('div', { class: 'avatar' }, [
                            h('div', { class: 'mask mask-squircle h-8 w-8 bg-secondary-100' }, [
                                h('span', { class: 'material-symbols-outlined' }, 'question_mark')
                            ])
                        ])

                    const vnode = h(
                        'div',
                        { class: 'flex items-center gap-3' },
                        [
                            // avatar
                            avatar,

                            // texto
                            h('div', {}, [
                            h('div', { class: 'font-bold' }, brand)
                            ])
                        ]
                    )
                    return vnode
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
                                        brandStore.setData(data)
                                        modalStore.open(brandStore.modalId, {
                                            type: 'EDIT',
                                            title: 'Editar Marca'
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
                                        brandStore.setData(data)
                                        modalStore.open(brandStore.modalId, {
                                            type: 'DELETE',
                                            title: 'Eliminar Marca'
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
        getBrands,
        getBrandsTableColumns
    }
}