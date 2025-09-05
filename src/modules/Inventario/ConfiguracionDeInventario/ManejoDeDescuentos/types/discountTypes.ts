export enum DiscountType {
    PERCENTAGE = 'PERCENTAGE',
    FIXED_AMOUNT = 'FIXED_AMOUNT',
    VOLUME = 'VOLUME',
    MIN_QUANTITY = 'MIN_QUANTITY',
    MIN_AMOUNT = 'MIN_AMOUNT'
}

export enum DiscountStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    EXPIRED = 'EXPIRED'
}

export enum ApplicationType {
    ALL_PRODUCTS = 'ALL_PRODUCTS',
    SPECIFIC_PRODUCTS = 'SPECIFIC_PRODUCTS',
    CATEGORIES = 'CATEGORIES',
    BRANDS = 'BRANDS'
}

export type Discount = {
    id?: number
    name: string
    description?: string
    type: DiscountType
    value: number
    minQuantity?: number
    minAmount?: number
    maxUses?: number
    currentUses?: number
    couponCode?: string
    startDate: Date
    endDate: Date
    status: DiscountStatus
    applicationType: ApplicationType
    applicableProductIds?: number[]
    applicableCategoryIds?: number[]
    applicableBrandIds?: string[]
    canCombine: boolean
    active: boolean
    creationDate: Date
    createdBy?: string
}

export type CreateDiscountPayload = Omit<Discount, 'id' | 'currentUses' | 'creationDate'>

export type UpdateDiscountPayload = Partial<CreateDiscountPayload> & { id: number }
