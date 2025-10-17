import { defineStore } from 'pinia'
import type { ComplementTypeEnum, CFDIDisponibleType, ComplementoPagoFormType } from '@/modules/Facturacion/GeneracionDeComplementos/types/complementTypes'

const useComplementStore = defineStore('complement-store', {
    state: () => ({
        modalId: 'complement-modal',
        tipoComplemento: '' as ComplementTypeEnum,
        currentStep: 'seleccion' as 'seleccion' | 'formulario' | 'preview',
        cfdiSeleccionado: null as CFDIDisponibleType | null,
        formDataPago: {
            cfdiRelacionado: null,
            fechaPago: new Date().toISOString().split('T')[0],
            formaPago: '',
            montoPago: 0,
            moneda: 'MXN',
            bancoOrdenante: '',
            cuentaOrdenante: '',
            bancoBeneficiario: '',
            cuentaBeneficiaria: '',
            numeroOperacion: ''
        } as ComplementoPagoFormType
    }),
    actions: {
        setTipoComplemento(tipo: ComplementTypeEnum) {
            this.tipoComplemento = tipo
        },
        setCurrentStep(step: 'seleccion' | 'formulario' | 'preview') {
            this.currentStep = step
        },
        setCfdiSeleccionado(cfdi: CFDIDisponibleType | null) {
            this.cfdiSeleccionado = cfdi
            if (cfdi) {
                this.formDataPago.cfdiRelacionado = cfdi
            }
        },
        setFormDataPago(data: Partial<ComplementoPagoFormType>) {
            this.formDataPago = { ...this.formDataPago, ...data }
        },
        reset() {
            this.tipoComplemento = ''
            this.currentStep = 'seleccion'
            this.cfdiSeleccionado = null
            this.formDataPago = {
                cfdiRelacionado: null,
                fechaPago: new Date().toISOString().split('T')[0],
                formaPago: '',
                montoPago: 0,
                moneda: 'MXN',
                bancoOrdenante: '',
                cuentaOrdenante: '',
                bancoBeneficiario: '',
                cuentaBeneficiaria: '',
                numeroOperacion: ''
            }
        }
    }
})

export default useComplementStore
