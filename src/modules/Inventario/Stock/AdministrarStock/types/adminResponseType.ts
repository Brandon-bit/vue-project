export type adminResponseType = {
    id: string,
    idAlmacen: string,
    idProducto: string,
    idMovimiento: string,
    cantidad: number,
    costoUnitario: number,
    stockAnterior: number,
    stockResultante: number,
    idUsuario: string,
    fechaCreacion: Date,
    fechaActualizacion: Date,
    activo: string,
    eliminado: string
}