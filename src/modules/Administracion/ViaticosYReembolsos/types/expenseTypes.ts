export type ExpenseStatus = 'aprobado' | 'pendiente' | 'rechazado' | 'pagado'

export type ExpenseType = {
    id?: string
    concept: string
    date: Date
    amount: number
    status: ExpenseStatus
    verified: boolean
    employee?: string
    description?: string
    category?: string
}

export type ExpenseResponseType = {
    id: string
    concepto: string
    fecha: Date
    monto: number
    estado: ExpenseStatus
    comprobado: boolean
    empleado: string
    descripcion: string
    categoria: string
    activo: boolean
    eliminado: boolean
}

export type ExpenseFormType = {
    concept: string
    date: string
    amount: number
    category: string
    description: string
}

export type ExpenseStatsType = {
    pending: number
    approved: number
    paid: number
    totalMonth: number
}

export type TabType = 'my-requests' | 'approvals'
