import { z } from 'zod'

export const transferSchema = z.object({
  idWarehouseOrigin: z.string().min(1, 'El almacén de origen es obligatorio'),
  idWarehouseDestination: z.string().min(1, 'El almacén de destino es obligatorio'),
  transferDate: z.string().min(1, 'La fecha de traslado es obligatoria'),
  driver: z.string().min(1, 'El nombre del conductor es obligatorio'),
  remarks: z.string().optional(),
  idProduct: z.string().nullable(),
  quantity: z.preprocess(val => Number(val), z.number().min(1, 'La cantidad debe ser mayor a 0')),
  Trasladodetalles: z
    .array(
      z.object({
        idProducto: z.string(),
        nombreProducto: z.string(),
        cantidad: z.number().min(1)
      })
    )
    .min(1, 'Debe agregar al menos un producto')
})
