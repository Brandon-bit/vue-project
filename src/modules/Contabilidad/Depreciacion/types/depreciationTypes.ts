export type DepreciableAssetType = {
    id: string
    description: string
    originalValue: number
    accumulatedDepreciation: number
    usefulLife: number
    depreciatedMonths: number
    monthlyDepreciation: number
}

export type DepreciationCalculationType = {
    month: string
    year: string
    method: string
    assets: DepreciableAssetType[]
    totalMonthlyDepreciation: number
    policyGenerated: boolean
    policyFolio?: string
}

export type DepreciationPolicyEntryType = {
    account: string
    description: string
    debit: number
    credit: number
}

export type DepreciationMethodType = 'linea-recta' | 'saldos-decrecientes'
