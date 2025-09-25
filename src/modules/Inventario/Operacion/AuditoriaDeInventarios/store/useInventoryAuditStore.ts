import { defineStore } from 'pinia'
import { InventoryAuditSummaryItemTranslatedType } from '@inventario/Operacion/AuditoriaDeInventarios/types/inventoryAuditTypes'
import { InventoryAuditRecordsTranslatedType } from '@inventario/Operacion/AuditoriaDeInventarios/types/inventoryAuditTypes'

type SelectedProduct = {
    id: number
    product: string
}

const initialInventoryAudit: InventoryAuditRecordsTranslatedType = {
    id: undefined,
    date: '',
    auditorId: 0,
    auditorName: '',
    generalNote: '',
    calification: 0,
    auditedProducts: 0
}

const useInventoryAuditStore = defineStore('inventory-audit-store', {
    state: () => ({
        selectedInventoryAudit: initialInventoryAudit as InventoryAuditRecordsTranslatedType,
        summary: [] as InventoryAuditSummaryItemTranslatedType[],
        modalId: 'inventory-audit-modal',
        showAddProductForm: false as boolean,
        isCloseAddProductForm: true as boolean,
        addedProducts: [] as any,
        selectedProduct: null as SelectedProduct | null
    }),
    actions: {
        setData(data: InventoryAuditRecordsTranslatedType = initialInventoryAudit) {
            this.selectedInventoryAudit = data
        },
        setShowAddProductForm(value: boolean) {
            this.showAddProductForm = value
        },
        setIsCloseAddProductForm(value: boolean) {
            this.isCloseAddProductForm = value
        },
        setAddedProducts(product: any) {
            this.addedProducts = [...this.addedProducts, product]
        },
        setSelectedProduct(id: number, product: string) {
            this.selectedProduct = {id, product}
        }
    }
})

export default useInventoryAuditStore
