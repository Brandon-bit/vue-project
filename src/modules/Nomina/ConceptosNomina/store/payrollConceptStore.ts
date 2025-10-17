import { defineStore } from 'pinia'
import { PayrollConceptDTO } from '@/modules/Nomina/ConceptosNomina/types/payrollConceptTypes'

const initialPayrollConcept: PayrollConceptDTO = {
    id: undefined,
    name: '',
    code: '',
    type: 'percepcion',
    description: '',
    isVariable: false,
    fixedAmount: 0,
    percentage: 0,
    appliesISR: false,
    appliesIMSS: false,
    active: true
}

const usePayrollConceptStore = defineStore('payroll-concept-store', {
    state: () => ({
        payrollConcepts: [] as PayrollConceptDTO[],
        selectedPayrollConcept: null as PayrollConceptDTO | null,
        modalId: 'payroll-concept-modal'
    }),
    actions: {
        setData(data: PayrollConceptDTO = initialPayrollConcept) {
            this.selectedPayrollConcept = { ...data }
        }
    }
})

export default usePayrollConceptStore
