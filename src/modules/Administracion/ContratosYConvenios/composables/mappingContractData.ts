import type { 
    ContractResponseType,
    ContractFormType, 
    ContractType
} from '@/modules/Administracion/ContratosYConvenios/types/contractTypes'

export const mapContract = (model: ContractResponseType): ContractType => {
    return {
        id: model.id,
        name: model.nombre,
        counterpart: model.contraparte,
        type: model.tipo,
        startDate: model.fechaInicio,
        expirationDate: model.fechaVencimiento,
        amount: model.monto,
        status: model.estado,
        daysToExpiration: model.diasVencimiento,
        description: model.descripcion
    }
}

export const mapContractRequest = (model: ContractFormType) => {
    return {
        Nombre: model.name,
        Contraparte: model.counterpart,
        Tipo: model.type,
        FechaInicio: model.startDate,
        FechaVencimiento: model.expirationDate,
        Monto: model.amount,
        Descripcion: model.description || ''
    }
}
