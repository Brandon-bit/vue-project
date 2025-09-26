import { defineStore } from 'pinia'
import { WarrantyType } from '@inventario/ConfiguracionDeInventario/Garantias/types/warrantyTypes'

const initialWarranty: WarrantyType = {
    id: undefined,
    name: '',
    duration: 0,
    period: 'MESES',
    description: '',
    creationDate: new Date(),
    active: true,
}

const useWarrantyStore = defineStore('warranty-store', {
    state: () => ({
        selectedWarranty: initialWarranty as WarrantyType,
        modalId: 'warranty-modal'
    }),
    actions: {
        setData(data: WarrantyType = initialWarranty) {
            this.selectedWarranty = data
        }
    }
})

export default useWarrantyStore