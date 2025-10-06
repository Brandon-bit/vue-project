import { defineStore } from 'pinia'
import { ProductType } from '@inventario/ConfiguracionDeInventario/Productos/types/productsTypes'

const initialProduct: ProductType = {
    id: 0,
    sku: '',
    name: '',
    categoryId: 0,
    categoryName: '',
    brandId: 0,
    brandName: '',
    price: 0,
    unitId: 0,
    unitName: '',
    quantity: 0,
    urlImage: '',
}

const useProductsStore = defineStore('products-store', {
    state: () => ({
        selectedProduct: initialProduct as ProductType,
        modalId: 'product-modal'
    }),
    actions: {
        setData(data: ProductType = initialProduct) {
            this.selectedProduct = data
        }
    }
})

export default useProductsStore
