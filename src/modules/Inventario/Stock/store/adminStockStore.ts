import { defineStore } from 'pinia'
import { AdminStockType } from '@inventario/Stock/types/AdminStockType'

const initialProduct: AdminStockType = {
    id: undefined,
    warehouse: '',
    store: '',
    product: '',
    creationDate: new Date(),
    quantity: 0,
    user: ''
}

const useAdminStockType = defineStore('adminStock-store', {
    state: () => ({
        products: [] as AdminStockType[],
        currentProduct: null as AdminStockType | null,
        modalId: 'AdminStockType-modal'
    }),
    actions: {
        setData(data: AdminStockType = initialProduct) {
            this.currentProduct = data
        }
    }
})

export default useAdminStockType
