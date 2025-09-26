import { defineStore } from 'pinia'
import { OrderManagementRecordsTranslatedType } from '@inventario/Operacion/GestionDePedidos/types/orderManagementTypes'

const initialOrderManagement: OrderManagementRecordsTranslatedType = {
    id: undefined,
    folio: '',
    supplierId: 0,
    supplier: '',
    date: '',
    state: '',
    stateId: 0
}

const useOrderManagementStore = defineStore('order-management-store', {
    state: () => ({
        currentOrderId: 0 as number,
        selectedOrderManagement: initialOrderManagement as OrderManagementRecordsTranslatedType,
        modalId: 'order-management-modal'
    }),
    actions: {
        setData(data: OrderManagementRecordsTranslatedType = initialOrderManagement) {
            this.selectedOrderManagement = data
        }
    }
})

export default useOrderManagementStore
