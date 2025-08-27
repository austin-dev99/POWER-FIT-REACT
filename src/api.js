/* Asegúrate de tener esto actualizado */
import axios from "axios";

const rawBase = process.env.REACT_APP_API_BASE;

function normalizeBaseUrl(u) {
  if (!u) return undefined;
  let s = u.trim();
  if (!/^https?:\/\//i.test(s)) s = "https://" + s;
  return s.replace(/\/+$/, "");
}

const base = normalizeBaseUrl(rawBase);
export const API = axios.create({
  baseURL: base || "",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// Productos (ya lo tenías)
export const getProductos = (categoria) => {
  const params = {};
  if (categoria?.trim()) params.categoria = categoria.trim();
  return API.get("/operador/productos", { params }).then(r => r.data);
};

// Buscador Elasticsearch
export const buscarProductos = (termino, size = 20) =>
  API.get("/buscador/search", { params: { q: termino, size } }).then(r => r.data);

export const suggestProductos = (prefix, size = 10) =>
  API.get("/buscador/suggest", { params: { q: prefix, size } }).then(r => r.data);

export const facetsCategorias = () =>
  API.get("/buscador/facets").then(r => r.data);