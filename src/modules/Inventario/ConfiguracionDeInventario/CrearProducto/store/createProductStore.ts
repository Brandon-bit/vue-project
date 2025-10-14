import { defineStore } from 'pinia'
import { 
    CreateVariantFormType, 
    CreateProductFormType,
    SingleProductType,
    ExtraInfoType,
    VariantAttributeType
} from '@inventario/ConfiguracionDeInventario/CrearProducto/types/createProductTypes'
import { SelectOptionType } from '@/shared/types/selectOptionTypes'

const initialValuesCreateVariant : CreateVariantFormType = {
    idVariant: '0',
    variantValue: '0',
    variantPrice: 0,
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
    singleProduct: { price: 0, idTaxType: '0'} as SingleProductType,
    variableProduct: [] as CreateVariantFormType[],
    image: null,
    extraInfo: { idWarranty: '0', manufacturingDate: null, expirationDate: null} as ExtraInfoType
}

const useCreateProductStore = defineStore('create-product-store', {
    state: () => ({
        sequential: '000',
        currentProductInfo: initialValuesCreateProduct as CreateProductFormType | null,
        currentVariantInfo: initialValuesCreateVariant as CreateVariantFormType,
        categories: [] as SelectOptionType[],
        subcategories: [] as SelectOptionType[],
        brands: [] as SelectOptionType[],
        units: [] as SelectOptionType[],
        warranties: [] as SelectOptionType[],
        barcodeSimbologies: [{id: '1', label: 'EAN-13'}],
        taxTypes: [] as SelectOptionType[],
        variantAttributes: [] as SelectOptionType[],
        variantValues:[] as SelectOptionType[],
        idCategorySelected: '0',
        idSubCategorySelected: '0',
        taxes: [],
        discountTypes: [],
        selectedVariantIndex: 0,
        currentVariantRef: 0 as number | null,
        variantsData: [] as VariantAttributeType[],
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
        setVariantData(data: CreateVariantFormType = initialValuesCreateVariant) {
            this.currentVariantInfo = data
        }
    }
})

export default useCreateProductStore
