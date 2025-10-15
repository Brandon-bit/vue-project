export interface ImageAssetType {
  id: string;
  url: string;        // URL pública donde se puede acceder a la imagen
  title: string;
  tags: string[];     // Un array de etiquetas para búsqueda y filtrado
  uploadDate: string; // Fecha en formato ISO (ej. "2025-10-15T12:00:00.000Z")
  fileName: string;   // Nombre original del archivo, útil para descargas
}

export interface ImageFormType {
  title: string;
  tags: string[];
  file: File | null;
  image?: File | null; 
}

export type ImageAssetRequest = FormData;
