import { defineStore } from 'pinia'
import { AdminStockType } from '@/modules/Inventario/Stock/AdministrarStock/types/adminStockType'

const initialProduct: AdminStockType = {
    id: '',
    idWarehouse: '',
    idProduct: '',
    idMovimiento: '',
    quantity: 0,
    unitCost: 0,
    stockAnterior: 0,
    stockResultante: 0,
    idUser: '',
    creationDate: new Date(),
    updateDate: new Date(),
    activo: '',
    eliminado: ''
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
