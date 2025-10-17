import { defineStore } from 'pinia'
import type { PurchaseRequestType, PurchaseRequestItemType } from '@/modules/Compras/SolicitudesDeCompra/types/purchaseRequestTypes'

const usePurchaseRequestStore = defineStore('purchase-request-store', {
    state: () => ({
        modalId: 'purchase-request-modal',
        selectedRequest: null as PurchaseRequestType | null,
        currentStep: 1,
        formData: {
            area: '',
            justificacion: '',
            items: [] as PurchaseRequestItemType[]
        }
    }),
    actions: {
        setSelectedRequest(request: PurchaseRequestType | null) {
            this.selectedRequest = request
        },
        setCurrentStep(step: number) {
            this.currentStep = step
        },
        nextStep() {
            if (this.currentStep < 4) {
                this.currentStep++
            }
        },
        previousStep() {
            if (this.currentStep > 1) {
                this.currentStep--
            }
        },
        setFormData(data: Partial<typeof this.formData>) {
            this.formData = { ...this.formData, ...data }
        },
        addItem(item: PurchaseRequestItemType) {
            this.formData.items.push(item)
        },
        removeItem(index: number) {
            this.formData.items.splice(index, 1)
        },
        updateItemQuantity(index: number, cantidad: number) {
            if (this.formData.items[index]) {
                this.formData.items[index].cantidad = cantidad
                this.formData.items[index].subtotal = cantidad * this.formData.items[index].precio
            }
        },
        calculateTotal(): number {
            return this.formData.items.reduce((sum, item) => sum + item.subtotal, 0)
        },
        reset() {
            this.selectedRequest = null
            this.currentStep = 1
            this.formData = {
                area: '',
                justificacion: '',
                items: []
            }
        }
    }
})

export default usePurchaseRequestStore
