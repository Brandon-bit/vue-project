import {defineStore} from 'pinia'
import {ImageAssetType} from '../types/bankImageType'

const initialValues : ImageAssetType ={

    id: '',
    url: '',
    title: '',
    tags: [],
    uploadDate: '',
    fileName: '',
}

export const useImageBankStore = defineStore('image-bank-store', {
  state: () => ({
    selectedAsset: initialValues as ImageAssetType,
    modalId: 'image-bank-modal'
  }),
  actions: {
    setData(data: ImageAssetType = initialValues) {
      this.selectedAsset = { ...data };
    }
  }
});