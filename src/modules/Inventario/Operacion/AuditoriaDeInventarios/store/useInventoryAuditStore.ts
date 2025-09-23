import { defineStore } from 'pinia'
import { InventoryAuditSummaryItemTranslatedType } from '@inventario/Operacion/AuditoriaDeInventarios/types/inventoryAuditTypes'
import { InventoryAuditRecordsTranslatedType } from '@inventario/Operacion/AuditoriaDeInventarios/types/inventoryAuditTypes'

const initialInventoryAudit: InventoryAuditRecordsTranslatedType = {
    id: undefined,
    date: '',
    auditorId: 0,
    auditorName: '',
    productId: 0,
    product: '',
    count: 0,
    difference: 0,
    note: ''
}

const useInventoryAuditStore = defineStore('inventory-audit-store', {
    state: () => ({
        selectedInventoryAudit: initialInventoryAudit as InventoryAuditRecordsTranslatedType,
        summary: [] as InventoryAuditSummaryItemTranslatedType[],
        modalId: 'inventory-audit-modal'
    }),
    actions: {
        setData(data: InventoryAuditRecordsTranslatedType = initialInventoryAudit) {
            this.selectedInventoryAudit = data
        },
        setCurrentProduct(id: number, product: string) {
            this.selectedInventoryAudit.product = product
            this.selectedInventoryAudit.productId = id
        }
    }
})

export default useInventoryAuditStore
