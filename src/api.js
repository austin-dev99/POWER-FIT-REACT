import axios from "axios";

const base = process.env.NEXT_PUBLIC_API_BASE; // Debe ser https://gateway-production-a812.up.railway.app
if (!base) {
  // Log solo en dev
  // eslint-disable-next-line no-console
  console.warn("NEXT_PUBLIC_API_BASE no está definida");
}

export const API = axios.create({
  baseURL: base?.replace(/\/+$/, ""), // sin trailing slash
  timeout: 10000,
});

// (Opcional) Interceptor para log y para detectar 401
API.interceptors.response.use(
  r => r,
  err => {
    if (err.response) {
      console.error("API error", err.response.status, err.config?.url, err.response.data);
    } else {
      console.error("API network/error", err.message);
    }
    return Promise.reject(err);
  }
);

// Operador
export const getProductos = (categoria) => {
  const params = {};
  if (categoria && categoria.trim() !== "") {
    params.categoria = categoria.trim();
  }
  return API.get("/operador/productos", { params })
    .then(r => r.data);
};

export const getProductoById = (id) =>
  API.get(`/operador/productos/${id}`).then(r => r.data);

// Buscador
export const buscarProductos = (termino, size = 20) =>
  API.get("/buscador/search", { params: { q: termino, size } })
    .then(r => r.data);

export const suggestProductos = (prefix) =>
  API.get("/buscador/suggest", { params: { q: prefix } })
    .then(r => r.data);

export const facetsCategorias = () =>
  API.get("/buscador/facets").then(r => r.data);
