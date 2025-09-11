import { defineStore } from 'pinia'
import type { CategoryType } from '@inventario/ConfiguracionDeInventario/Categorias/types/CategoryType'

const initialCategory: CategoryType = {
    id: undefined,
    name: '',
    slug: '',
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
