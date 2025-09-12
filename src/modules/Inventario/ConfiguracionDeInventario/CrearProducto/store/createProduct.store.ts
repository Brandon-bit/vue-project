import { defineStore } from 'pinia'
import { CreateVariantFormType } from '../types/createProductTypes'

const initialValuesCreateVariant: CreateVariantFormType = {
    variant: '',
    variantValue: '',
    skuVariant: '',
    barcodeSimbology: '',
    itemBarcode: '',
    quantity: '',
    quantityAlert: '',
    price: '',
    taxType: '',
    tax: '',
    discountType: '',
    discountValue: '',
    variantImage: [],
    dragDropImage: []
}

const useCreateProductStore = defineStore('create-product-store', {
    state: () => ({
        sequential: '000',
        numberBarcode: '',
        category: '',
        brand: '',
        unit: '',
        slug: '',
        categories: [],
        brands: [],
        units: [],
        barcodeSimbologies: [],
        taxTypes: [],
        taxes: [],
        discountTypes: [],
        selectedVariantIndex: 0,
        currentVariantRef: 0 as number | null,
        variantsData: [] as CreateVariantFormType[],
        currentVariant: null as CreateVariantFormType | null,
        modalId: 'add-variable-product-modal'
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
        },
        setData(id: number | null = null) {
            // console.log(id)
            this.currentVariantRef = id
            this.currentVariant = id === null ? initialValuesCreateVariant : this.variantsData[id]
        }
    }
})

export default useCreateProductStore
