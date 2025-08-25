export function useBrandActions() {
    const showInfo = (data: any) => {
        console.log('Ver info:', data)
    }

    const edit = (data: any) => {
        console.log('Editar:', data)
    }

    const deleteData = (data: any) => {
        console.log('Eliminar:', data)
    }

  return { showInfo, edit, deleteData }
}

