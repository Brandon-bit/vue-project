import { defineStore } from 'pinia'
import { productType } from '@inventario/ConfiguracionDeInventario/Productos/types/productsTypes'

const initialProduct: productType = {
    id: undefined,
    sku: '',
    name: '',
    category: '',
    brand: '',
    price: 0,
    unit: '',
    quantity: 0,
    user: '',
    archivo: []
}

const useProductsStore = defineStore('products-store', {
    state: () => ({
        products: [] as productType[],
        currentProduct: null as productType | null,
        modalId: 'product-modal'
    }),
    actions: {
        setData(data: productType = initialProduct) {
            this.currentProduct = data
        }
    }
})

export default useProductsStore
