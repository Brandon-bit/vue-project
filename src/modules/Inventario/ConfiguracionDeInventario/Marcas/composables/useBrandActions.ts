import { BrandType, BrandFormType, BrandResponseType } from "@inventario/ConfiguracionDeInventario/Marcas/types/brandType"
import useBrandStore from "@/modules/Inventario/ConfiguracionDeInventario/Marcas/store/brandStore"
import { getBrandsService, createBrandService, updateBrandService, deleteBrandService} from "@inventario/ConfiguracionDeInventario/Marcas/services/brandServices"
import { mapBrand, mapBrandRequest } from "@inventario/ConfiguracionDeInventario/Marcas/composables/mappingBrandData"

export function useBrandActions() {

    const brandStore = useBrandStore()

    const getBrands = async (page : number, pageSize : number) : Promise<{ items: BrandType[], total: number }> => {
        const response = await getBrandsService(page, pageSize)
        return {
            items: response.data.items.map(mapBrand),
            total: response.data.totalItems
        }
    }

    const createBrand = async (data: BrandFormType) : Promise<{ message : string, status : string , data : BrandResponseType }> => {
        const model = mapBrandRequest(data)
        const response = await createBrandService(model)
        console.log(response)
        return {
            message: response.message,
            status: response.success ? "success" : "error",
            data: response.data
        }
    }

    const editBrand = async (data: BrandFormType) : Promise<{ message : string, status : string , data : BrandResponseType }> => {
        const model = mapBrandRequest(data)
        const id = brandStore.selectedBrand.id ?? 0
        const response = await updateBrandService(id, model)
        return {
            message: response.message,
            status: response.success ? "success" : "error",
            data: response.data
        }
    }

    const deleteBrand = async () : Promise<{ message : string, status : string , data : BrandResponseType }> => {
        const id = brandStore.selectedBrand.id ?? 0
        const response = await deleteBrandService(id)
        return {
            message: response.message,
            status: response.success ? "success" : "error",
            data: response.data
        }
    }

  return { createBrand, editBrand, deleteBrand, getBrands }
}


