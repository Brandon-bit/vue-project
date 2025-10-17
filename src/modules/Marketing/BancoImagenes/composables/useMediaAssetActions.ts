import { useMediaAssetStore } from '../store/mediaAssetStore';
import type { AssetFormType, MediaType } from '../types/mediaAssetType';
import { getAssetsService, uploadAssetService, updateAssetDetailsService, deleteAssetService } from '../services/mediaAssetService';

const mapAssetRequest = (data: AssetFormType): FormData => {
  const formData = new FormData();
  formData.append('title', data.title);

  const tagsArray = data.tags.split(',').map(tag => tag.trim()).filter(Boolean);
  formData.append('tags', JSON.stringify(tagsArray));

  if (data.image) {
    formData.append('image', data.image, data.image.name);
    formData.append('fileName', data.image.name);
  }
  
  formData.append('uploadDate', new Date().toISOString());

  return formData;
};

export const useMediaAssetActions = () => {
  const mediaAssetStore = useMediaAssetStore();

  const getAssets = async (mediaType: MediaType, query?: string) => {
    const response = await getAssetsService(mediaType, query);
    return {
      items: response.data.items,
      total: response.data.totalItems,
    };
  };

  const uploadAsset = async (data: AssetFormType, mediaType: MediaType) => {
    const model = mapAssetRequest(data);
    model.append('mediaType', mediaType);
    
    if (data.image) {
        model.append('url', URL.createObjectURL(data.image as File));
    }

    const response = await uploadAssetService(model);
    return {
      message: response.message,
      status: response.success ? 'success' : 'error',
    };
  };

  const updateDetails = async (data: AssetFormType) => {
    const id = mediaAssetStore.selectedAsset.id;
    const tagsArray = data.tags.split(',').map(tag => tag.trim()).filter(Boolean);
    const details = { title: data.title, tags: tagsArray };

    const response = await updateAssetDetailsService(id, details);
    return {
      message: response.message,
      status: response.success ? 'success' : 'error',
    };
  };

  const deleteAsset = async () => {
    const id = mediaAssetStore.selectedAsset.id;
    const response = await deleteAssetService(id);
    return {
      message: response.message,
      status: response.success ? 'success' : 'error',
    };
  };

  return { getAssets, uploadAsset, updateDetails, deleteAsset };
};