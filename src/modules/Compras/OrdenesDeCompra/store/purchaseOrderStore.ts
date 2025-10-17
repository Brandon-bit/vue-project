import { defineStore } from 'pinia'
import type { ApprovedRequestType, PurchaseOrderType } from '@/modules/Compras/OrdenesDeCompra/types/purchaseOrderTypes'

const usePurchaseOrderStore = defineStore('purchase-order-store', {
    state: () => ({
        modalId: 'purchase-order-modal',
        creationMode: 'solicitud' as 'solicitud' | 'directa',
        selectedRequest: null as ApprovedRequestType | null,
        selectedOrder: null as PurchaseOrderType | null
    }),
    actions: {
        setCreationMode(mode: 'solicitud' | 'directa') {
            this.creationMode = mode
        },
        setSelectedRequest(request: ApprovedRequestType | null) {
            this.selectedRequest = request
        },
        setSelectedOrder(order: PurchaseOrderType | null) {
            this.selectedOrder = order
        },
        reset() {
            this.creationMode = 'solicitud'
            this.selectedRequest = null
        }
    }
})

export default usePurchaseOrderStore
