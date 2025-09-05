import { defineStore } from 'pinia'

import { SubCategory } from '../types/subCategoryType'

const initialSubCategory: SubCategory = {
    id: undefined,
    name: "",
    description: "",
    status: true,
    code: "",
    createdAt: new Date(),
    updatedAt: new Date()
    
}

const useSubCategoryStore = defineStore ('subcategory-store', {
    state: () => ({
           subcategories : []  as SubCategory[],
           selectedSubCategory : null as SubCategory | null,
           modalId: 'subcategory-modal'
        }),

        actions: {
        setData(data: SubCategory | null = initialSubCategory) {
            this.selectedSubCategory = data
        }
    }
        

})

export default useSubCategoryStore
