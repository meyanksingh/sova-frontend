import axios from "axios"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access (e.g., redirect to login)
      if (typeof window !== 'undefined') {
        localStorage.removeItem("token")
        window.location.href = "/login"
      }
    }
    return Promise.reject(error)
  },
)

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post("/auth/login", { email, password })
    localStorage.setItem("token", response.data.token)
    return response.data
  } catch (error) {
    throw error
  }
}

export const register = async (name: string, email: string, password: string) => {
  try {
    const response = await api.post("/auth/register", { name, email, password })
    localStorage.setItem("token", response.data.token)
    return response.data
  } catch (error) {
    throw error
  }
}

export const logout = () => {
  localStorage.removeItem("token")
}

export default api

