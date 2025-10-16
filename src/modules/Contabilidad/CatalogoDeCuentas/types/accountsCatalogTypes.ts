export type AccountType = {
    id?: string
    code: string
    name: string
    type: string
    nature: 'Deudora' | 'Acreedora'
    level: number
    balance: number
    currency: string
    acceptsMovements: boolean
    requiresAuxiliary: boolean
    active: boolean
    subaccounts?: AccountType[]
}

export type AccountResponseType = {
    id: string
    codigo: string
    nombre: string
    tipo: string
    naturaleza: 'Deudora' | 'Acreedora'
    nivel: number
    saldo: number
    moneda: string
    aceptaMovimientos: boolean
    requiereAuxiliar: boolean
    activa: boolean
    subcuentas?: AccountResponseType[]
}

export type AccountFormType = {
    code: string
    name: string
    type: string
    nature: 'Deudora' | 'Acreedora'
    level: number
    currency: string
    acceptsMovements: boolean
    requiresAuxiliary: boolean
    active: boolean
}
