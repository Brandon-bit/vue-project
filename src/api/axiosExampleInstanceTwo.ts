// src/api/axiosExampleInstance.js
import axios from 'axios'

const axiosExampleInstanceTwo = axios.create({
    baseURL: 'https://dummyjson.com/', // Cambia esto por la URL base real de tu API
    timeout: 10000, // Tiempo máximo de espera en milisegundos
    headers: {
        'Content-Type': 'application/json'
        // Puedes agregar más headers si lo necesitas, como autorización:
        // 'Authorization': `Bearer ${token}`,
    }
})

// Interceptor para agregar token si lo necesitas dinámicamente
// axiosExampleInstance.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('token') // O como manejes el token
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`
//         }
//         return config
//     },
//     (error) => Promise.reject(error)
// )

// (Opcional) Interceptor de respuestas para manejar errores globales
axiosExampleInstanceTwo.interceptors.response.use(
    (response) => response,
    (error) => {
        // Aquí puedes manejar errores como 401, 403, etc.
        if (error.response && error.response.status === 401) {
            console.warn('No autorizado, redirigiendo al login...')
            // Redirigir o limpiar sesión
        }
        return Promise.reject(error)
    }
)

export default axiosExampleInstanceTwo
