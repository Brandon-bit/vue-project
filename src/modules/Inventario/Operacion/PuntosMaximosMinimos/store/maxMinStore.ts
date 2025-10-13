import { defineStore } from 'pinia'
import { InventoryThresholdDTO } from '@inventario/Operacion/PuntosMaximosMinimos/types/maxMinTypes'

const initialProduct: InventoryThresholdDTO = {
    id: undefined,
    sku: '',
    productId: 0,
    productName: '',
    minimum: 0,
    maximum: 0,
    stock: 0,
    reorderPoints: 0,
    suggestion: ''
}

const useMaxMinStore = defineStore('max-min-points-store', {
    state: () => ({
        maxMinProducts: [] as InventoryThresholdDTO[],
        selectedProduct: null as InventoryThresholdDTO | null,
        modalId: 'max-min-points-modal'
    }),
    actions: {
        setData(data: InventoryThresholdDTO = initialProduct) {
            console.log(data)
            this.selectedProduct = { ...data }
        }
    }
})

export default useMaxMinStore
