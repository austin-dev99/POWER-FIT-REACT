import { useState, useEffect } from "react";
import { getProductoById } from "../api";
import DetalleProducto from "./DetalleProducto";
import { useParams } from "react-router-dom";

const PaginaDetalle = () => {
  const [item, setItem] = useState(null);
  const [error, setError] = useState("");
  const { id } = useParams();

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const producto = await getProductoById(id); // helper ya devuelve body
        if (active) setItem(producto);
      } catch (err) {
        console.error("Error cargando producto:", err);
        if (active) setError("No se pudo cargar el producto");
      }
    })();
    return () => { active = false; };
  }, [id]);

  if (error) return <div>{error}</div>;
  if (!item) return <div>Cargando...</div>;
  return <DetalleProducto item={item} />;
};

export default PaginaDetalle;
