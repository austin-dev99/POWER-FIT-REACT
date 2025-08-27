import { useEffect, useState } from "react";
import { getProductos } from "../api";
import ListadoProductos from "./ListadoProductos";
import { useParams } from "react-router-dom";

const SaveProductos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const { categoria } = useParams();

  useEffect(() => {
    let cancelado = false;
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getProductos(categoria);
        if (!cancelado) {
          // data ya es el array
            setProductos(Array.isArray(data) ? data : []);
        }
      } catch (e) {
        console.error("Error cargando productos:", e);
        if (!cancelado) setProductos([]);
      } finally {
        if (!cancelado) setLoading(false);
      }
    };
    fetchData();
    return () => { cancelado = true; };
  }, [categoria]);

  return (
    <ListadoProductos
      productos={productos}
      titulo={categoria || "productos"}
      loading={loading}
    />
  );
};

export default SaveProductos;