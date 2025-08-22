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
    getValueVariantsServices,
    getTaxTypesService,
    getTaxesService,
    getDiscountTypesService,
    getLastNumberBarcodeService
} from '@inventario/ConfiguracionDeInventario/Productos/services/productService'
import { ref } from 'vue'

export const useProduct = () => {
    const stores = ref([])
    const warehouses = ref([])
    const sellingTypes = ref([])
    const categories = ref([])
    const subcategories = ref([])
    const units = ref([])
    const brands = ref([])
    const barcodeSimbologies = ref([])
    const variants = ref([])
    const valueVariants = ref([])
    const taxTypes = ref([])
    const taxes = ref([])
    const discountTypes = ref([])
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
            categories.value = data
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
            units.value = data
        } catch (error) {
            console.error(error)
        }
    }

    const getBrands = async () => {
        try {
            const { data } = await getBrandsService()
            brands.value = data
        } catch (error) {
            console.error(error)
        }
    }

    const getBarcodeSimbologies = async () => {
        try {
            const { data } = await getBarcodeSimbologiesService()
            barcodeSimbologies.value = data
        } catch (error) {
            console.error(error)
        }
    }

    const getValueVariants = async () => {
        try {
            const { data } = await getValueVariantsServices()
            valueVariants.value = data
        } catch (error) {
            console.error(error)
        }
    }

    const getVariants = async () => {
        try {
            const { data } = await getVariantsServices()
            variants.value = data
        } catch (error) {
            console.error(error)
        }
    }

    const getTaxTypes = async () => {
        try {
            const { data } = await getTaxTypesService()
            taxTypes.value = data
        } catch (error) {
            console.error(error)
        }
    }
    const getTaxes = async () => {
        try {
            const { data } = await getTaxesService()
            taxes.value = data
        } catch (error) {
            console.error(error)
        }
    }
    const getDiscountTypes = async () => {
        try {
            const { data } = await getDiscountTypesService()
            discountTypes.value = data
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
        categories,
        subcategories,
        units,
        brands,
        barcodeSimbologies,
        variants,
        valueVariants,
        taxTypes,
        taxes,
        discountTypes,
        getStores,
        getWareHouses,
        getSellingTypes,
        getCategories,
        getSubcategories,
        getUnits,
        getBrands,
        getBarcodeSimbologies,
        getVariants,
        getValueVariants,
        getTaxTypes,
        getTaxes,
        getDiscountTypes,
        getLastNumberBarcode
    }
}
