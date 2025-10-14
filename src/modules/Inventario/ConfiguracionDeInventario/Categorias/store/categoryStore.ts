import { defineStore } from 'pinia'
import type { CategoryType } from '@inventario/ConfiguracionDeInventario/Categorias/types/categoryTypes'

const initialCategory: CategoryType = {
    id: undefined,
    name: '',
    slug: '',
    status: true,
    creationDate: new Date(),
    imageUrl: ''
}

const useCategoryStore = defineStore('category-store', {
    state: () => ({
        selectedCategory: initialCategory as CategoryType,
        modalId: 'category-modal'
    }),
    actions: {
        setData(data: CategoryType = initialCategory) {
            this.selectedCategory = data
        }
    }
})

export default useCategoryStore
