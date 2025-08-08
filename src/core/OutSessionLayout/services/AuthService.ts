import { AxiosError } from 'axios';
import axiosInstance from '../../../api/axiosInstance';
import type { 
  LoginRequest, 
  LoginResponse, 
  ValidateTokenResponse, 
  RefreshTokenResponse,
  User 
} from 'src/core/OutSessionLayout/types/Auth';
import { 
  saveTokenToStorage, 
  removeTokenFromStorage, 
  getTokenFromStorage,
  getUserFromToken,
  isTokenValid 
} from '../../../utils/jwtUtils';

/**
 * Servicio de autenticación para manejar login, logout y gestión de tokens JWT
 */
class AuthService {
  
  /**
   * Realiza login con email y contraseña
   * @param email - Email del usuario
   * @param password - Contraseña del usuario
   * @returns Promise con el token JWT si es exitoso
   */
  async login(email: string, password: string): Promise<{ success: boolean; token?: string; message?: string }> {
    try {
      const loginData: LoginRequest = { email, password };
      
      const response = await axiosInstance.post<LoginResponse>('/auth/login', loginData);
      
      if (response.data.success && response.data.token) {
        const token = response.data.token;
        
        // Verificar que el token sea válido antes de guardarlo
        if (isTokenValid(token)) {
          saveTokenToStorage(token);
          return { 
            success: true, 
            token,
            message: response.data.message 
          };
        } else {
          return { 
            success: false, 
            message: 'Token recibido es inválido' 
          };
        }
      } else {
        return { 
          success: false, 
          message: response.data.message || 'Error en el login' 
        };
      }
    } catch (error) {
      // Manejar errores de respuesta del servidor (como 401 Unauthorized)
      if (error instanceof AxiosError && error.response) {
        // Extraer mensaje de error de la respuesta de la API
        const message = error.response.data.message || 'Error de autenticación';
        return { 
          success: false, 
          message 
        };
      }
      
      // Error de red u otro problema
      return { 
        success: false, 
        message: 'Error de conexión. Por favor, intenta nuevamente.' 
      };
    }
  }

  /**
   * Cierra sesión eliminando el token del almacenamiento
   */
  logout(): void {
    removeTokenFromStorage();
  }

  /**
   * Obtiene el usuario actual desde el token almacenado
   * @returns Usuario actual o null si no hay sesión
   */
  getCurrentUser(): User | null {
    const token = getTokenFromStorage();
    if (!token || !isTokenValid(token)) {
      return null;
    }
    
    return getUserFromToken(token);
  }

  /**
   * Obtiene el token actual almacenado
   * @returns Token JWT o null si no existe o es inválido
   */
  getCurrentToken(): string | null {
    const token = getTokenFromStorage();
    if (!token || !isTokenValid(token)) {
      return null;
    }
    
    return token;
  }

  /**
   * Verifica si hay una sesión activa válida
   * @returns true si hay sesión activa
   */
  isAuthenticated(): boolean {
    const token = getTokenFromStorage();
    return token !== null && isTokenValid(token);
  }

  /**
   * Valida el token actual con el servidor
   * @returns Promise con el resultado de la validación
   */
  async validateToken(): Promise<{ valid: boolean; user?: User; message?: string }> {
    try {
      const token = getTokenFromStorage();
      if (!token) {
        return { valid: false, message: 'No hay token almacenado' };
      }

      // Primero verificar localmente si el token no ha expirado
      if (!isTokenValid(token)) {
        this.logout(); // Limpiar token expirado
        return { valid: false, message: 'Token expirado' };
      }

      const response = await axiosInstance.get<ValidateTokenResponse>('/auth/validate');
      
      if (response.data.success && response.data.isValid) {
        const user = response.data.user || getUserFromToken(token);
        return { 
          valid: true, 
          user: user || undefined,
          message: response.data.message 
        };
      } else {
        this.logout(); // Token inválido según el servidor
        return { 
          valid: false, 
          message: response.data.message || 'Token inválido' 
        };
      }
    } catch (error) {
      console.error('Error validando token:', error);
      
      // Si es error 401 o 403, el token es inválido
      if (error instanceof AxiosError && (error.response?.status === 401 || error.response?.status === 403)) {
        this.logout();
        return { valid: false, message: 'Sesión expirada' };
      }
      
      return { 
        valid: false, 
        message: 'Error de conexión al validar token' 
      };
    }
  }

  /**
   * Renueva el token actual
   * @returns Promise con el nuevo token si es exitoso
   */
  async refreshToken(): Promise<{ success: boolean; token?: string; message?: string }> {
    try {
      const currentToken = getTokenFromStorage();
      if (!currentToken) {
        return { success: false, message: 'No hay token para renovar' };
      }

      const response = await axiosInstance.post<RefreshTokenResponse>('/auth/refresh');
      
      if (response.data.success && response.data.token) {
        const newToken = response.data.token;
        
        if (isTokenValid(newToken)) {
          saveTokenToStorage(newToken);
          return { 
            success: true, 
            token: newToken,
            message: response.data.message 
          };
        } else {
          return { 
            success: false, 
            message: 'Token renovado es inválido' 
          };
        }
      } else {
        this.logout(); // Si no se puede renovar, cerrar sesión
        return { 
          success: false, 
          message: response.data.message || 'Error renovando token' 
        };
      }
    } catch (error) {
      console.error('Error renovando token:', error);
      
      // Si es error 401 o 403, el token actual es inválido
      if (error instanceof AxiosError && (error.response?.status === 401 || error.response?.status === 403)) {
        this.logout();
        return { success: false, message: 'Sesión expirada, inicia sesión nuevamente' };
      }
      
      return { 
        success: false, 
        message: 'Error de conexión al renovar token' 
      };
    }
  }
}

// Exportar instancia singleton
export const authService = new AuthService();
export default authService;
