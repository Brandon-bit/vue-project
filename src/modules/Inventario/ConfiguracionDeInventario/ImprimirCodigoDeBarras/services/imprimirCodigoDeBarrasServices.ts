import axios from '@/api/axiosExampleInstance'

export const getProductsService = async () => {
    const response = await axios.get('/products');
    return response.data
}

export const getStoresService = async () => {
    const response = await axios.get('/stores');
    return response.data
}

export const getWarehousesService = async () => {
    const response = await axios.get('/warehouse');
    return response.data
}
