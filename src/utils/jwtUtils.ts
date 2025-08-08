import type { JwtPayload, User } from 'src/core/OutSessionLayout/types/Auth';

// Clave para localStorage
const TOKEN_KEY = 'jmas_auth_token';

/**
 * Decodifica un JWT sin verificar la firma (solo para extraer payload)
 * @param token - JWT string
 * @returns Payload decodificado o null si es inválido
 */
export const decodeToken = (token: string): JwtPayload | null => {
  try {
    // JWT tiene formato: header.payload.signature
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }

    // Decodificar el payload (segunda parte)
    const payload = parts[1];
    
    // Agregar padding si es necesario para base64
    const paddedPayload = payload + '='.repeat((4 - payload.length % 4) % 4);
    
    // Decodificar base64 y parsear JSON
    const decodedPayload = JSON.parse(atob(paddedPayload));
    
    return decodedPayload as JwtPayload;
  } catch (error) {
    console.error('Error decodificando JWT:', error);
    return null;
  }
};

/**
 * Verifica si un token ha expirado
 * @param token - JWT string
 * @returns true si ha expirado, false si aún es válido
 */
export const isTokenExpired = (token: string): boolean => {
  const payload = decodeToken(token);
  if (!payload || !payload.exp) {
    return true;
  }

  // exp viene en segundos, Date.now() en milisegundos
  const currentTime = Math.floor(Date.now() / 1000);
  return payload.exp < currentTime;
};

/**
 * Extrae información del usuario desde el JWT
 * @param token - JWT string
 * @returns Objeto User o null si es inválido
 */
export const getUserFromToken = (token: string): User | null => {
  const payload = decodeToken(token);
  if (!payload) {
    return null;
  }

  return {
    userId: payload.UserId,
    accountId: payload.AccountId,
    userName: payload.UserName,
    userEmail: payload.UserEmail,
  };
};

/**
 * Verifica si un token es válido (no expirado y bien formado)
 * @param token - JWT string
 * @returns true si es válido
 */
export const isTokenValid = (token: string): boolean => {
  if (!token) return false;
  
  const payload = decodeToken(token);
  if (!payload) return false;
  
  return !isTokenExpired(token);
};

/**
 * Obtiene el token desde localStorage
 * @returns Token string o null si no existe
 */
export const getTokenFromStorage = (): string | null => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error obteniendo token del localStorage:', error);
    return null;
  }
};

/**
 * Guarda el token en localStorage
 * @param token - JWT string a guardar
 */
export const saveTokenToStorage = (token: string): void => {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error('Error guardando token en localStorage:', error);
  }
};

/**
 * Elimina el token del localStorage
 */
export const removeTokenFromStorage = (): void => {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error eliminando token del localStorage:', error);
  }
};

/**
 * Obtiene el tiempo restante hasta la expiración del token en minutos
 * @param token - JWT string
 * @returns Minutos restantes o 0 si ha expirado
 */
export const getTokenTimeRemaining = (token: string): number => {
  const payload = decodeToken(token);
  if (!payload || !payload.exp) {
    return 0;
  }

  const currentTime = Math.floor(Date.now() / 1000);
  const timeRemaining = payload.exp - currentTime;
  
  return Math.max(0, Math.floor(timeRemaining / 60)); // Convertir a minutos
};
