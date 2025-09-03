import { getCategoriesService } from '@inventario/ConfiguracionDeInventario/Categorias/services/categoryService'
import useCategoryStore from '@inventario/ConfiguracionDeInventario/Categorias/store/category.store'
import { useModalStore } from '@/shared/stores/modal.store'
import { ColumnTableType } from '@/shared/types/columnTableType'
import { h } from 'vue'
import { editTableButton, deleteTableButton } from '@/utils/tableButtons'
export const useCategory = () => {
    const categoryStore = useCategoryStore()
    const modalStore = useModalStore()
    const getCategories = async () => {
        const response = await getCategoriesService()
        categoryStore.categories = response
    }

    const getTableColumns = (): ColumnTableType[] => {
        const columns = [
            {
                header: 'Categoría',
                accessorKey: 'name'
            },
            {
                header: 'Sufijo',
                accessorKey: 'sufix'
            },
            {
                header: 'Fecha de Creación',
                accessorKey: 'creationDate'
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

    return { getCategories, getTableColumns }
}
