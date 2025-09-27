import type { CategoryResponseType, CategoryFormType, CategoryType } from '@inventario/ConfiguracionDeInventario/Categorias/types/categoryTypes'
import useCategoryStore from '@inventario/ConfiguracionDeInventario/Categorias/store/categoryStore'
import { createCategoryService, deleteCategoryService, updateCategoryService, getCategoriesService } from '@inventario/ConfiguracionDeInventario/Categorias/services/categoryService'
import { mapCategory, mapCategoryRequest } from '@inventario/ConfiguracionDeInventario/Categorias/composables/mappingCategoryData'


export const useCategoryActions = () => {
    
    const categoryStore = useCategoryStore()

    const getCategories = async (page : number, pageSize : number) : Promise<{ items: CategoryType[], total: number }> => {
        const response = await getCategoriesService(page, pageSize)
        return {
            items: response.data.items.map(mapCategory),
            total: response.data.totalItems
        }
    }

    const createCategory = async (data: CategoryFormType) : Promise<{ message : string, status : string , data : CategoryResponseType }> => {
        console.log(data)
        const model = mapCategoryRequest(data)
        const response = await createCategoryService(model)
        console.log(response)
        return {
            message: response.message,
            status: response.success ? "success" : "error",
            data: response.data
        }
    }

    const editCategory = async (data: CategoryFormType) : Promise<{ message : string, status : string , data : CategoryResponseType }> => {
        console.log(data)
        const model = mapCategoryRequest(data)
        const id = categoryStore.selectedCategory.id ?? 0
        const response = await updateCategoryService(id, model)
        return {
            message: response.message,
            status: response.success ? "success" : "error",
            data: response.data
        }
    }

    const deleteCategory = async () : Promise<{ message : string, status : string , data : CategoryResponseType }> => {
        let id = categoryStore.selectedCategory?.id
        if(id == undefined) id = 0
        console.log(id)
        const response = await deleteCategoryService(id)
        return {
            message: response.message,
            status: response.success ? "success" : "error",
            data: response.data
        }
    }

    return { createCategory, editCategory, deleteCategory, getCategories }
}
