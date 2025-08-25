import { BrandType } from "../types/brandType"
import useBrandStore from "../store/brand.store"
// import { useModalStore } from '@/shared/stores/modal.store'
// import { useBrand } from '../composables/useBrand'

// const { BRAND_MODAL_IDS } = useBrand()
// const modalStore = useModalStore()
const brandStore = useBrandStore()

export function useBrandActions() {
    const showInfo = (data: any) => {
        console.log('Ver info:', data)
    }

    const edit = (data: BrandType) => {
        if(data.id == undefined) return
        brandStore.editingBrandId = data.id
    }

    const deleteData = (data: any) => {
        if(data.id == undefined) return
        brandStore.deletingBrandId = data.id

        // modalStore.open(BRAND_MODAL_IDS.CREATE, {
        // type: 'DELETE',
        // title: 'Eliminar Marca'
        //})
    }

  return { showInfo, edit, deleteData }
}

