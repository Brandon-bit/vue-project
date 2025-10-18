export type ExpenseType = {
    id?: number
    pettyBoxId: number
    pettyBoxName: string
    date: Date
    concept: string
    amount: number
    responsible: string
    costCenter: string
    description: string
    status: 'Pendiente' | 'Aprobado' | 'Rechazado'
    receiptUrl: string
    creationDate: Date
}

export type ExpenseResponseType = {
    id: number
    cajaId: number
    cajaNombre: string
    fecha: Date
    concepto: string
    monto: number
    responsable: string
    centroCosto: string
    descripcion: string
    status: string
    urlComprobante: string
    fechaCreacion: Date
    activo: boolean
    eliminado: boolean
}

export type ExpenseFormType = {
    pettyBoxId: number
    date: string
    concept: string
    amount: number
    costCenter: string
    description: string
    receipt?: FileList
    removeReceipt: boolean
}

export type PettyBoxType = {
    id: number
    name: string
    assigned: number
    balance: number
    responsible: string
    usedPercentage?: number
}

export type PettyBoxResponseType = {
    id: number
    nombre: string
    montoAsignado: number
    saldoActual: number
    responsable: string
}

export type CutoffType = {
    id?: number
    pettyBoxId: number
    pettyBoxName: string
    approvedExpenses: number
    currentBalance: number
    suggestedReplenishment: number
    date: Date
    status: 'Pendiente' | 'Aprobado' | 'Procesado'
}

export type CutoffResponseType = {
    id: number
    cajaId: number
    cajaNombre: string
    gastosAprobados: number
    saldoActual: number
    reposicionSugerida: number
    fecha: Date
    status: string
}

export type TabType = 'expenses' | 'approvals' | 'cutoffs'
