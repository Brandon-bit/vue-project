import { h } from 'vue'
import router from '@/router'
import { ColumnTableType } from '@/shared/types/columnTableType'
import { useModalStore } from '@/shared/stores/modal.store'
import { editTableButton, deleteTableButton, detailTableButton } from '@/utils/tableButtons'
import { getProductsService } from '@inventario/ConfiguracionDeInventario/Productos/services/productsServices'
import useProductsStore from '@inventario/ConfiguracionDeInventario/Productos/store/productsStore'
export const useProducts = () => {
    const productsStore = useProductsStore()
    const modalStore = useModalStore()
    const getProducts = async () => {
        const response = await getProductsService()
        productsStore.products = response
    }

    const getTableColumns = (): ColumnTableType[] => {
        const columns = [
            {
                header: 'SKU',
                accessorKey: 'sku'
            },
            {
                header: 'Nombre',
                accessorKey: 'name'
            },
            {
                header: 'Categoría',
                accessorKey: 'category'
            },
            {
                header: 'Marca',
                accessorKey: 'brand'
            },
            {
                header: 'Precio',
                accessorKey: 'price'
            },
            {
                header: 'Unidad',
                accessorKey: 'unit'
            },
            {
                header: 'Cantidad',
                accessorKey: 'quantity'
            },
            {
                header: 'Usuario',
                accessorKey: 'user'
            },
            {
                header: 'Acciones',
                accessorKey: '',
                cell: ({ row }: any) => {
                    const data = row.original
                    const editModal = () => {
                        productsStore.setData(data)
                        router.push('/inventario/configuracion/editar-producto')
                    }
                    const deleteModal = () => {
                        productsStore.setData(data)
                        modalStore.open(productsStore.modalId, {
                            type: 'DELETE',
                            title: 'Eliminar producto'
                        })
                    }
                    const detailModal = () => {
                        router.push({ name: 'DetalleProducto', params: { id: data.id } })
                    }
                    const editButton = editTableButton(editModal)
                    const deleteButton = deleteTableButton(deleteModal)
                    const detailButton = detailTableButton(detailModal)
                    return h('div', { class: 'flex gap-4 justify-center' }, [
                        detailButton,
                        editButton,
                        deleteButton
                    ])
                }
            }
        ]

        return columns
    }

    return { getProducts, getTableColumns }
}
