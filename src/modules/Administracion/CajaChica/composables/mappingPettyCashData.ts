import type { 
    ExpenseResponseType,
    ExpenseFormType, 
    ExpenseType,
    PettyBoxResponseType,
    PettyBoxType,
    CutoffResponseType,
    CutoffType
} from '@/modules/Administracion/CajaChica/types/pettycashTypes'

export const mapExpense = (model: ExpenseResponseType): ExpenseType => {
    return {
        id: model.id,
        pettyBoxId: model.cajaId,
        pettyBoxName: model.cajaNombre,
        date: model.fecha,
        concept: model.concepto,
        amount: model.monto,
        responsible: model.responsable,
        costCenter: model.centroCosto,
        description: model.descripcion,
        status: model.status as 'Pendiente' | 'Aprobado' | 'Rechazado',
        receiptUrl: model.urlComprobante,
        creationDate: model.fechaCreacion
    }
}

export const mapPettyBox = (model: PettyBoxResponseType): PettyBoxType => {
    const assigned = model.montoAsignado
    const balance = model.saldoActual
    const usedPercentage = ((assigned - balance) / assigned) * 100
    
    return {
        id: model.id,
        name: model.nombre,
        assigned: assigned,
        balance: balance,
        responsible: model.responsable,
        usedPercentage: usedPercentage
    }
}

export const mapCutoff = (model: CutoffResponseType): CutoffType => {
    return {
        id: model.id,
        pettyBoxId: model.cajaId,
        pettyBoxName: model.cajaNombre,
        approvedExpenses: model.gastosAprobados,
        currentBalance: model.saldoActual,
        suggestedReplenishment: model.reposicionSugerida,
        date: model.fecha,
        status: model.status as 'Pendiente' | 'Aprobado' | 'Procesado'
    }
}

export const mapExpenseRequest = (model: ExpenseFormType): FormData => {
    const formData = new FormData()

    formData.append("CajaId", String(model.pettyBoxId))
    formData.append("Fecha", model.date)
    formData.append("Concepto", model.concept)
    formData.append("Monto", String(model.amount))
    formData.append("CentroCosto", model.costCenter)
    formData.append("Descripcion", model.description)
    formData.append("EliminarComprobante", String(model.removeReceipt))
    if (model.receipt && model.receipt.length > 0) {
        formData.append("Comprobante", model.receipt[0])
    }

    return formData
}
