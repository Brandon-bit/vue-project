import { defineStore } from 'pinia'
import {
    InventoryAuditSummaryDTO,
    InventoryAuditForm,
    Product
} from '@inventario/Operacion/AuditoriaDeInventarios/types/inventoryAuditTypes'

const initialInventoryAudit: InventoryAuditForm = {
    id: 0,
    date: '',
    auditorId: 0,
    stateId: 0,
    generalNote: ''
}

const initialCurrentProduct: Product = {
    id: 0,
    productId: 0,
    productName: '',
    realCount: 0,
    expectedCount: 0,
    difference: 0,
    note: ''
}

const useInventoryAuditStore = defineStore('inventory-audit-store', {
    state: () => ({
        selectedInventoryAudit: initialInventoryAudit as InventoryAuditForm,
        summary: [] as InventoryAuditSummaryDTO[],
        modalId: 'inventory-audit-modal',
        addedProducts: [] as Product[],
        currentProduct: initialCurrentProduct as Product,
        indexProduct: 0 as number
    }),
    actions: {
        setData(data: InventoryAuditForm = initialInventoryAudit) {
            this.selectedInventoryAudit = data
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

export default useInventoryAuditStore
