import {
    ControlPanelDataType,
    ControlPanelResponseDataType
} from '@inventario/Operacion/Tablero/types/controlPanelTypes'

export const mapResponseControlPanelData = (
    data: ControlPanelDataType
): ControlPanelResponseDataType => ({
    title: data.titulo,
    quantity: data.cantidad
})
