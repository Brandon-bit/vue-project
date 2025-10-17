import {
    PayrollConcept,
    PayrollConceptDTO,
    PayrollConceptFormDTO,
    PayrollConceptRequest,
    SelectOptionDTO
} from '@/modules/Nomina/ConceptosNomina/types/payrollConceptTypes'

// Map backend response to frontend DTO
export const mapPayrollConceptDTO = (data: PayrollConcept): PayrollConceptDTO => ({
    id: data.id,
    name: data.nombre,
    code: data.clave,
    type: data.tipo,
    description: data.descripcion,
    isVariable: data.esVariable,
    fixedAmount: data.montoFijo,
    percentage: data.porcentaje,
    appliesISR: data.aplicaISR,
    appliesIMSS: data.aplicaIMSS,
    active: data.activo
})

// Map frontend form to backend request
export const mapPayrollConceptRequest = (data: PayrollConceptFormDTO): PayrollConceptRequest => ({
    id: data.id,
    nombre: data.name,
    clave: data.code,
    tipo: data.type,
    descripcion: data.description,
    esVariable: data.isVariable,
    montoFijo: data.fixedAmount,
    porcentaje: data.percentage,
    aplicaISR: data.appliesISR,
    aplicaIMSS: data.appliesIMSS,
    activo: data.active
})

// Map payroll concept to select option
export const mapPayrollConceptToSelectOption = (data: PayrollConceptDTO): SelectOptionDTO => ({
    id: data.id!,
    label: `${data.code} - ${data.name}`,
    type: data.type
})
