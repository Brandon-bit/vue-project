import type { CategoryResponseType } from '@inventario/ConfiguracionDeInventario/Categorias/types/categoryResponseType'
import type { CategoryFormType } from '@inventario/ConfiguracionDeInventario/Categorias/types/categoryFormType'
import useCategoryStore from '@inventario/ConfiguracionDeInventario/Categorias/store/categoryStore'
import { createCategoryService, deleteCategoryService, updateCategoryService } from '@inventario/ConfiguracionDeInventario/Categorias/services/categoryService'
import { useCategory } from '@inventario/ConfiguracionDeInventario/Categorias/composables/useCategory'

const { mapCategoryRequest } = useCategory()

export const useCategoryAction = () => {
    const categoryStore = useCategoryStore()

    const createCategory = async (data: CategoryFormType) : Promise<{ message : string, status : string , data : CategoryResponseType }> => {
        const model = mapCategoryRequest(data)
        const response = await createCategoryService(model)
        return {
            message: response.message,
            status: response.success ? "success" : "error",
            data: response.data
        }
    }

    const editCategory = async (data: CategoryFormType) : Promise<{ message : string, status : string , data : CategoryResponseType }> => {
        const model = mapCategoryRequest(data)
        model.Id = categoryStore.selectedCategory?.id
        const response = await updateCategoryService(model)
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

    return { createCategory, editCategory, deleteCategory }
}
