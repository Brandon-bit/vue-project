import useSubCategoryStore from '@inventario/ConfiguracionDeInventario/SubCategoria/store/subCategoryStore'
import { useModalStore } from '@/shared/stores/modal.store'
import type { ColumnTableType } from '@/shared/types/columnTableType'
import { h } from 'vue'
import { editTableButton, deleteTableButton } from '@/utils/tableButtons'
import { getParentCategoriesService } from '@inventario/ConfiguracionDeInventario/SubCategoria/services/subCategoryService'
import { ParentCategoryType } from '@inventario/ConfiguracionDeInventario/SubCategoria/types/subCategoryTypes'
import { mapParentCategory } from '@inventario/ConfiguracionDeInventario/SubCategoria/composables/mappingSubCategoryData'

export const useSubCategory = () => {
    
    const subCategoryStore = useSubCategoryStore()
    const modalStore = useModalStore()

    const getParentCategories = async (): Promise<ParentCategoryType[]> => {
        try {
            const res = await getParentCategoriesService()
            return res.map(mapParentCategory)
        } catch (error) {
            return [] as ParentCategoryType[]
        }
    }

    const getSubCategoryTableColumns = (): ColumnTableType[] => {
        const columns = [
            {
                header: 'Categoría',
                accessorKey: 'name',
                cell: ({ row } : any) => {
                    const categoryName = row.original.name
                    const imageUrl = row.original.imageUrl
                    const avatar = !(!imageUrl || imageUrl.trim() === "") ? 
                        h('div', { class: 'avatar' }, [
                            h('div', { class: 'mask mask-squircle h-8 w-8' }, [
                                h('img', {
                                src: imageUrl,
                                alt: 'Category image'
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
                            h('div', { class: 'font-bold' }, categoryName)
                            ])
                        ]
                    )
                    return vnode
                }
            },
            {
                header: 'Slug',
                accessorKey: 'slug'
            },
            {
                header: 'Categoría Padre',
                accessorKey: 'parentCateogryName'
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
                accessorKey: 'status',
                cell: ({ row }: any) => {
                    const isActive = row.original.status
                    return isActive
                        ? h('span', { class: 'badge badge-sm badge-success' }, 'Activo')
                        : h('span', { class: 'badge badge-sm badge-error' }, 'Inactivo')
                }
            },
            {
                header: 'Acciones',
                accessorKey: '',
                cell: ({ row }: any) => {
                    const data = row.original
                    const editModal = () => {
                        subCategoryStore.setData(data)
                        modalStore.open(subCategoryStore.modalId, {
                            type: 'EDIT',
                            title: 'Editar categoría'
                        })
                    }
                    const deleteModal = () => {
                        subCategoryStore.setData(data)
                        modalStore.open(subCategoryStore.modalId, {
                            type: 'DELETE',
                            title: 'Eliminar categoría'
                        })
                    }
                    const editButton = editTableButton(editModal)
                    const deleteButton = deleteTableButton(deleteModal)
                    return h('div', { class: 'flex gap-4 justify-center' }, [
                        editButton,
                        deleteButton
                    ])
                }
            }
        ]

        return columns
    }

    return { getSubCategoryTableColumns, getParentCategories }
}
