import { TransferFormType, TransferRequestType, TransferResponseType, TransferType,TrasladodetalleRequestType } from "../Types/transferStock";

export const mapTransfer = (model : TransferResponseType) : TransferType =>{

    return {
    id: model.id,
    idWarehouseOrigin: model.idAlmacenOrigen,
    idWarehouseDestination: model.idAlmacenDestino,
    transferDate: model.fechaTraslado ,
    referenceDocument: model.documentoReferencia,
    quantity: model.cantidad,
    idProduct: model.IdProducto
    }
}

export const mapTransferRequest = (model: TransferFormType): TransferRequestType => {
    
    
    const detallesMapeados: TrasladodetalleRequestType[] = model.Trasladodetalles.map(detalleFE => ({
  IdProducto: detalleFE.idProducto ?? "",          // usa el campo de tu formulario
  Cantidad: String(detalleFE.cantidad ?? 0)        // evita "undefined"
}));
    
    return {
        IdAlmacenOrigen: model.idWarehouseOrigin,
        IdAlmacenDestino: model.idWarehouseDestination,
       Trasladodetalles: detallesMapeados,
        Observaciones: model.remarks,
        Conductor: model.driver,
        
     
    };
        
    }
