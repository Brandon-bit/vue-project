import useProductStore from '@inventario/ConfiguracionDeInventario/CrearProducto/store/product.store'
import { useProduct } from '@inventario/ConfiguracionDeInventario/CrearProducto/composables/useProduct'
const useGenerateBarcodeNumber = async () => {
    let number
    const productStore = useProductStore()
    if (!productStore.numberBarcode) {
        const { getLastNumberBarcode } = useProduct()
        const data = await getLastNumberBarcode()
        number = data.number
    } else {
        number = productStore.numberBarcode
    }

    let base

    if (number.length === 13) {
        base = number.slice(0, 12)
    } else if (number.length === 12) {
        base = number
    } else {
        throw new Error('El código debe tener 12 o 13 dígitos')
    }

    let nextBase = (BigInt(base) + 1n).toString().padStart(12, '0')

    let checksum = calculateEAN13Checksum(nextBase)

    let nextNumber = nextBase + checksum
    productStore.numberBarcode = nextNumber
    return nextNumber
}

const calculateEAN13Checksum = (code12: string) => {
    if (code12.length !== 12) {
        throw new Error('El código base debe tener 12 dígitos')
    }

    let sum = 0
    for (let i = 0; i < 12; i++) {
        const digit = parseInt(code12[i], 10)
        sum += i % 2 === 0 ? digit : digit * 3
    }

    const mod = sum % 10
    return mod === 0 ? '0' : (10 - mod).toString()
}

export default useGenerateBarcodeNumber
