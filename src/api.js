/* eslint-disable no-console */
import axios from "axios";

// Base URL desde variable (sin /buscador idealmente)
const rawBase = process.env.REACT_APP_API_BASE;

// Prefijo de rutas del backend (por defecto /buscador). Puede estar vacío "" si ya no se usa.
const API_PREFIX = (process.env.REACT_APP_API_PREFIX ?? "/buscador").trim().replace(/\/+$/, "");

/**
 * Normaliza baseURL:
 * - Asegura protocolo.
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
  console.warn(
    "REACT_APP_API_BASE no está definida. Configúrala en Vercel (ej: https://gateway-production-XXXX.up.railway.app)"
  );
}

/**
 * Construye endpoint preservando (o añadiendo) el prefijo API_PREFIX sin duplicarlo.
 * Acepta path con o sin slash inicial.
 */
function endpoint(path) {
  if (!path) return API_PREFIX || "";
  let p = path.startsWith("/") ? path : `/${path}`;
  if (!API_PREFIX || API_PREFIX === "") return p;
  // Si ya empieza con el prefijo, lo deja:
  if (p.startsWith(API_PREFIX + "/") || p === API_PREFIX) return p;
  return `${API_PREFIX}${p}`;
}

export const API = axios.create({
  baseURL: base || "",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para log de errores
API.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err.response) {
      console.error(
        "API error",
        err.response.status,
        err.config?.method?.toUpperCase(),
        err.config?.baseURL
          ? `${err.config.baseURL}${err.config.url}`
          : err.config?.url,
        err.response.data
      );
    } else {
      console.error("API network/error", err.message);
    }
    return Promise.reject(err);
  }
);

// -------------------- Helpers internos --------------------

/**
 * Convierte hits de ES en array plano.
 * @param {*} data JSON completo de ES
 * @returns {Array<{id:string|number, nombre?:string, imagen?:string, _score?:number, ...}>}
 */
function mapHits(data) {
  const hits = data?.hits?.hits || [];
  return hits.map((h) => {
    const src = h._source || {};
    return {
      ...src,
      id: src.id ?? h._id,
      _score: h._score,
    };
  });
}

// -------------------- Operador --------------------

export const getProductos = (categoria) => {
  const params = {};
  if (categoria && categoria.trim() !== "") {
    params.categoria = categoria.trim();
  }
  return API.get(endpoint("/operador/productos"), { params }).then((r) => r.data);
};

export const getProductoById = (id) =>
  API.get(endpoint(`/operador/productos/${id}`)).then((r) => r.data);

// -------------------- Buscador (Elasticsearch) --------------------

/**
 * Búsqueda de productos.
 * Devuelve:
 *  {
 *    items: array plano (parsed),
 *    total: número total (si ES lo reporta),
 *    raw: respuesta completa original por si la necesitas
 *  }
 */
export const buscarProductos = async (termino, size = 20) => {
  const data = await API.get(endpoint("/search"), {
    params: { q: termino, size },
  }).then((r) => r.data);

  const items = mapHits(data);
  let total = items.length;
  if (data?.hits?.total) {
    // ES puede devolver {value, relation} o un número
    if (typeof data.hits.total === "object" && data.hits.total !== null) {
      total = data.hits.total.value ?? total;
    } else if (typeof data.hits.total === "number") {
      total = data.hits.total;
    }
  }

  return { items, total, raw: data };
};

/**
 * Sugerencias (autocomplete).
 * Devuelve directamente un array de items simplificados.
 */
export const suggestProductos = async (prefix) => {
  if (!prefix || prefix.trim().length < 2) return [];
  const data = await API.get(endpoint("/suggest"), {
    params: { q: prefix },
  }).then((r) => r.data);
  return mapHits(data);
};

/**
 * Facetas (devuelve la respuesta cruda para que el consumidor la procese).
 */
export const facetsCategorias = () =>
  API.get(endpoint("/facets")).then((r) => r.data);