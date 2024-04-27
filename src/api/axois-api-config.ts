import axios from 'axios'

export const AxiosApi = axios.create({
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json'
  },
  baseURL: import.meta.env.VITE_BASE_URL
})

export const AxiosFormDataApi = axios.create({
  withCredentials: false,
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  baseURL: import.meta.env.VITE_BASE_URL
})

// export const AxiosFormData =
export const ApiEndpoints = {
  organizations: '/organizations',
  images: '/images'
}
