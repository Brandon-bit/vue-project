import type { 
    AccountResponseType,
    AccountFormType, 
    AccountType 
} from '@/modules/Contabilidad/CatalogoDeCuentas/types/accountsCatalogTypes'

export const mapAccount = (model: AccountResponseType): AccountType => {
    return {
        id: model.id,
        code: model.codigo,
        name: model.nombre,
        type: model.tipo,
        nature: model.naturaleza,
        level: model.nivel,
        balance: model.saldo,
        currency: model.moneda,
        acceptsMovements: model.aceptaMovimientos,
        requiresAuxiliary: model.requiereAuxiliar,
        active: model.activa,
        subaccounts: model.subcuentas?.map(mapAccount)
    }
}

export const mapAccountRequest = (model: AccountFormType): any => {
    return {
        codigo: model.code,
        nombre: model.name,
        tipo: model.type,
        naturaleza: model.nature,
        nivel: parseInt(model.level.toString()),
        moneda: model.currency,
        aceptaMovimientos: model.acceptsMovements,
        requiereAuxiliar: model.requiresAuxiliary,
        activa: model.active
    }
}
