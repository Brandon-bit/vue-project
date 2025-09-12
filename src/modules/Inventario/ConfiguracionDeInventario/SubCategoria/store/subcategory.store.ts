import { defineStore } from 'pinia'
import { getSubCategoriesService  } from '@/modules/Inventario/ConfiguracionDeInventario/SubCategoria/services/subcategory.service'
import { SubCategoryType } from '../types/subCategoryType'

const initialSubCategory: SubCategoryType = {
    id: undefined,
    name: "",
    description: "",
    active: true,
    code: "",
    image: "",
    parentCategory: "",
    createdAt: new Date(),
    updatedAt: new Date()
}

const useSubCategoryStore = defineStore('subcategory-store', {
    state: () => ({
        subcategories: [] as SubCategoryType[],
        selectedSubCategory: null as SubCategoryType | null,
        modalId: 'subcategory-modal'
    }),
    actions: {
        setData(data: SubCategoryType | null = initialSubCategory) {
            console.log("BBBBBBBBB", data);
            this.selectedSubCategory = data
        },
        // La función fetchSubCategories va aquí adentro
        async fetchSubCategories() {
            try {
                const data = await getSubCategoriesService();
                console.log("AAAAAAAA", data);
                this.subcategories = data;
            } catch (error) {
                console.error("Error al cargar subcategorías:", error);
            }
        }
    }
})

export default useSubCategoryStore