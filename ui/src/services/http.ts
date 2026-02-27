import axios from "axios"

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 0,
  withCredentials: true
})

http.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("csrf-token");
  if (token) {
    config.headers["X-CSRF-Token"] = token;
  }
  return config;
})

export { http }