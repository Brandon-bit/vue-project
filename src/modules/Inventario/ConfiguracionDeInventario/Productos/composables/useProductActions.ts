import useProductStore from '../store/product.store'

export const useProductAction = () => {
    const productStore = useProductStore()
    const createProduct = async (data: any) => {
        console.log(data)
    }

    const editProduct = (data: any) => {
        console.log(data)
    }

    const deleteProduct = (data?: any) => {
        console.log(productStore.selectedProduct)
    }

    return { createProduct, editProduct, deleteProduct }
}
