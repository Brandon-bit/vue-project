import { defineStore } from 'pinia'
import type { Product, Store, Warehouse } from '../types/imprimirCodigoDeBarrasTypes'

const useImprimirCodigoDeBarrasStore = defineStore('imprimir-codigo-barras-store', {
    state: () => ({
        products: [] as Product[],
        stores: [] as Store[],
        warehouses: [] as Warehouse[],
        selectedStore: '' as string,
        selectedWarehouse: '' as string,
    }),
    getters: {
        filteredProducts: (state) => {
            return state.products.filter(p => 
                (!state.selectedStore || p.storeId === state.selectedStore) && 
                (!state.selectedWarehouse || p.warehouseId === state.selectedWarehouse)
            )
        }
    }
})

export default useImprimirCodigoDeBarrasStore
