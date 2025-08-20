import axios from 'axios'

const axiosExampleInstance = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json'
    }
})

// Interceptor de respuestas - Manejar errores de autenticación
axiosExampleInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error)
    }
)

export default axiosExampleInstance
