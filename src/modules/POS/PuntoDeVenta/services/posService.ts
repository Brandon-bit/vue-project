import axiosExampleInstanceTwo from '@/api/axiosExampleInstanceTwo'

export const getPosCategoriesService = async (): Promise<any[]> => {
    const response = await axiosExampleInstanceTwo.get('/products/categories?limit=10&skip=0')
    return response.data
}

export const getPosProductsService = async (
    limit: number = 10,
    skip: number = 1
): Promise<any[]> => {
    const response = await axiosExampleInstanceTwo.get(
        `/products?limit=${limit}&skip=${skip * limit - limit}`
    )
    return response.data
}

export const getPosProductsByCategoryService = async (
    category: string,
    limit: number = 10,
    skip: number = 1
): Promise<any[]> => {
    const response = await axiosExampleInstanceTwo.get(
        `/products/category/${category}?limit=${limit}&skip=${skip * limit - limit}`
    )
    return response.data
}

export const getPosProductsBySearchService = async (
    query: string,
    limit: number = 10,
    skip: number = 1
): Promise<any[]> => {
    const response = await axiosExampleInstanceTwo.get(
        `/products/search?q=${query}&limit=${limit}&skip=${skip * limit - limit}`
    )
    return response.data
}
