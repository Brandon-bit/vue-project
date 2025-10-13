export type AdminStockFormType = {
    id: string,
    idWarehouse: string,
    idProduct: string,
    idMovimiento: string,
    quantity: number,
    unitCost: number,
    stockAnterior: number,
    stockResultante: number,
    idUser: string,
    creationDate: Date,
    updateDate: Date,
    activo: string,
    eliminado: string
}