import useSubCategoryStore from '@inventario/ConfiguracionDeInventario/SubCategoria/store/subCategoryStore'
import { createSubCategoryService, deleteSubCategoryService, updateSubCategoryService, getSubCategoriesService } from '@inventario/ConfiguracionDeInventario/SubCategoria/services/subCategoryService'
import { mapSubCategory, mapSubCategoryRequest } from '@inventario/ConfiguracionDeInventario/SubCategoria/composables/mappingSubCategoryData'
import { SubCategoryType, SubCategoryFormType, SubCategoryResponseType } from '@inventario/ConfiguracionDeInventario/SubCategoria/types/subCategoryTypes'


export const useSubCategoryActions = () => {
    
    const categoryStore = useSubCategoryStore()

    const getSubCategories = async (page : number, pageSize : number) : Promise<{ items: SubCategoryType[], total: number }> => {
        const response = await getSubCategoriesService(page, pageSize)
        return {
            items: response.data.items.map(mapSubCategory),
            total: response.data.totalItems
        }
    }

    const createSubCategory = async (data: SubCategoryFormType) : Promise<{ message : string, status : string , data : SubCategoryResponseType }> => {
        const model = mapSubCategoryRequest(data)
        const response = await createSubCategoryService(model)
        return {
            message: response.message,
            status: response.success ? "success" : "error",
            data: response.data
        }
    }

    const editSubCategory = async (data: SubCategoryFormType) : Promise<{ message : string, status : string , data : SubCategoryResponseType }> => {
        const model = mapSubCategoryRequest(data)
        const id = categoryStore.selectedSubCategory.id ?? 0
        const response = await updateSubCategoryService(id, model)
        return {
            message: response.message,
            status: response.success ? "success" : "error",
            data: response.data
        }
    }

    const deleteSubCategory = async () : Promise<{ message : string, status : string , data : SubCategoryResponseType }> => {
        let id = categoryStore.selectedSubCategory?.id
        if(id == undefined) id = 0
        console.log(id)
        const response = await deleteSubCategoryService(id)
        return {
            message: response.message,
            status: response.success ? "success" : "error",
            data: response.data
        }
    }

    return { createSubCategory, editSubCategory, deleteSubCategory, getSubCategories }
}
