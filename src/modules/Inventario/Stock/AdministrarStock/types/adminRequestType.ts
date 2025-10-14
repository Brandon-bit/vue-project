export type adminRequestType = {
    IdProducto: string,
    IdMovimiento: string,
    IdAlmacen: string,
    Cantidad: number,
    CostoUnitario: number,
    StockAnterior: number,
    StockResultante: number,
    IdUsuario: string,
    FechaCreacion: Date,
    FechaActualizacion: Date,
    Activo: string,
    Eliminado: string
}