import { useEffect, useState } from "react";
import { getProductos } from "../api"; // 👈 solo este
import ListadoProductos from "./ListadoProductos";
import { useParams } from "react-router-dom";

const SaveProductos = () => {
  const [productos, setProductos] = useState([]);
  const [titulo, setTitulo] = useState("productos");
  const { categoria } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProductos(categoria); // 👈 ya maneja ambos casos
        setProductos(res.data);
        setTitulo(categoria || "productos");
      } catch (e) {
        console.error("Error cargando productos:", e);
        setProductos([]);
      }
    };
    fetchData();
  }, [categoria]);

  return <ListadoProductos productos={productos} titulo={titulo} />;
};

export default SaveProductos;
