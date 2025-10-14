import { defineStore } from 'pinia';
import type { TransferFormType, TrasladodetalleRequestType } from '../Types/transferStock';

/**
 * Describe la forma de un producto dentro de la lista temporal de detalles en el frontend.
 * Se le añade 'nombreProducto' para poder mostrarlo fácilmente en la tabla.
 */
export interface TransferDetailForm {
  idProducto: string;
  nombreProducto: string;
  cantidad: number;
}

/**
 * Estado inicial del formulario de traslado
 */
const initialTransfer: TransferFormType = {
  idWarehouseOrigin: '',
  idWarehouseDestination: '',
  driver: '',
  remarks: '',
  transferDate: '',
  idProduct: null,
  quantity: '1',
  Trasladodetalles: [],
};

/**
 * Función que convierte los detalles del backend al formato del frontend
 */
function mapFromBackendToForm(
  detalles: TrasladodetalleRequestType[]
): TransferDetailForm[] {
  return detalles.map((d) => ({
    idProducto: d.IdProducto ?? '',
    cantidad: parseInt(d.Cantidad, 10) || 0,
    nombreProducto: 'Nombre no disponible en edición',
  }));
}

export const useTransferStore = defineStore('transfer-store', {
  state: () => ({
    /**
     * Guarda los datos del traslado completo que se está editando.
     */
    selectedTransfer: { ...initialTransfer } as TransferFormType,

    /**
     * Lista temporal para los productos que el usuario añade en la vista de creación/edición.
     */
    detailItems: [] as TransferDetailForm[],
  }),

  actions: {
    /**
     * Carga datos en el store.
     * Si recibe datos del backend, los convierte al formato frontend.
     * Si no, limpia el estado.
     */
    setData(
      data: TransferFormType | { Trasladodetalles: TrasladodetalleRequestType[] } = initialTransfer
    ) {
      // Mantener el estado del formulario
      this.selectedTransfer = data as TransferFormType;

      if (data.Trasladodetalles && data.Trasladodetalles.length > 0) {
        this.detailItems = mapFromBackendToForm(
          data.Trasladodetalles as TrasladodetalleRequestType[]
        );
      } else {
        this.detailItems = [];
      }
    },

    /**
     * Añade un producto a la lista 'detailItems'.
     * Si el producto ya existe, actualiza la cantidad.
     */
    addProduct(productDetail: TransferDetailForm) {
      const existingProduct = this.detailItems.find(
        (item) => item.idProducto === productDetail.idProducto
      );

      if (existingProduct) {
        existingProduct.cantidad += productDetail.cantidad;
      } else {
        this.detailItems.push(productDetail);
      }
    },

    /**
     * Elimina un producto de la lista 'detailItems' usando su ID.
     */
    removeProduct(productId: string) {
      this.detailItems = this.detailItems.filter(
        (item) => item.idProducto !== productId
      );
    },

    /**
     * Vacía por completo la lista de productos.
     */
    clearDetails() {
      this.detailItems = [];
    },
  },
});

export default useTransferStore;
