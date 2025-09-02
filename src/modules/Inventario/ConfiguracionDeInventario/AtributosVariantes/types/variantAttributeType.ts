import { VariantAttributeValueType } from "./variantAttributeValueType"

export type VariantAttributeType = {
    id?: number
    name: string
    values: VariantAttributeValueType[]
    creationDate: Date
    active: boolean
}

