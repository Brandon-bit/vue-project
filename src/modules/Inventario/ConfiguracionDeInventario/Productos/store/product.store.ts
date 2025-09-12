import { defineStore } from 'pinia'
import { productType } from '../types/productTypes'

const initialProduct: productType = {
    id: undefined,
    SKU: '',
    name: '',
    category: '',
    brand: '',
    price: 0,
    unit: '',
    quantity: 0,
    user: ''
}

const useProductStore = defineStore('category-store', {
    state: () => ({
        products: [] as productType[],
        selectedProduct: null as productType | null,
        modalId: 'product-modal'
    }),
    actions: {
        setData(data: productType = initialProduct) {
            this.selectedProduct = data
        }
    }
})

export default useProductStore
