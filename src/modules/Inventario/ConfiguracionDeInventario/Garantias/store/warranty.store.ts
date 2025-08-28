import { defineStore } from 'pinia'
import { WarrantyType } from '../types/warrantyType'

const initialWarranty: WarrantyType = {
    id: undefined,
    name: '',
    duration: 0,
    period: 'month',
    description: '',
    active: true,
}

const useWarrantyStore = defineStore('warranty-store', {
    state: () => ({
        warranties: [] as WarrantyType[],
        selectedWarranty: initialWarranty as WarrantyType,
        modalId: 'warranty-modal'
    }),
    actions: {
        setData(data: WarrantyType = initialWarranty) {
            this.selectedWarranty = data
        },
        async removeItemFromBrands(index: number) {
            this.warranties.splice(index, 1)
        }
    }
})

export default useWarrantyStore