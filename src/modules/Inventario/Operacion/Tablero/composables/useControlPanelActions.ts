import { getControlPanelDataService } from '@inventario/Operacion/Tablero/services/controlPanelService'
import { mapResponseControlPanelData } from '@inventario/Operacion/Tablero/composables/mappingControlPanelData'
export const useControlPanelActions = () => {
    const getControlPanelData = async () => {
        const response = await getControlPanelDataService()
        return {
            items: response.map(mapResponseControlPanelData)
        }
    }

    return { getControlPanelData }
}
