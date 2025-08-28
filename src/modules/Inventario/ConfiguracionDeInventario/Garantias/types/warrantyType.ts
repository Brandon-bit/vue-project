export type WarrantyType = {
    id?: number
    name: string
    duration: number
    period: "month" | "year"
    description: string
    active: boolean
}