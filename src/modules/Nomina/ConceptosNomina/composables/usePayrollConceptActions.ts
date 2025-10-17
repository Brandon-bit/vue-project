import {
    PayrollConceptDTO,
    PayrollConceptFormDTO,
    SelectOptionDTO
} from '@/modules/Nomina/ConceptosNomina/types/payrollConceptTypes'
import usePayrollConceptStore from '@/modules/Nomina/ConceptosNomina/store/payrollConceptStore'
import {
    mapPayrollConceptToSelectOption
} from '@/modules/Nomina/ConceptosNomina/composables/mappingPayrollConcepts'

export const usePayrollConceptActions = () => {
    const payrollConceptStore = usePayrollConceptStore()

    // Mock data for payroll concepts
    const mockPayrollConcepts: PayrollConceptDTO[] = [
        // PERCEPCIONES
        { id: 1, name: 'Sueldo Base', code: 'P001', type: 'percepcion', description: 'Salario mensual base del empleado', isVariable: false, fixedAmount: 0, percentage: undefined, appliesISR: true, appliesIMSS: true, active: true },
        { id: 2, name: 'Bono de Puntualidad', code: 'P002', type: 'percepcion', description: 'Bono por asistencia puntual', isVariable: false, fixedAmount: 500, percentage: undefined, appliesISR: true, appliesIMSS: false, active: true },
        { id: 3, name: 'Comisiones', code: 'P003', type: 'percepcion', description: 'Comisiones por ventas', isVariable: true, fixedAmount: undefined, percentage: undefined, appliesISR: true, appliesIMSS: true, active: true },
        { id: 4, name: 'Horas Extra', code: 'P004', type: 'percepcion', description: 'Pago por horas trabajadas fuera del horario', isVariable: true, fixedAmount: undefined, percentage: undefined, appliesISR: true, appliesIMSS: true, active: true },
        { id: 5, name: 'Bono de Productividad', code: 'P005', type: 'percepcion', description: 'Incentivo por cumplimiento de metas', isVariable: false, fixedAmount: 1000, percentage: undefined, appliesISR: true, appliesIMSS: false, active: true },
        { id: 6, name: 'Aguinaldo', code: 'P006', type: 'percepcion', description: 'Prestación anual obligatoria', isVariable: false, fixedAmount: undefined, percentage: undefined, appliesISR: true, appliesIMSS: false, active: true },
        { id: 7, name: 'Prima Vacacional', code: 'P007', type: 'percepcion', description: 'Prestación por período vacacional', isVariable: false, fixedAmount: undefined, percentage: 25, appliesISR: true, appliesIMSS: false, active: true },
        
        // DEDUCCIONES
        { id: 8, name: 'ISR', code: 'D001', type: 'deduccion', description: 'Impuesto Sobre la Renta', isVariable: true, fixedAmount: undefined, percentage: undefined, appliesISR: false, appliesIMSS: false, active: true },
        { id: 9, name: 'IMSS', code: 'D002', type: 'deduccion', description: 'Seguro Social', isVariable: false, fixedAmount: undefined, percentage: 2.375, appliesISR: false, appliesIMSS: false, active: true },
        { id: 10, name: 'Préstamo Personal', code: 'D003', type: 'deduccion', description: 'Descuento por préstamo otorgado', isVariable: true, fixedAmount: undefined, percentage: undefined, appliesISR: false, appliesIMSS: false, active: true },
        { id: 11, name: 'Falta Injustificada', code: 'D004', type: 'deduccion', description: 'Descuento por inasistencia', isVariable: true, fixedAmount: undefined, percentage: undefined, appliesISR: false, appliesIMSS: false, active: true },
        { id: 12, name: 'Retardo', code: 'D005', type: 'deduccion', description: 'Descuento por llegada tarde', isVariable: false, fixedAmount: 100, percentage: undefined, appliesISR: false, appliesIMSS: false, active: true },
        { id: 13, name: 'Fondo de Ahorro', code: 'D006', type: 'deduccion', description: 'Aportación al fondo de ahorro', isVariable: false, fixedAmount: undefined, percentage: 5, appliesISR: false, appliesIMSS: false, active: true },
        { id: 14, name: 'Pensión Alimenticia', code: 'D007', type: 'deduccion', description: 'Descuento por orden judicial', isVariable: true, fixedAmount: undefined, percentage: undefined, appliesISR: false, appliesIMSS: false, active: false }
    ]

    const getPayrollConcepts = async (
        page: number,
        pageSize: number
    ): Promise<{ items: PayrollConceptDTO[]; total: number }> => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 300))

        const startIndex = (page - 1) * pageSize
        const endIndex = startIndex + pageSize
        const paginatedData = mockPayrollConcepts.slice(startIndex, endIndex)

        return {
            items: paginatedData,
            total: mockPayrollConcepts.length
        }
    }

    const getPayrollConceptsForSelect = async (tipo?: 'percepcion' | 'deduccion'): Promise<SelectOptionDTO[]> => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 200))

        let filtered = mockPayrollConcepts.filter((concept) => concept.active)
        
        if (tipo) {
            filtered = filtered.filter((concept) => concept.type === tipo)
        }

        return filtered.map(mapPayrollConceptToSelectOption)
    }

    const createPayrollConcept = async (
        data: PayrollConceptFormDTO
    ): Promise<{ message: string; status: string; data: any }> => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        const newConcept: PayrollConceptDTO = {
            id: mockPayrollConcepts.length + 1,
            ...data
        }

        mockPayrollConcepts.push(newConcept)

        return {
            message: 'Concepto de nómina creado exitosamente',
            status: 'success',
            data: newConcept
        }
    }

    const updatePayrollConcept = async (
        data: PayrollConceptFormDTO
    ): Promise<{ message: string; status: string; data: any }> => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        const index = mockPayrollConcepts.findIndex((concept) => concept.id === data.id)

        if (index !== -1) {
            mockPayrollConcepts[index] = {
                ...mockPayrollConcepts[index],
                ...data
            }

            return {
                message: 'Concepto de nómina actualizado exitosamente',
                status: 'success',
                data: mockPayrollConcepts[index]
            }
        }

        return {
            message: 'Concepto no encontrado',
            status: 'error',
            data: null
        }
    }

    const deletePayrollConcept = async (): Promise<{ message: string; status: string; data: any }> => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        const id = payrollConceptStore.selectedPayrollConcept?.id

        if (!id) {
            return {
                message: 'ID de concepto no válido',
                status: 'error',
                data: null
            }
        }

        const index = mockPayrollConcepts.findIndex((concept) => concept.id === id)

        if (index !== -1) {
            const deleted = mockPayrollConcepts.splice(index, 1)
            return {
                message: 'Concepto eliminado exitosamente',
                status: 'success',
                data: deleted[0]
            }
        }

        return {
            message: 'Concepto no encontrado',
            status: 'error',
            data: null
        }
    }

    return {
        getPayrollConcepts,
        getPayrollConceptsForSelect,
        createPayrollConcept,
        updatePayrollConcept,
        deletePayrollConcept
    }
}
