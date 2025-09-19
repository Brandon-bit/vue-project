import { defineStore } from 'pinia'
import { SelectedCategoryType } from '@pos/PuntoDeVenta/types/posTypes'

const usePosStore = defineStore('pos-store', {
    state: () => ({
        categories: [],
        products: [],
        selectedProducts: [],
        totalQuantity: 0 as number,
        priceType: 0 as number | null,
        selectedCategory: null as SelectedCategoryType,
        isAvailablesGetProducts: true,
        modalId: 'pos-modal',
        searchWord: '' as string,
        pageNumber: 1 as number,
        isSearching: false as boolean,
        isLoading: false as boolean
    }),
    actions: {
        setCategories(data: any) {
            this.categories = data
        },
        resetProducts() {
            this.products = []
        },
        setProducts(data: any) {
            this.products = [...this.products, ...data]
        },
        addProduct(data: any) {
            const productIndex = this.selectedProducts.findIndex((p) => p.id === data.id)

            if (productIndex !== -1) {
                // Ya existe, aumentar cantidad
                const existingProduct = this.selectedProducts[productIndex]

                existingProduct.quantity += 1
                existingProduct.totalPrice = parseFloat(
                    (existingProduct.basePrice * existingProduct.quantity).toFixed(2)
                )

                // Aumentar total global
                this.totalQuantity = parseFloat(
                    (this.totalQuantity + existingProduct.basePrice).toFixed(2)
                )
            } else {
                // Nuevo producto
                const newProduct = {
                    ...data,
                    quantity: 1,
                    basePrice: data.basePrice ?? data.totalPrice, // Asegura que basePrice esté definido
                    totalPrice: parseFloat((data.basePrice ?? data.totalPrice).toFixed(2))
                }

                this.selectedProducts = [...this.selectedProducts, newProduct]

                this.totalQuantity = parseFloat(
                    (this.totalQuantity + newProduct.totalPrice).toFixed(2)
                )
            }
        },
        updateTotalQuantity(id: number, type: boolean) {
            const productIndex = this.selectedProducts.findIndex((p) => p.id === id)
            if (productIndex === -1) return

            const product = this.selectedProducts[productIndex]

            if (type) {
                // Aumentar cantidad
                product.quantity += 1

                // Recalcular totalPrice del producto
                product.totalPrice = parseFloat((product.basePrice * product.quantity).toFixed(2))

                // Aumentar totalQuantity global
                this.totalQuantity = parseFloat((this.totalQuantity + product.basePrice).toFixed(2))
            } else {
                if (product.quantity === 1) {
                    // Eliminar producto si cantidad llega a 0
                    this.selectedProducts.splice(productIndex, 1)

                    // Restar basePrice de totalQuantity
                    this.totalQuantity = parseFloat(
                        (this.totalQuantity - product.basePrice).toFixed(2)
                    )
                } else {
                    // Disminuir cantidad
                    product.quantity -= 1

                    // Restar basePrice de totalPrice del producto
                    product.totalPrice = parseFloat(
                        (product.totalPrice - product.basePrice).toFixed(2)
                    )

                    // Restar basePrice de totalQuantity global
                    this.totalQuantity = parseFloat(
                        (this.totalQuantity - product.basePrice).toFixed(2)
                    )
                }
            }
        },
        deletedSelectedProduct(id: number) {
            const index = this.selectedProducts.findIndex((p) => p.id === id)
            if (index === -1) return

            const product = this.selectedProducts[index]

            // Restar el totalPrice del producto del total general
            this.totalQuantity = parseFloat((this.totalQuantity - product.totalPrice).toFixed(2))

            // Eliminar el producto
            this.selectedProducts.splice(index, 1)
        },
        setPriceType(id: number | null) {
            this.priceType = id
        },
        setSelectedCategory(category: null | string) {
            this.selectedCategory = category
        },
        setIsAvailablesGetProducts(isAvailable: boolean) {
            this.isAvailablesGetProducts = isAvailable
        },
        setSearchWord(word: string) {
            this.searchWord = word
        },
        setPageNumber(number: number) {
            console.log('aqui', number)
            this.pageNumber = number
        }
    }
})

export default usePosStore
