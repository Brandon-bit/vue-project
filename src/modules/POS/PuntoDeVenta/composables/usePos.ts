import {
    getPosCategoriesService,
    getPosProductsService,
    getPosProductsByCategoryService,
    getPosProductsBySearchService
} from '@pos/PuntoDeVenta/services/posService'
import usePosStore from '@pos/PuntoDeVenta/store/posStore'

export const usePos = () => {
    const posStore = usePosStore()
    const getCategories = async () => {
        const response = await getPosCategoriesService()

        posStore.setCategories(response)
    }

    const getProducts = async () => {
        if (posStore.isLoading) return
        posStore.isLoading = true

        const limit = 10
        let response
        if (posStore.selectedCategory == null) {
            if (posStore.searchWord == '') {
                response = await getPosProductsService(limit, posStore.pageNumber)
            } else {
                response = await getPosProductsBySearchService(
                    posStore.searchWord,
                    limit,
                    posStore.pageNumber
                )
            }
        } else {
            response = await getPosProductsByCategoryService(
                posStore.selectedCategory,
                limit,
                posStore.pageNumber
            )
        }
        if (!response.products.length) {
            posStore.setIsAvailablesGetProducts(false)
            posStore.isLoading = false
            return
        }
        posStore.setProducts(response.products)
        posStore.isLoading = false
    }

    const formatNumber = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value)
    }

    return { getCategories, getProducts, formatNumber }
}
