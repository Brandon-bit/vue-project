export type MediaType = 'image' | 'video' | 'audio';

export interface BaseAssetType {
  id: string;
  url: string;
  title: string;
  tags: string[];
  uploadDate: string;
  fileName: string;
  mediaType: MediaType;
}

export interface ImageAssetType extends BaseAssetType {
  mediaType: 'image';
}

export interface VideoAssetType extends BaseAssetType {
  mediaType: 'video';
  duration?: string;
  thumbnailUrl?: string;
}

export interface AudioAssetType extends BaseAssetType {
  mediaType: 'audio';
  artist?: string;
  album?: string;
}

export type AssetType = ImageAssetType | VideoAssetType | AudioAssetType;

export interface AssetFormType {
  title: string;
  tags: string;
  file: File | null;
  image?: File | null; 
}

export type AssetRequest = FormData;