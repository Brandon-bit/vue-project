import { SelectOptionType } from '@/shared/types/selectOptionTypes'
import { 
    ProductSkuCodeType,
    CreateProductFormType
 } from '@inventario/ConfiguracionDeInventario/CrearProducto/types/createProductTypes'
import useCreateProductStore from "@/modules/Inventario/ConfiguracionDeInventario/CrearProducto/store/createProductStore"
import { 
    getBrandsOptionsService, 
    getCategoriesOptionsService,
    getUnitOptionsService, 
    getSubCategoriesOptionsService,
    getSkuBarcodeService,
    getTaxOptionsService,
    getWarrantiesOptionsService,
    getVariantAttributesOptionsService,
    getVariantAttributeById,
    createProductService
} from "@inventario/ConfiguracionDeInventario/CrearProducto/services/createProductService"
import { 
    mapProductSkuCodeRequestType,
    mapSkuBarcodeType,
    mapCreateProductRequest 
} from "@inventario/ConfiguracionDeInventario/CrearProducto/composables/mappingCreateProductData"

const useProductActions = () => {

    const createProductStore = useCreateProductStore()

    const getCategoryOptions = async () => {
        try {
            const res = await getCategoriesOptionsService()
            createProductStore.categories = res.map((c): SelectOptionType => ({
                id: c.id,
                label: c.nombre
            }))
        } catch (error) {
            createProductStore.categories = [] as SelectOptionType[]
        }
    }

    const getSubCategoryOptions = async (idCategory: string) => {
        try {
            const res = await getSubCategoriesOptionsService(idCategory)
            createProductStore.subcategories = res.map((c): SelectOptionType => ({
                id: c.id,
                label: c.nombre
            }))
        } catch (error) {
            createProductStore.subcategories = [] as SelectOptionType[]
        }
    }

    const getBrandOptions = async () => {
        try {
            const res = await getBrandsOptionsService()
            createProductStore.brands = res.map((c): SelectOptionType => ({
                id: c.id,
                label: c.nombre
            }))
        } catch (error) {
            createProductStore.brands = [] as SelectOptionType[]
        }
    }

    const getUnitOptions = async () => {
        try {
            const res = await getUnitOptionsService()
            createProductStore.units = res.map((c): SelectOptionType => ({
                id: c.id,
                label: c.nombre
            }))
        } catch (error) {
            createProductStore.units = [] as SelectOptionType[]
        }
    }

    const getWarrantyOptions = async () => {
        try {
            const res = await getWarrantiesOptionsService()
            createProductStore.warranties = res.map((c): SelectOptionType => ({
                id: c.id,
                label: c.nombre
            }))
        } catch (error) {
            createProductStore.warranties = [] as SelectOptionType[]
        }
    }

    const getSku = async (data : ProductSkuCodeType) : Promise<string> => {
        try {
            const res = await getSkuBarcodeService(mapProductSkuCodeRequestType(data))
            const skuBarcode = mapSkuBarcodeType(res)
            return skuBarcode.sku
        } catch (error) {
            return ''
        }
    }

    const getBarcode = async (data : ProductSkuCodeType) : Promise<string> => {
        try {
            const res = await getSkuBarcodeService(mapProductSkuCodeRequestType(data))
            const skuBarcode = mapSkuBarcodeType(res)
            return skuBarcode.barcode
        } catch (error) {
            return ''
        }
    }

    const getTaxOptions = async () => {
        try {
            const res = await getTaxOptionsService()
            createProductStore.taxTypes = res.map((c): SelectOptionType => ({
                id: c.id,
                label: c.nombre
            }))
        } catch (error) {
            createProductStore.taxTypes = [] as SelectOptionType[]
        }
    }

    const getVariantAttributesOptions = async () => {
        try {
            const res = await getVariantAttributesOptionsService()
            createProductStore.variantAttributes = res.map((c): SelectOptionType => ({
                id: c.id,
                label: c.nombre
            }))
        } catch (error) {
            createProductStore.variantAttributes = [] as SelectOptionType[]
        }
    }

    const getVariantAttributesValues = async (id : string) => {
        try{
            const res = await getVariantAttributeById(id)
            const values = res.valores.split(',')
            createProductStore.variantValues = values.map((c): SelectOptionType => ({
                id: c,
                label: c
            }))
        } catch(error){
            console.log(error)
            createProductStore.variantValues = [] as SelectOptionType[]
        }
    }

    const createProduct = async (data : CreateProductFormType) => {
        try {
            const res = await createProductService(mapCreateProductRequest(data))
            return res
        } catch (error) {
            console.log(error)
            return null
        }
    }

    return { 
        getCategoryOptions, 
        getBrandOptions, 
        getUnitOptions, 
        getSubCategoryOptions, 
        getSku, 
        getBarcode, 
        getWarrantyOptions,
        getTaxOptions,
        getVariantAttributesOptions,
        getVariantAttributesValues,
        createProduct
    }

}

export default useProductActions