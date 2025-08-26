import { CategoryFormType } from '../types/categoryType'
import useCategoryStore from '../store/category.store'

export const useCategoryAction = () => {
    const categoryStore = useCategoryStore()
    const createCategory = async (data: CategoryFormType) => {
        console.log(data)
    }

    const editCategory = (data: CategoryFormType) => {
        console.log(data)
    }

    const deleteCategory = (data?: CategoryFormType) => {
        console.log(categoryStore.selectedCategory)
    }

    return { createCategory, editCategory, deleteCategory }
}
