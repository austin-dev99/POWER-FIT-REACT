import axios from "axios";

// Configuración de Axios para el API Gateway
// Asegúrate de que la URL base coincida con la del API Gateway
// que has configurado en tu backend.


const API = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE}/buscador`, // Gateway
});

// Operador (MySQL)
export const getProductos = (categoria) => {
  if (categoria && categoria.trim() !== "") {
    return API.get(`/operador/productos?categoria=${encodeURIComponent(categoria)}`);
  }
  return API.get("/operador/productos");
};

export const getProductoById = (id) =>
  API.get(`/operador/productos/${id}`);

// Buscador (Elasticsearch)
export const buscarProductos = (termino, size = 20) =>
  API.get(`/buscador/search`, { params: { q: termino, size } });

export const suggestProductos = (prefix) =>
  API.get(`/buscador/suggest`, { params: { q: prefix } });

export const facetsCategorias = () =>
  API.get(`/buscador/facets`);

