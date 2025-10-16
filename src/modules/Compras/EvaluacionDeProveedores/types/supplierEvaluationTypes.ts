export type SupplierEvaluationType = {
    id: number
    name: string
    category: string
    totalScore: number
    quality: number
    deliveryTime: number
    price: number
    support: number
    completedOrders: number
    incidents: number
}

export type IncidentFormType = {
    supplierId: number
    purchaseOrder: string
    incidentType: string
    description: string
    impact: string
}

export type EvaluationStatsType = {
    activeSuppliers: number
    averageScore: number
    totalOrders: number
    totalIncidents: number
}

export type PerformanceLevelType = 'Excelente' | 'Bueno' | 'Regular' | 'Bajo'
