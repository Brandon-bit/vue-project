import { defineStore } from 'pinia'
import { PayrollPeriodDTO } from '@/modules/Nomina/PeriodosNomina/types/payrollPeriodTypes'

const initialPayrollPeriod: PayrollPeriodDTO = {
    id: undefined,
    name: '',
    type: 'quincenal',
    startDate: '',
    endDate: '',
    status: 'borrador',
    payrollType: 'ordinaria',
    notes: '',
    totalPerceptions: 0,
    totalDeductions: 0,
    totalNet: 0,
    active: true
}

const usePayrollPeriodStore = defineStore('payroll-period-store', {
    state: () => ({
        payrollPeriods: [] as PayrollPeriodDTO[],
        selectedPayrollPeriod: null as PayrollPeriodDTO | null,
        modalId: 'payroll-period-modal'
    }),
    actions: {
        setData(data: PayrollPeriodDTO = initialPayrollPeriod) {
            this.selectedPayrollPeriod = { ...data }
        }
    }
})

export default usePayrollPeriodStore
