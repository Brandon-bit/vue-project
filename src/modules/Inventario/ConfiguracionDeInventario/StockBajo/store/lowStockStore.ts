import { LowStockType } from '../types/lowStockTypes'
import { defineStore } from 'pinia'

const initialLowStockProduct: LowStockType = {
    id: undefined,
    almacen: '',
    tienda: '',
    nombre: '',
    categoria: '',
    sku: '',
    cantidad: '',
    cantidadAlerta: '',
    imagen: ''
}

const useLowStockStore = defineStore('low-stock-store', {
    state: () => ({
        lowStock: [] as LowStockType[],
        currentLowStockProduct: null as LowStockType | null,
        modalId: 'low-stock-modal'
    }),
    actions: {
        setData(data: LowStockType = initialLowStockProduct) {
            this.currentLowStockProduct = data
        }
    }
})

export default useLowStockStore
