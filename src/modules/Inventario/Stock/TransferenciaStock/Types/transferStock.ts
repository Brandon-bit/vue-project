export interface TransferResponseType {
  id?: string;
  idDocumento?: string;
  inventarioalmacenId?: string;
  idAlmacenOrigen?: string;
  idAlmacenDestino?: string;
  idTransportista?: string;
  idTipotransporte?: string;
  idTipomovimiento?: string;
  idGuiaEnvio?: string;
  idEstatus?: string;
  fechaTraslado?: string;             
  documentoReferencia?: string;
  guiaEnvioStr?: string;
  placa?: string;
  conductor?: string;
  observaciones?: string;
  idUsuario?: string;
  fechaCreacion?: string;            
  fechaActualizacion?: string;       
  activo?: string;
  eliminado?: string;

  
  trasladodocumento?: any;  
  almacen?: any;            
  trasladotipoenvio?: any;  
  transportista?: any;      
  transportetipo?: any;     
  guiaenvioresponse?: any;  
  trasladoestatus?: any;    
  trasladodetalles?: any[]; 
  cantidad: number;
  IdProducto: string | null
}

export interface TransferType {
  id?: string;
  idDocument?: string;
  inventoryWarehouseId?: string;
  idWarehouseOrigin?: string;
  idWarehouseDestination?: string;
  idCarrier?: string;
  idTransportType?: string;
  idMovementType?: string;
  idShippingGuide?: string;
  idStatus?: string;
  transferDate?: string;
  referenceDocument?: string;
  shippingGuideStr?: string;
  plate?: string;
  driver?: string;
  remarks?: string;
  idUser?: string;
  createdAt?: string;
  updatedAt?: string;
  active?: string;
  deleted?: string;
  transferDocument?: any;
  warehouse?: any;
  transferShippingType?: any;
  carrier?: any;
  transportType?: any;
  shippingGuideResponse?: any;
  transferStatus?: any;
  transferDetails?: any[];
  idProduct?:string | null
  quantity: number
}

export type TransferRequestType = {
  IdAlmacenOrigen: string;
  IdAlmacenDestino: string;
  FechaTraslado?: Date;
  Trasladodetalles: TrasladodetalleRequestType[];
  Conductor?: string;
  Observaciones?: string;
}

export type TransferFormType = {
  idWarehouseOrigin: string;
  idWarehouseDestination: string;
  transferDate?: string;
  driver?: string;
  remarks?: string;
 Trasladodetalles: TransferDetailForm[]
  idProduct: string | null
  quantity: string

}

export interface TransferDetailForm {
  idProducto: string;      // minúscula
  nombreProducto: string;
  cantidad: number;
}

export interface TrasladodetalleRequestType {
  IdProducto: string | null
  Cantidad: string;
  
}

export type WarehouseType ={
    id: string;
  nombre: string;
}


