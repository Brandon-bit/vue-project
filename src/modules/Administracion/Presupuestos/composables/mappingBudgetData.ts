import type { 
    BudgetResponseType,
    BudgetFormType, 
    BudgetType
} from '@/modules/Administracion/Presupuestos/types/budgetTypes'

export const mapBudget = (model: BudgetResponseType): BudgetType => {
    return {
        id: model.id,
        area: model.area,
        budgeted: model.presupuestado,
        spent: model.gastado,
        percentage: model.porcentaje,
        status: model.status as 'success' | 'warning' | 'danger',
        fiscalYear: model.anioFiscal,
        creationDate: model.fechaCreacion
    }
}

export const mapBudgetRequest = (model: BudgetFormType): any => {
    return {
        Area: model.area,
        Presupuestado: model.budgeted,
        AnioFiscal: model.fiscalYear,
        Descripcion: model.description || '',
        Gastado: 0,
        Porcentaje: 0,
        Status: 'success'
    }
}
