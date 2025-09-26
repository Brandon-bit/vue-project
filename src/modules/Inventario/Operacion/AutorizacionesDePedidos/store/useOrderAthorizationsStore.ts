import { defineStore } from 'pinia'

interface OrderAuthorization {
    id: number
    type: number
}
const initialOrderAuthorization: OrderAuthorization = {
    id: 0,
    type: 0
}

const useOrderAuthorizationsStore = defineStore('inventory-audit-store', {
    state: () => ({
        selectedOderAuthorization: initialOrderAuthorization as OrderAuthorization,
        modalId: 'order-authorization-modal'
    }),
    actions: {
        setData(data: OrderAuthorization = initialOrderAuthorization) {
            this.selectedOderAuthorization.id = data.id
            this.selectedOderAuthorization.type = 0
        }
    }
})

export default useOrderAuthorizationsStore
