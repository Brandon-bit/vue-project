import { defineStore } from 'pinia';
import type { AssetType } from '../types/mediaAssetType';

const initialValues: AssetType = {
  id: '',
  url: '',
  title: '',
  tags: [],
  uploadDate: '',
  fileName: '',
  mediaType: 'image',
};

export const useMediaAssetStore = defineStore('media-asset-store', {
  state: () => ({
    selectedAsset: { ...initialValues } as AssetType,
    modalId: 'media-asset-modal',
  }),
  actions: {
    setData(data?: AssetType) {
      this.selectedAsset = data ? { ...data } : { ...initialValues };
    },
  },
});