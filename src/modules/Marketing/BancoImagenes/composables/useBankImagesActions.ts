// src/modules/ImageBank/composables/useImageBankActions.ts

import { useImageBankStore } from '../store/imageBankStore';
import type { ImageAssetType, ImageFormType } from '../types/bankImageType';
import {
  getImagesService,
  uploadImageService,
  updateImageDetailsService,
  deleteImageService
} from '../services/banckImagesService';

const mapAssetRequest = (data: ImageFormType): FormData => {
  const formData = new FormData();
  formData.append('title', data.title);


  const tagsArray = data.tags.split(',').map(tag => tag.trim()).filter(Boolean);
  
  // FormData no soporta arrays directamente, así que lo enviamos como JSON
  formData.append('tags', JSON.stringify(tagsArray));

  if (data.image) {
    formData.append('image', data.image, data.image.name);
    formData.append('fileName', data.image.name);
  }
  
  // Añadimos la fecha de subida en el momento de la creación
  formData.append('uploadDate', new Date().toISOString());

  return formData;
};

export const useImageBankActions = () => {
  const imageBankStore = useImageBankStore();

  /**
   * Obtiene las imágenes, opcionalmente con un query de búsqueda.
   */
  const getImages = async (query?: string) => {
    const response = await getImagesService(query);
    return {
      items: response.data.items,
      total: response.data.totalItems
    };
  };

  /**
   * Sube una nueva imagen.
   */
  const uploadImage = async (data: ImageFormType) => {
    const model = mapAssetRequest(data);
    // Para json-server, necesitamos agregar una URL falsa. Un backend real la generaría.
    model.append('url', URL.createObjectURL(data.image as File));
    
    const response = await uploadImageService(model);
    return {
      message: response.message,
      status: response.success ? "success" : "error",
    };
  };
  
  /**
   * Actualiza los detalles de una imagen (título y tags).
   */
  const updateDetails = async (data: ImageFormType) => {
    const id = imageBankStore.selectedAsset.id;
    const tagsArray = data.tags.split(',').map(tag => tag.trim()).filter(Boolean);
    const details = { title: data.title, tags: tagsArray };

    const response = await updateImageDetailsService(id, details);
    return {
        message: response.message,
        status: response.success ? "success" : "error",
    };
  };

  /**
   * Elimina la imagen seleccionada.
   */
  const deleteImage = async () => {
    const id = imageBankStore.selectedAsset.id;
    const response = await deleteImageService(id);
    return {
      message: response.message,
      status: response.success ? "success" : "error",
    };
  };

  return { getImages, uploadImage, updateDetails, deleteImage };
};