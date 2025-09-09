import {
    getStoresService,
    getWareHousesService,
    getSellingTypesService,
    getCategoriesService,
    getSubcategoriesService,
    getUnitsService,
    getBrandsService,
    getBarcodeSimbologiesService,
    getVariantsServices,
    getTaxTypesService,
    getTaxesService,
    getDiscountTypesService,
    getLastNumberBarcodeService
} from '@inventario/ConfiguracionDeInventario/CrearProducto/services/createProductService'
import { ref } from 'vue'
import useCreateProductStore from '../store/createProduct.store'

export const useCreateProduct = () => {
    const createProductStore = useCreateProductStore()
    const stores = ref([])
    const warehouses = ref([])
    const sellingTypes = ref([])
    const subcategories = ref([])
    const variants = ref([])
    const valueVariants = ref([])
    const getStores = async () => {
        try {
            const { data } = await getStoresService()
            stores.value = data
        } catch (error) {}
    }

    const getWareHouses = async () => {
        try {
            const { data } = await getWareHousesService()
            warehouses.value = data
        } catch (error) {
            console.error(error)
        }
    }

    const getSellingTypes = async () => {
        try {
            const { data } = await getSellingTypesService()
            sellingTypes.value = data
        } catch (error) {
            console.error(error)
        }
    }
    const getCategories = async () => {
        try {
            const { data } = await getCategoriesService()
            createProductStore.categories = data
        } catch (error) {
            console.error(error)
        }
    }
    const getSubcategories = async () => {
        try {
            const { data } = await getSubcategoriesService()
            subcategories.value = data
        } catch (error) {
            console.error(error)
        }
    }
    const getUnits = async () => {
        try {
            const { data } = await getUnitsService()
            createProductStore.units = data
        } catch (error) {
            console.error(error)
        }
    }

    const getBrands = async () => {
        try {
            const { data } = await getBrandsService()
            createProductStore.brands = data
        } catch (error) {
            console.error(error)
        }
    }

    const getBarcodeSimbologies = async () => {
        try {
            const { data } = await getBarcodeSimbologiesService()
            createProductStore.barcodeSimbologies = data
        } catch (error) {
            console.error(error)
        }
    }

    const getVariants = async () => {
        try {
            const { data } = await getVariantsServices()
            let valueVariantsMap = [] as any
            const variantsMap = data.map((el: any) => {
                el.values.map((variant: any) => {
                    valueVariantsMap.push({
                        id: variant.id,
                        idVariante: el.id,
                        label: variant.value
                    })
                })
                return { id: el.id, label: el.name }
            })
            variants.value = variantsMap
            valueVariants.value = valueVariantsMap
        } catch (error) {
            console.error(error)
        }
    }

    const getTaxTypes = async () => {
        try {
            const { data } = await getTaxTypesService()
            createProductStore.taxTypes = data
        } catch (error) {
            console.error(error)
        }
    }
    const getTaxes = async () => {
        try {
            const { data } = await getTaxesService()
            createProductStore.taxes = data
        } catch (error) {
            console.error(error)
        }
    }
    const getDiscountTypes = async () => {
        try {
            const { data } = await getDiscountTypesService()
            createProductStore.discountTypes = data
        } catch (error) {
            console.error(error)
        }
    }

    const getLastNumberBarcode = async () => {
        try {
            const { data } = await getLastNumberBarcodeService()
            return data
        } catch (error) {
            console.error(error)
        }
    }

    return {
        stores,
        warehouses,
        sellingTypes,
        subcategories,
        variants,
        valueVariants,
        getStores,
        getWareHouses,
        getSellingTypes,
        getCategories,
        getSubcategories,
        getUnits,
        getBrands,
        getBarcodeSimbologies,
        getVariants,
        getTaxTypes,
        getTaxes,
        getDiscountTypes,
        getLastNumberBarcode
    }
}
