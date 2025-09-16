import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5566/api', // Change this to your backend URL
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Can add authentication info here
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Unified error handling
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

export default api
