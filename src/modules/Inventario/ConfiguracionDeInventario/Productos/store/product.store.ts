import { defineStore } from 'pinia'

const useProductStore = defineStore('product-store', {
    state: () => ({
        sequential: '000',
        numberBarcode: '',
        selectedVariantIndex: 0,
        category: '',
        brand: '',
        unit: '',
        slug: '',
        variantsData: [],
        categories: [],
        brands: [],
        units: [],
        barcodeSimbologies: [],
        taxTypes: [],
        taxes: [],
        discountTypes: []
    }),
    actions: {
        changeSequentialValue(type: boolean) {
            const incrementSequential = type
                ? parseInt(this.sequential, 10) + 1
                : parseInt(this.sequential, 10) - 1
            const newSequential = incrementSequential.toString().padStart(3, '0')
            this.sequential = newSequential
            return newSequential
        },
        async removeItemVariantsData(index: number) {
            this.variantsData.splice(index, 1)
        }
    }
})

export default useProductStore
