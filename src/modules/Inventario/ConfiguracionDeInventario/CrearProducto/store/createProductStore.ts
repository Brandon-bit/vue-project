import { defineStore } from 'pinia'
import { 
    CreateVariantFormType, 
    CreateProductFormType,
    SingleProductType,
    ExtraInfoType
} from '@inventario/ConfiguracionDeInventario/CrearProducto/types/createProductTypes'
import { SelectOptionType } from '@/shared/types/selectOptionTypes'

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

const initialValuesCreateProduct : CreateProductFormType = {
    name: '',
    slug: '',
    sku: '',
    idCategory: '0',
    idSubCategory: '0',
    idBrand: '0',
    idUnit: '0',
    barcodeSimbology: '1',
    itemBarcode: '',
    description: '',
    priceAndStock: { price: 0, idTaxType: '0', tax: 0} as SingleProductType,
    image: null,
    extraInfo: { idWarranty: '0', manufacturingDate: null, expirationDate: null} as ExtraInfoType
}

const useCreateProductStore = defineStore('create-product-store', {
    state: () => ({
        sequential: '000',
        currentProductInfo: initialValuesCreateProduct as CreateProductFormType | null,
        categories: [] as SelectOptionType[],
        subcategories: [] as SelectOptionType[],
        brands: [] as SelectOptionType[],
        units: [] as SelectOptionType[],
        warranties: [] as SelectOptionType[],
        barcodeSimbologies: [{id: '1', label: 'EAN-13'}],
        taxTypes: [] as SelectOptionType[],
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
        setProductInfo(data: CreateProductFormType = initialValuesCreateProduct){
            this.currentProductInfo = data
        },
        setData(id: number | null = null) {
            // console.log(id)
            this.currentVariantRef = id
            this.currentVariant = id === null ? initialValuesCreateVariant : this.variantsData[id]
        }
    }
})

export default useCreateProductStore
