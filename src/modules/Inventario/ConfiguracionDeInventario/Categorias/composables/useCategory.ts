import useCategoryStore from '@/modules/Inventario/ConfiguracionDeInventario/Categorias/store/categoryStore'
import { useModalStore } from '@/shared/stores/modal.store'
import type { ColumnTableType } from '@/shared/types/columnTableType'
import { h } from 'vue'
import { editTableButton, deleteTableButton } from '@/utils/tableButtons'
import type { CategoryType } from '@inventario/ConfiguracionDeInventario/Categorias/types/CategoryType'
import type { CategoryApiType } from '@inventario/ConfiguracionDeInventario/Categorias/types/CategoryApiType'
import type { CategoryFormType } from '@inventario/ConfiguracionDeInventario/Categorias/types/CategoryFormType'
import type { CategoryRequestType } from '@inventario/ConfiguracionDeInventario/Categorias/types/CategoryRequestType'
import { getCategoriesService } from '@inventario/ConfiguracionDeInventario/Categorias/services/categoryService'

export const useCategory = () => {
    const categoryStore = useCategoryStore()
    const modalStore = useModalStore()

    const getCategories = async (page : number, pageSize : number) : Promise<{ items: CategoryType[], total: number }> => {
        const response = await getCategoriesService(page, pageSize)
        return {
            items: response.data.items.map(mapCategory),
            total: response.data.totalItems
        }
    }

    const mapCategory = (model : CategoryApiType) : CategoryType => {
        return {
            id: model.id,
            name: model.nombre,
            slug: model.slug,
            status: model.activo,
            creationDate: model.fechaCreacion
        }
    }

    const mapCategoryRequest = (model : CategoryFormType) : CategoryRequestType => {
        return {
            Nombre: model.name,
            Slug: model.slug,
            Activo: model.status,
            Eliminado: false
        }
    }

    const getTableColumns = (): ColumnTableType[] => {
        const columns = [
            {
                header: 'Categoría',
                accessorKey: 'name'
            },
            {
                header: 'Slug',
                accessorKey: 'slug'
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
                        categoryStore.setData(data)
                        modalStore.open(categoryStore.modalId, {
                            type: 'EDIT',
                            title: 'Editar categoría'
                        })
                    }
                    const deleteModal = () => {
                        categoryStore.setData(data)
                        modalStore.open(categoryStore.modalId, {
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

    return { getTableColumns, mapCategory, mapCategoryRequest, getCategories }
}
