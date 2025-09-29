import { defineStore } from 'pinia'
import { SubCategoryType } from '@inventario/ConfiguracionDeInventario/SubCategoria/types/subCategoryTypes'

const initialSubCategory: SubCategoryType = {
    id: undefined,
    name: '',
    parentCateogryName: '',
    parentCategoryId: 0,
    slug: '',
    status: true,
    creationDate: new Date(),
    imageUrl: ''
}

const useSubCategoryStore = defineStore('category-store', {
    state: () => ({
        selectedSubCategory: initialSubCategory as SubCategoryType,
        modalId: 'subcategory-modal'
    }),
    actions: {
        setData(data: SubCategoryType = initialSubCategory) {
            this.selectedSubCategory = data
        }
    }
})

export default useSubCategoryStore
