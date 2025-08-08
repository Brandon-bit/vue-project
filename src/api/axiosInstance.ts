import axios from 'axios'
import { getTokenFromStorage, removeTokenFromStorage } from '../utils/jwtUtils';

let API_URL
if (import.meta.env.MODE === 'development') {
    API_URL = import.meta.env.VITE_API_URL_DEVELOPMENT
} else {
    API_URL = import.meta.env.VITE_API_URL
}
const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

// Interceptor de peticiones - Agregar token JWT automáticamente
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getTokenFromStorage();

    // Si hay token, agregarlo al header Authorization
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de respuestas - Manejar errores de autenticación
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Manejar errores de autenticación
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      console.error('Error de autenticación - Token inválido o expirado');

      // Limpiar token inválido
      removeTokenFromStorage();

      // Solo redirigir si no estamos ya en login y no es una petición de login
      const isLoginRequest = error.config?.url?.includes('/auth/login');
      const currentPath = window.location.pathname;

      if (!isLoginRequest && currentPath !== '/login') {
        // Redirigir a login
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance
