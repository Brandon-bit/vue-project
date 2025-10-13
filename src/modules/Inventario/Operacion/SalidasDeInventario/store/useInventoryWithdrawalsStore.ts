import { defineStore } from 'pinia'
import {
    InventoryWithdrawalForm,
    Product
} from '@inventario/Operacion/SalidasDeInventario/types/inventoryWithdrawalsTypes'

const initialInventoryEntry: InventoryWithdrawalForm = {
    id: 0,
    warehouseId: 0,
    destinationId: 0,
    date: '',
    referenceDocument: '',
    movementTypeId: 0,
    stateId: 0,
    observations: ''
}

const initialCurrentProduct: Product = {
    id: 0,
    productId: 0,
    productName: '',
    quantity: 0,
    unitPrice: 0,
    subtotal: 0,
    batch: '',
    expirationDate: ''
}

const useInventoryWithdrawalsStore = defineStore('inventory-Withdrawals-store', {
    state: () => ({
        selectedInventoryWithdrawal: initialInventoryEntry as InventoryWithdrawalForm,
        modalId: 'inventory-entry-modal',
        addedProducts: [] as Product[],
        currentProduct: initialCurrentProduct as Product,
        indexProduct: 0 as number
    }),
    actions: {
        setData(data: InventoryWithdrawalForm = initialInventoryEntry) {
            this.selectedInventoryWithdrawal = data
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

export default useInventoryWithdrawalsStore
