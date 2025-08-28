/* eslint-disable no-console */
import axios from "axios";

// Lee la base desde variable pública de Vercel/Next
const rawBase = process.env.REACT_APP_API_BASE;

/**
 * Normaliza una baseURL:
 * - Asegura protocolo (https://) si el valor no lo trae.
 * - Quita slashes finales.
 */
function normalizeBaseUrl(url) {
  if (!url) return undefined;
  let s = url.trim();
  if (!/^https?:\/\//i.test(s)) {
    s = `https://${s}`;
  }
  return s.replace(/\/+$/, "");
}

const base = normalizeBaseUrl(rawBase);

if (!base) {
  // Mensaje útil en consola cuando falta la variable
  console.warn("REACT_APP_API_BASE no está definida. Configúrala en Vercel con el dominio completo del gateway, por ejemplo: https://gateway-production-XXXX.up.railway.app");
}

export const API = axios.create({
  // Si base es undefined, axios usará rutas absolutas que le pases; aquí lo dejamos vacío
  baseURL: base || "",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor opcional para registrar errores y ver la URL final
API.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err.response) {
      console.error(
        "API error",
        err.response.status,
        err.config?.method?.toUpperCase(),
        err.config?.baseURL ? `${err.config.baseURL}${err.config.url}` : err.config?.url,
        err.response.data
      );
    } else {
      console.error("API network/error", err.message);
    }
    return Promise.reject(err);
  }
);

// -------------------- Operador --------------------

/**
 * Obtiene productos; si se pasa categoria, filtra.
 * Devuelve data como la expone el backend (se asume array).
 */
export const getProductos = (categoria) => {
  const params = {};
  if (categoria && categoria.trim() !== "") {
    params.categoria = categoria.trim();
  }
  return API.get("/operador/productos", { params }).then((r) => r.data);
};

export const getProductoById = (id) =>
  API.get(`/operador/productos/${id}`).then((r) => r.data);

// -------------------- Buscador (Elasticsearch) --------------------

/**
 * Busca productos (Elasticsearch). La respuesta típica de ES es un objeto con hits.hits.
 * Este helper retorna la respuesta completa; en la UI mapea a array si lo necesitas:
 *   const docs = data?.hits?.hits?.map(h => h._source) ?? [];
 */
export const buscarProductos = (termino, size = 20) =>
  API.get("/buscador/search", { params: { q: termino, size } }).then((r) => r.data);

export const suggestProductos = (prefix) =>
  API.get("/buscador/suggest", { params: { q: prefix } }).then((r) => r.data);

export const facetsCategorias = () =>
  API.get("/buscador/facets").then((r) => r.data);