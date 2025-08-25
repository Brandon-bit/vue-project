import { BrandType } from "../types/brandType"
import useBrandStore from "../store/brand.store"

const brandStore = useBrandStore()

export function useBrandActions() {
    const showInfo = (data: any) => {
        console.log('Ver info:', data)
    }

    const edit = (data: BrandType) => {
        //let { editingBrandId } = brandStore
        if(data.id == undefined) return
        brandStore.editingBrandId = data.id
    }

    const deleteData = (data: any) => {
        console.log('Eliminar:', data)
    }

  return { showInfo, edit, deleteData }
}

