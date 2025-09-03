import { defineStore } from 'pinia'
import { CategoryType } from '@inventario/ConfiguracionDeInventario/Categorias/types/categoryType'

const initialCategory: CategoryType = {
    id: undefined,
    name: '',
    sufix: '',
    status: true,
    creationDate: new Date()
}

const useCategoryStore = defineStore('category-store', {
    state: () => ({
        categories: [] as CategoryType[],
        selectedCategory: null as CategoryType | null,
        modalId: 'category-modal'
    }),
    actions: {
        setData(data: CategoryType = initialCategory) {
            this.selectedCategory = data
        }
    }
})

export default useCategoryStore
