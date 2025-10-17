// src/modules/Marketing/GestionMarcas/types/brandTypes.ts

// Define cómo se ve una cuenta social conectada que viene de tu backend
export interface SocialAccount {
  platform: string; // ej: 'facebook', 'instagram'
  username: string;
  profileImage?: string;
}

// Define cómo se ve una Marca en tu sistema
export interface Brand {
  id: string; // El ID de tu base de datos
  name: string;
  logo: string;
  emailDomain?: string;
  ayrshareProfileKey?: string | null; // La clave de Ayrshare asociada
  socials: SocialAccount[]; // Un array con las redes conectadas
}

// Define los datos necesarios para crear una nueva marca
export interface BrandCreationRequest {
  name: string;
  logo?: string;
  emailDomain?: string;
}