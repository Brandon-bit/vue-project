import { defineStore } from 'pinia'
import type { ProductType } from '@/modules/Compras/CatalogoDeProductos/types/productCatalogTypes'

const initialProduct: ProductType = {
    id: undefined,
    code: '',
    name: '',
    category: '',
    unit: '',
    estimatedCost: 0,
    preferredSupplier: '',
    accountingAccount: '',
    description: ''
}

const useProductCatalogStore = defineStore('product-catalog-store', {
    state: () => ({
        selectedProduct: initialProduct as ProductType,
        modalId: 'product-catalog-modal',
        searchTerm: '',
        selectedCategory: 'todos'
    }),
    actions: {
        setData(data: ProductType = initialProduct) {
            this.selectedProduct = JSON.parse(JSON.stringify(data))
        },
        setSearchTerm(term: string) {
            this.searchTerm = term
        },
        setSelectedCategory(category: string) {
            this.selectedCategory = category
        }
    }
})

export default useProductCatalogStore
