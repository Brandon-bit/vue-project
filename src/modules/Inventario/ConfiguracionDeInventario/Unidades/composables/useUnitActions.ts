import { UnitFormType } from '@inventario/ConfiguracionDeInventario/Unidades/types/unitFormType';
import { UnitResponseType } from '@inventario/ConfiguracionDeInventario/Unidades/types/unitResponseType';
import { useUnit } from '@inventario/ConfiguracionDeInventario/Unidades/composables/useUnit'
import { createUnitervice, updateUnitService, deleteUnitService } from '@inventario/ConfiguracionDeInventario/Unidades/services/unitServices'
import useUnitStore from '@inventario/ConfiguracionDeInventario/Unidades/store/unit.store';

const { mapUnitRequest } = useUnit()

export const useUnitActions = () => {
    const unitStore = useUnitStore()

    const createUnit = async (data: UnitFormType) : Promise<{ message : string, status : string , data : UnitResponseType }> => {
        const model = mapUnitRequest(data)
        const response = await createUnitervice(model)
        return {
            message: response.message,
            status: response.success ? "success" : "error",
            data: response.data
        }
    }

    const editUnit = async (data: UnitFormType) : Promise<{ message : string, status : string , data : UnitResponseType }> => {
            const model = mapUnitRequest(data)
            model.Id = unitStore.selectedUnit.id
            const response = await updateUnitService(model)
            return {
                message: response.message,
                status: response.success ? "success" : "error",
                data: response.data
            }
        }

    const deleteUnit = async () : Promise<{ message : string, status : string , data : UnitResponseType }> => {
        let id = unitStore.selectedUnit?.id
        if(id == undefined) id = 0
        const response = await deleteUnitService(id, false)
        return {
            message: response.message,
            status: response.success ? "success" : "error",
            data: response.data
        }
    }

  return { createUnit, editUnit, deleteUnit }
}


