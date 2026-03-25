import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // tu backend
  // withCredentials: true, // si usas cookies (opcional)
});

export default api;

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log("No autorizado");
      // opcional: logout automático
    }

    return Promise.reject(error);
  },
);
