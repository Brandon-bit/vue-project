import { defineStore } from 'pinia'
import { InventoryThresholdsResponseType } from '@inventario/Operacion/PuntosMaximosMinimos/types/maxMinTypes'

const initialProduct: InventoryThresholdsResponseType = {
    id: undefined,
    sku: '',
    name: '',
    minimum: 0,
    maximum: 0,
    stock: 0,
    reorderPoints: 0,
    suggestion: ''
}

const useMaxMinStore = defineStore('max-min-points-store', {
    state: () => ({
        maxMinProducts: [] as InventoryThresholdsResponseType[],
        selectedProduct: null as InventoryThresholdsResponseType | null,
        modalId: 'max-min-points-modal'
    }),
    actions: {
        setData(data: InventoryThresholdsResponseType = initialProduct) {
            console.log(data)
            this.selectedProduct = { ...data }
        }
    }
})

export default useMaxMinStore
