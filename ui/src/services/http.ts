import axios from "axios"

function getCookie(name: string) {
  const match = document.cookie.match(new RegExp(name + '=([^(;)]+)'));
  if (match) return match[1];
  return null;
}

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 0,
  withCredentials: true
})

http.interceptors.request.use((config) => {
  const token = getCookie("csrf-token");
  if (token) {
    config.headers["X-CSRF-Token"] = token;
  }
  return config;
})

export { http }