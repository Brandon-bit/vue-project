import { getProductDetailService } from '../services/productService'
import useProductDomainStore from '../store/productDomain.store'

export const useDomainProduct = () => {
    const productDomainStore = useProductDomainStore()

    const getProductDetail = async (id: string) => {
        try {
            if (!productDomainStore.productsDetail[id]) {
                const data = await getProductDetailService(id)
                productDomainStore.setCurrentProduct(data)
                productDomainStore.setProductsDetail(id, data)
            } else {
                productDomainStore.setCurrentProduct(productDomainStore.productsDetail[id])
            }
        } catch (error) {
            console.log(error)
        }
    }

    return {
        getProductDetail
    }
}
