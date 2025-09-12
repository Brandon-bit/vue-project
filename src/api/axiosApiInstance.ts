import axios from 'axios'

const axiosApiInstance = axios.create({
    baseURL: 'https://localhost:7108',
    headers: {
        'Content-Type': 'application/json'
    }
})

// Interceptor de respuestas - Manejar errores de autenticación
axiosApiInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error)
    }
)

export default axiosApiInstance
