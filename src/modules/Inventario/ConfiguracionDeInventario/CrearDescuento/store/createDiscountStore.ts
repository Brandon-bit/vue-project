import { defineStore } from 'pinia'

interface Product {
    id: number
    title: string
}

const createDiscountStore = defineStore('create-discount-store', {
    state: () => ({
        products: {} as Record<number, Product>
    }),
    actions: {
        addProduct(id: number, title: string) {
            this.products[id] = { id, title }
        }
    }
})

export default createDiscountStore
