import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE || "http://localhost:3000";

const http = axios.create({
  baseURL,
});

// Attach auth token from localStorage if present
http.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  // Lightweight method logging
  const method = (config.method || "get").toUpperCase();
  const url = `${config.baseURL || ""}${config.url}`;
  console.log(`[HTTP ${method}] ${url}`);
  return config;
});

http.interceptors.response.use(
  (res) => res,
  (error) => {
    const method = (error?.config?.method || "").toUpperCase();
    const url = `${error?.config?.baseURL || ""}${error?.config?.url || ""}`;
    const msg = error?.response?.data?.error || error?.message || "Request failed";
    console.warn(`[HTTP ${method}] ${url} → ${msg}`);
    return Promise.reject(error);
  }
);

export default http;


