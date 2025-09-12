import useProductsStore from '@inventario/ConfiguracionDeInventario/Productos/store/productsStore'

export const useProductsAction = () => {
    const productStore = useProductsStore()

    const editProduct = (data: any) => {
        console.log(data)
    }

    const deleteProduct = (data?: any) => {
        console.log(productStore.selectedProduct)
    }

    const uploadBulkProducts = (data?: any) => {
        console.log(productStore.selectedProduct)
    }

    return { editProduct, deleteProduct, uploadBulkProducts }
}
