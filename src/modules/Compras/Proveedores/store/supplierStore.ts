import { defineStore } from 'pinia'
import type { SupplierType } from '@/modules/Compras/Proveedores/types/supplierTypes'

const useSupplierStore = defineStore('supplier-store', {
    state: () => ({
        modalId: 'supplier-modal',
        selectedSupplier: null as SupplierType | null,
        searchTerm: '',
        selectedCategory: 'todos'
    }),
    actions: {
        setSelectedSupplier(supplier: SupplierType | null) {
            this.selectedSupplier = supplier
        },
        setSearchTerm(term: string) {
            this.searchTerm = term
        },
        setSelectedCategory(category: string) {
            this.selectedCategory = category
        },
        reset() {
            this.selectedSupplier = null
            this.searchTerm = ''
            this.selectedCategory = 'todos'
        }
    }
})

export default useSupplierStore
