import useCreateProductStore from '@/modules/Inventario/ConfiguracionDeInventario/CrearProducto/store/createProductStore'

const useGenerateSKU = () => {
    const createProductStore = useCreateProductStore()
    const category = createProductStore.category
    const brand = createProductStore.brand
    const unit = createProductStore.unit
    const slug = createProductStore.slug

    if (!category || !brand || !slug || !unit) {
        return false
    }

    const selectedCategory = createProductStore.categories.find((el: any) => el.id == category)
    const selectedBrand = createProductStore.brands.find((el: any) => el.id == brand)
    const selectedUnit = createProductStore.units.find((el: any) => el.id == unit)
    return `${selectedCategory.sufix}-${selectedBrand.name.replace(/\s+/g, '')}-${slug.replace(/\s+/g, '')}-${selectedUnit.shortName}-${createProductStore.changeSequentialValue(true)}`
}

export default useGenerateSKU
