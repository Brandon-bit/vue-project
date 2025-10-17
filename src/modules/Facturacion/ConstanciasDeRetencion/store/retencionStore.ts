import { defineStore } from 'pinia'
import type { RetencionType, ConstanciaFormType } from '@/modules/Facturacion/ConstanciasDeRetencion/types/retencionTypes'

const useRetencionStore = defineStore('retencion-store', {
    state: () => ({
        modalId: 'retencion-modal',
        currentStep: 'receptor' as 'receptor' | 'retenciones' | 'preview',
        formData: {
            rfc: '',
            razonSocial: '',
            regimenFiscal: '',
            codigoPostal: '',
            mes: '',
            anio: new Date().getFullYear().toString(),
            retenciones: []
        } as ConstanciaFormType
    }),
    actions: {
        setCurrentStep(step: 'receptor' | 'retenciones' | 'preview') {
            this.currentStep = step
        },
        setFormData(data: Partial<ConstanciaFormType>) {
            this.formData = { ...this.formData, ...data }
        },
        addRetencion(retencion: RetencionType) {
            this.formData.retenciones.push(retencion)
        },
        removeRetencion(id: string) {
            this.formData.retenciones = this.formData.retenciones.filter(r => r.id !== id)
        },
        calculateTotales() {
            const totalISR = this.formData.retenciones.reduce((sum, r) => sum + r.montoISR, 0)
            const totalIVA = this.formData.retenciones.reduce((sum, r) => sum + r.montoIVA, 0)
            const total = this.formData.retenciones.reduce((sum, r) => sum + r.total, 0)
            return { totalISR, totalIVA, total }
        },
        reset() {
            this.currentStep = 'receptor'
            this.formData = {
                rfc: '',
                razonSocial: '',
                regimenFiscal: '',
                codigoPostal: '',
                mes: '',
                anio: new Date().getFullYear().toString(),
                retenciones: []
            }
        }
    }
})

export default useRetencionStore
