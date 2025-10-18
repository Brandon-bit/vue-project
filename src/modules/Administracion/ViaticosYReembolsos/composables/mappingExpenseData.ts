import type { 
    ExpenseResponseType,
    ExpenseFormType, 
    ExpenseType
} from '@/modules/Administracion/ViaticosYReembolsos/types/expenseTypes'

export const mapExpense = (model: ExpenseResponseType): ExpenseType => {
    return {
        id: model.id,
        concept: model.concepto,
        date: model.fecha,
        amount: model.monto,
        status: model.estado,
        verified: model.comprobado,
        employee: model.empleado,
        description: model.descripcion,
        category: model.categoria
    }
}

export const mapExpenseRequest = (model: ExpenseFormType) => {
    return {
        Concepto: model.concept,
        Fecha: model.date,
        Monto: model.amount,
        Categoria: model.category,
        Descripcion: model.description || ''
    }
}
