// Tipos para el sistema de autenticación JWT

/**
 * Datos enviados en la petición de login.
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Respuesta del endpoint de login.
 */
export interface LoginResponse {
  success: boolean;
  token?: string;
  message?: string;
}

/**
 * Respuesta de los endpoints de validación y refresco de token.
 */
export interface ValidateTokenResponse {
  success: boolean;
  isValid: boolean;
  user?: User;
  message?: string;
}

export interface RefreshTokenResponse {
  success: boolean;
  token?: string;
  expiresAt?: string;
  message?: string;
}

/**
 * Payload decodificado del JWT.
 */
export interface JwtPayload {
  UserId: string;
  AccountId: string;
  UserName: string;
  UserEmail: string;
  exp: number; // Expiration time (Unix timestamp)
  iat: number; // Issued at (Unix timestamp)
}

/**
 * Información del usuario disponible globalmente.
 */
export interface User {
  userId: string;
  userName: string;
  userEmail: string;
  accountId: string;
}

/**
 * Estado del contexto de autenticación.
 */
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  isLoading: boolean;
}

/**
 * Tipado para el estado de `location` de React Router.
 */
export interface LocationState {
  from?: {
    pathname: string;
  };
}

/**
 * Tipado para el contexto de autenticación.
 */
export interface AuthContextType {
  // Estado
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Acciones
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
}
