import type { 
    GastoResponseType,
    GastoFormType, 
    GastoType,
    CajaChicaResponseType,
    CajaChicaType
} from '@/modules/Administracion/CajaChica/types/gastoTypes'

export const mapGasto = (model: GastoResponseType): GastoType => {
    return {
        id: model.id,
        cajaId: model.cajaId,
        cajaNombre: model.cajaNombre,
        fecha: model.fecha,
        concepto: model.concepto,
        monto: model.monto,
        responsable: model.responsable,
        centroCosto: model.centroCosto,
        descripcion: model.descripcion,
        status: model.status as 'Pendiente' | 'Aprobado' | 'Rechazado',
        comprobanteUrl: model.urlComprobante,
        creationDate: model.fechaCreacion
    }
}

export const mapCajaChica = (model: CajaChicaResponseType): CajaChicaType => {
    return {
        id: model.id,
        nombre: model.nombre,
        asignado: model.montoAsignado,
        saldo: model.saldoActual,
        responsable: model.responsable
    }
}

export const mapGastoRequest = (model: GastoFormType): FormData => {
    const formData = new FormData()

    formData.append("CajaId", String(model.cajaId))
    formData.append("Fecha", model.fecha)
    formData.append("Concepto", model.concepto)
    formData.append("Monto", String(model.monto))
    formData.append("CentroCosto", model.centroCosto)
    formData.append("Descripcion", model.descripcion)
    formData.append("EliminarComprobante", String(model.removeComprobante))
    if (model.comprobante && model.comprobante.length > 0) {
        formData.append("Comprobante", model.comprobante[0])
    }

    return formData
}
