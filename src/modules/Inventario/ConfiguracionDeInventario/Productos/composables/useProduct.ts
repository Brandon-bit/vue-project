import { getProductsService } from '../services/productServices'
import useProductStore from '../store/product.store'
import useProductDomainStore from '../../Producto/store/productDomain.store'
import { useModalStore } from '@/shared/stores/modal.store'
import { ColumnTableType } from '@/shared/types/columnTableType'
import { h } from 'vue'
import { editTableButton, deleteTableButton, detailTableButton } from '@/utils/tableButtons'
import router from '@/router'
export const useProduct = () => {
    const productStore = useProductStore()
    const productDomainStore = useProductDomainStore()
    const modalStore = useModalStore()
    const getProducts = async () => {
        const response = await getProductsService()
        productStore.products = response
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
                        productStore.setData(data)
                        router.push('/inventario/configuracion/editar-producto')
                    }
                    const deleteModal = () => {
                        productStore.setData(data)
                        modalStore.open(productStore.modalId, {
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
