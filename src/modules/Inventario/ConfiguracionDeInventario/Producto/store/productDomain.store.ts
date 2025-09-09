import { defineStore } from 'pinia'
import { ref } from 'vue'
import { productDetailType } from '../types/productTypes'

const useProductDomainStore = defineStore('product-domain-store', {
    state: () => ({
        currentProduct: {} as T,
        productsDetail: ref<Record<string, productDetailType>>({})
    }),
    actions: {
        setCurrentProduct<T>(data: T = {} as T) {
            this.currentProduct = data
        },
        setProductsDetail(id: string, data: T = {} as T) {
            this.productsDetail[id] = data
            console.log(this.productsDetail)
        }
    }
})

export default useProductDomainStore
