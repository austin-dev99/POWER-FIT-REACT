import { useState, useEffect } from "react";
import { getProductoById } from "../api";  // 👈 usamos API real
import DetalleProducto from "./DetalleProducto";
import { useParams } from "react-router-dom";

const PaginaDetalle = () => {
  const [item, setItem] = useState(null);
  const { id } = useParams(); // viene de la URL: /item/:id

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProductoById(id);
        setItem(res.data);
      } catch (err) {
        console.error("Error cargando producto:", err);
      }
    };
    fetchData();
  }, [id]);

  return <div>{item && <DetalleProducto item={item} />}</div>;
};

export default PaginaDetalle;
