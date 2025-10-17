import { defineStore } from 'pinia'
import type { CFDIFormType, ConceptoType, EmisorType } from '@/modules/Facturacion/GeneracionDeCFDI/types/cfdiTypes'

const useCFDIStore = defineStore('cfdi-store', {
    state: () => ({
        modalId: 'cfdi-modal',
        currentStep: 'datos' as 'datos' | 'conceptos' | 'preview',
        formData: {
            emisor: {
                rfc: 'ABC123456XYZ',
                razonSocial: 'Mi Empresa S.A. de C.V.',
                regimenFiscal: '601',
                codigoPostal: '06000'
            } as EmisorType,
            receptor: {
                rfc: '',
                razonSocial: '',
                regimenFiscal: '',
                codigoPostal: '',
                usoCFDI: ''
            },
            comprobante: {
                metodoPago: '',
                formaPago: '',
                moneda: 'MXN'
            },
            conceptos: []
        } as CFDIFormType
    }),
    actions: {
        setCurrentStep(step: 'datos' | 'conceptos' | 'preview') {
            this.currentStep = step
        },
        setReceptor(receptor: Partial<CFDIFormType['receptor']>) {
            this.formData.receptor = { ...this.formData.receptor, ...receptor }
        },
        setComprobante(comprobante: Partial<CFDIFormType['comprobante']>) {
            this.formData.comprobante = { ...this.formData.comprobante, ...comprobante }
        },
        addConcepto(concepto: ConceptoType) {
            this.formData.conceptos.push(concepto)
        },
        removeConcepto(id: string) {
            this.formData.conceptos = this.formData.conceptos.filter(c => c.id !== id)
        },
        calculateTotales() {
            const subtotal = this.formData.conceptos.reduce((sum, c) => sum + c.importe, 0)
            const totalIVA = this.formData.conceptos.reduce((sum, c) => sum + c.iva, 0)
            const total = this.formData.conceptos.reduce((sum, c) => sum + c.total, 0)
            return { subtotal, totalIVA, total }
        },
        reset() {
            this.currentStep = 'datos'
            this.formData = {
                emisor: {
                    rfc: 'ABC123456XYZ',
                    razonSocial: 'Mi Empresa S.A. de C.V.',
                    regimenFiscal: '601',
                    codigoPostal: '06000'
                },
                receptor: {
                    rfc: '',
                    razonSocial: '',
                    regimenFiscal: '',
                    codigoPostal: '',
                    usoCFDI: ''
                },
                comprobante: {
                    metodoPago: '',
                    formaPago: '',
                    moneda: 'MXN'
                },
                conceptos: []
            }
        }
    }
})

export default useCFDIStore
