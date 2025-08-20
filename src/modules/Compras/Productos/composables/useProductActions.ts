import { useModalStore } from "@/shared/stores/modal.store"

export function useUserActions() {

    const modalStore = useModalStore()
    const modalId = 'create-product'

    const showInfo = (data: any) => {
    console.log('Ver info:', data)
     modalStore.open(modalId)
  }

  const edit = (data: any) => {
    console.log('Editar:', data)
  }

  const toggleStatus = (data: any) => {
    console.log('Activar/Desactivar:', data)
  }

  const deleteData = (data: any) => {
    console.log('Eliminar:', data)
  }

  return { showInfo, edit, toggleStatus, deleteData }
}

