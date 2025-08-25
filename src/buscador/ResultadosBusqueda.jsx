// src/buscador/ResultadosBusqueda.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { buscarProductos } from "../api";
import ListadoProductos from "../components/ListadoProductos";


const ResultadosBusqueda = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const { termino } = useParams();

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      if (!termino) return;
      setCargando(true);
      setError("");

      try {
        const res = await buscarProductos(termino);
        // Estructura de ES: res.data.hits.hits = [{_id, _source: { ...producto }}]
        const hits = res.data?.hits?.hits ?? [];
        const items = hits.map((h) => ({
          id: h._source?.id ?? h._id,
          ...h._source,
        }));

        if (active) setProductos(items);
      } catch (e) {
        console.error("Error en búsqueda:", e);
        if (active) {
          setError("No se pudo realizar la búsqueda.");
          setProductos([]);
        }
      } finally {
        if (active) setCargando(false);
      }
    };

    fetchData();
    return () => {
      active = false; // evita setState después de unmount
    };
  }, [termino]);

  if (cargando) return <div className="cargando">Buscando productos...</div>;
  if (error) return <div className="sin-resultados">{error}</div>;

  return (
    <div>
      {productos.length > 0 ? (
        <ListadoProductos
          productos={productos}
          titulo={`Resultados para: ${termino}`}
        />
      ) : (
        <div className="sin-resultados">
          <h2>No se encontraron resultados para: {termino}</h2>
          <p>Intenta con otros términos de búsqueda.</p>
        </div>
      )}
    </div>
  );
};

export default ResultadosBusqueda;
