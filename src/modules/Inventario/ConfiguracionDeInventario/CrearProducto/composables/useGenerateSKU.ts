import useProductStore from '@inventario/ConfiguracionDeInventario/CrearProducto/store/product.store'

const useGenerateSKU = () => {
    const productStore = useProductStore()
    const category = productStore.category
    const brand = productStore.brand
    const unit = productStore.unit
    const slug = productStore.slug

    if (!category || !brand || !slug || !unit) {
        return false
    }

    const selectedCategory = productStore.categories.find((el) => el.id == category)
    const selectedBrand = productStore.brands.find((el) => el.id == brand)
    const selectedUnit = productStore.units.find((el) => el.id == unit)
    return `${selectedCategory.sufijo}-${selectedBrand.label.replace(/\s+/g, '')}-${slug.replace(/\s+/g, '')}-${selectedUnit.sufijo}-${productStore.changeSequentialValue(true)}`
}

export default useGenerateSKU
