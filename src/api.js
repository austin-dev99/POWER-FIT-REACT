/* eslint-disable no-console */
import axios from "axios";

// Base principal (dominio)
const rawBase = process.env.REACT_APP_API_BASE;

// Prefijos (pueden ser "", pero si existen deben iniciar con "/")
const BUSCADOR_PREFIX = sanitizePrefix(process.env.REACT_APP_BUSCADOR_PREFIX ?? "/buscador");
const OPERADOR_PREFIX = sanitizePrefix(process.env.REACT_APP_OPERADOR_PREFIX ?? "/operador");

function sanitizePrefix(p) {
  if (!p) return "";
  let s = p.trim();
  if (s === "/") return "";
  if (!s.startsWith("/")) s = "/" + s;
  return s.replace(/\/+$/, ""); // quita slash final
}

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
    "REACT_APP_API_BASE no está definida. Configúrala (ej: https://gateway-production-XXXX.up.railway.app)"
  );
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

function join(prefix, path) {
  if (!path) return prefix || "";
  let p = path.startsWith("/") ? path : "/" + path;
  if (!prefix) return p;
  // Evitar duplicado
  if (p.startsWith(prefix + "/") || p === prefix) return p;
  return prefix + p;
}

/**
 * Convierte hits de ES en array plano.
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
// OJO: NO usar BUSCADOR_PREFIX aquí.

export const getProductos = (categoria) => {
  const params = {};
  if (categoria && categoria.trim() !== "") {
    params.categoria = categoria.trim();
  }
  return API.get(join(OPERADOR_PREFIX, "/productos"), { params }).then((r) => r.data);
};

export const getProductoById = (id) =>
  API.get(join(OPERADOR_PREFIX, `/productos/${id}`)).then((r) => r.data);

// -------------------- Buscador (Elasticsearch) --------------------

export const buscarProductos = async (termino, size = 20) => {
  const data = await API.get(join(BUSCADOR_PREFIX, "/search"), {
    params: { q: termino, size },
  }).then((r) => r.data);

  const items = mapHits(data);
  let total = items.length;
  if (data?.hits?.total) {
    if (typeof data.hits.total === "object" && data.hits.total !== null) {
      total = data.hits.total.value ?? total;
    } else if (typeof data.hits.total === "number") {
      total = data.hits.total;
    }
  }

  return { items, total, raw: data };
};

export const suggestProductos = async (prefix) => {
  if (!prefix || prefix.trim().length < 2) return [];
  const data = await API.get(join(BUSCADOR_PREFIX, "/suggest"), {
    params: { q: prefix },
  }).then((r) => r.data);
  return mapHits(data);
};

export const facetsCategorias = () =>
  API.get(join(BUSCADOR_PREFIX, "/facets")).then((r) => r.data);


export const buscarProductosSimple = (termino, size = 20) =>
  API.get("/buscador/search-simple", { params: { q: termino, size } })
     .then(r => r.data);  // {items, total, took}

export const suggestProductosSimple = (prefix) => {
  if (!prefix || prefix.trim().length < 2) return Promise.resolve({ items: [] });
  return API.get("/buscador/suggest-simple", { params: { q: prefix } })
           .then(r => r.data); // {items}
};

export const buscarProductos = (termino, size = 20) =>
  API.get("/buscador/search", { params: { q: termino, size } })
     .then(r => {
       const data = r.data || {};
       // Preferimos data.items, si no existe mapeamos hits
       const items = Array.isArray(data.items)
         ? data.items
         : (data.hits?.hits || []).map(h => ({
             ...(h._source || {}),
             id: (h._source?.id) ?? h._id,
             _score: h._score
           }));
       return { items, total: data.totalParsed ?? data.total ?? items.length, raw: data };
     });

export const suggestProductos = (prefix) => {
  if (!prefix || prefix.trim().length < 2) return Promise.resolve([]);
  return API.get("/buscador/suggest", { params: { q: prefix } })
    .then(r => {
      const data = r.data || {};
      if (Array.isArray(data.items)) return data.items;
      return (data.hits?.hits || []).map(h => ({
        ...(h._source || {}),
        id: (h._source?.id) ?? h._id,
        _score: h._score
      }));
    });
};