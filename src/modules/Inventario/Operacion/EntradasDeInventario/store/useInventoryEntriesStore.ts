import { defineStore } from 'pinia'
import {
    InventoryEntryForm,
    Product
} from '@inventario/Operacion/EntradasDeInventario/types/inventoryEntriesTypes'

const initialInventoryEntry: InventoryEntryForm = {
    id: 0,
    warehouseId: 0,
    supplierId: 0,
    date: '',
    referenceDocument: '',
    movementTypeId: 0,
    stateId: 0,
    observations: ''
}

const initialCurrentProduct: Product = {
    productId: 0,
    productName: '',
    quantity: 0,
    unitPrice: 0,
    subtotal: 0,
    batch: '',
    expirationDate: ''
}

const useInventoryEntriesStore = defineStore('inventory-entries-store', {
    state: () => ({
        selectedInventoryEntry: initialInventoryEntry as InventoryEntryForm,
        modalId: 'inventory-entry-modal',
        addedProducts: [] as Product[],
        currentProduct: initialCurrentProduct as Product,
        indexProduct: 0 as number
    }),
    actions: {
        setData(data: InventoryEntryForm = initialInventoryEntry) {
            this.selectedInventoryEntry = data
        },
        setCurrentProductByIndex(index: number | null = null) {
            this.currentProduct = index === null ? initialCurrentProduct : this.addedProducts[index]
        },
        setIndexProduct(index: number) {
            this.indexProduct = index
        },
        removeItemProduct() {
            this.addedProducts.splice(this.indexProduct, 1)
            return 'El producto se eliminó correctamente'
        },
        addProduct(data: Product) {
            this.addedProducts = [...this.addedProducts, data]
            return 'El producto se añadió correctamente'
        },
        updateProduct(data: Product) {
            this.addedProducts[this.indexProduct] = data
            return 'El producto se actualizó correctamente'
        },
        clearAddedProducts() {
            this.addedProducts = []
        }
    }
})

export default useInventoryEntriesStore
