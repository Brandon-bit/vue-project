export type ContractStatus = 'vigente' | 'proximo-vencer' | 'vencido'

export type ContractType = {
    id?: string
    name: string
    counterpart: string
    type: string
    startDate: Date
    expirationDate: Date
    amount: number
    status: ContractStatus
    daysToExpiration: number
    description?: string
}

export type ContractResponseType = {
    id: string
    nombre: string
    contraparte: string
    tipo: string
    fechaInicio: Date
    fechaVencimiento: Date
    monto: number
    estado: ContractStatus
    diasVencimiento: number
    descripcion: string
    activo: boolean
    eliminado: boolean
}

export type ContractFormType = {
    name: string
    counterpart: string
    type: string
    startDate: string
    expirationDate: string
    amount: number
    description: string
}

export type ContractStatsType = {
    active: number
    expiringSoon: number
    expired: number
}
