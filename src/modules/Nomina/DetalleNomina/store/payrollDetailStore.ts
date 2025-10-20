import { defineStore } from 'pinia'
import {
    PayrollDetailDTO,
    EmployeePayrollSummary
} from '@/modules/Nomina/DetalleNomina/types/payrollDetailTypes'

const initialPayrollDetail: PayrollDetailDTO = {
    id: undefined,
    payrollPeriodId: 0,
    employeeId: 0,
    conceptId: 0,
    amount: 0,
    type: 'percepcion',
    notes: ''
}

const usePayrollDetailStore = defineStore('payroll-detail-store', {
    state: () => ({
        payrollDetails: [] as PayrollDetailDTO[],
        selectedPayrollDetail: null as PayrollDetailDTO | null,
        selectedEmployee: null as EmployeePayrollSummary | null,
        currentPayrollPeriodId: null as number | null,
        currentPeriodStatus: 'borrador' as 'borrador' | 'calculada' | 'pagada' | 'cerrada',
        modalId: 'payroll-detail-modal',
        employeeModalId: 'add-employee-modal'
    }),
    actions: {
        setData(data: PayrollDetailDTO = initialPayrollDetail) {
            this.selectedPayrollDetail = { ...data }
        },
        setEmployee(employee: EmployeePayrollSummary | null) {
            this.selectedEmployee = employee
        },
        setCurrentPeriod(periodId: number | null) {
            this.currentPayrollPeriodId = periodId
        },
        setPeriodStatus(status: 'borrador' | 'calculada' | 'pagada' | 'cerrada') {
            this.currentPeriodStatus = status
        }
    },
    getters: {
        canEdit(): boolean {
            // Se puede editar en borrador y calculada
            return (
                this.currentPeriodStatus === 'borrador' || this.currentPeriodStatus === 'calculada'
            )
        },
        isReadOnly(): boolean {
            // Solo es read-only cuando está pagada o cerrada
            return this.currentPeriodStatus === 'pagada' || this.currentPeriodStatus === 'cerrada'
        }
    }
})

export default usePayrollDetailStore
