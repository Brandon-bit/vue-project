import axiosExampleInstance from '@/api/axiosExampleInstance'
import axiosApiInstance from '@/api/axiosApiInstance'
import { SelectOptionResponseType } from '@/shared/types/selectOptionTypes'
import { 
  ProductSkuCodeRequestType,
  SkuBarcodeResponseType
} from '@inventario/ConfiguracionDeInventario/CrearProducto/types/createProductTypes'
import { VariantAttributeResponseType } from '../../AtributosVariantes/types/variantAttributeTypes'

export const getStoresService = () => axiosExampleInstance.get('/stores')
export const getWareHousesService = () => axiosExampleInstance.get('/warehouse')
export const getSellingTypesService = () => axiosExampleInstance.get('/sellingType')
export const getCategoriesService = () => axiosExampleInstance.get('/category')
export const getSubcategoriesService = () => axiosExampleInstance.get('/subcategory')
export const getUnitsService = () => axiosExampleInstance.get('/unit')
export const getBrandsService = () => axiosExampleInstance.get('/brand')
export const getBarcodeSimbologiesService = () => axiosExampleInstance.get('/barcodeSimbology')
export const getVariantsServices = () => axiosExampleInstance.get('/variant')
export const getTaxTypesService = () => axiosExampleInstance.get('/taxType')
export const getTaxesService = () => axiosExampleInstance.get('/tax')
export const getDiscountTypesService = () => axiosExampleInstance.get('/discountType')
export const getLastNumberBarcodeService = () => axiosExampleInstance.get('/lastNumberBarcode')

export const getCategoriesOptionsService = async () : Promise<SelectOptionResponseType[]> => {
  const response = await axiosApiInstance.get('/producto/categoria/lista')
  return response.data.data.categoria
};

export const getSubCategoriesOptionsService = async (idCategory: string) : Promise<SelectOptionResponseType[]> => {
  const response = await axiosApiInstance.get(`/producto/subcategoria/lista/${idCategory}`)
  return response.data.data.categoria
};

export const getBrandsOptionsService = async () : Promise<SelectOptionResponseType[]> => {
  const response = await axiosApiInstance.get('/producto/marca/lista')
  return response.data.data.items
};

export const getUnitOptionsService = async () : Promise<SelectOptionResponseType[]> => {
  const response = await axiosApiInstance.get('/producto/unidad/lista')
  return response.data.data.items
};

export const getSkuBarcodeService = async (data : ProductSkuCodeRequestType) : Promise<SkuBarcodeResponseType> => {
  const response = await axiosApiInstance.post('/producto/producto/GenerarSkuCodeBar', data)
  return response.data.data.producto
};

export const getWarrantiesOptionsService = async () : Promise<SelectOptionResponseType[]> => {
  const response = await axiosApiInstance.get('/producto/garantia/lista')
  return response.data.data.items
};

export const getTaxOptionsService = async () : Promise<SelectOptionResponseType[]> => {
  const response = await axiosApiInstance.get('/producto/tipoimpuesto/lista')
  return response.data.data.items
};

export const getVariantAttributesOptionsService = async () : Promise<SelectOptionResponseType[]> => {
  const response = await axiosApiInstance.get('/producto/atributovariantecat/lista')
  return response.data.data.items
};

export const getVariantAttributeById = async (id : string) : Promise<VariantAttributeResponseType> => {
  const response = await axiosApiInstance.get(`/producto/atributovariantecat/${id}`)
  return response.data.data.items[0]
}