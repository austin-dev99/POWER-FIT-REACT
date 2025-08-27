import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { buscarProductos } from "../api";
import ListadoProductos from "../components/ListadoProductos";

const ResultadosBusqueda = () => {
  const { termino } = useParams();
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!termino) return;
    let active = true;
    const fetchData = async () => {
      setCargando(true);
      setError("");
      try {
        const data = await buscarProductos(termino);
        const hits = data?.hits?.hits ?? [];
        const items = hits.map(h => ({
          id: h._source?.id ?? h._id,
          ...h._source
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
    return () => { active = false; };
  }, [termino]);

  if (cargando) return <div className="cargando">Buscando productos...</div>;
  if (error) return <div className="sin-resultados">{error}</div>;

  return productos.length > 0 ? (
    <ListadoProductos productos={productos} titulo={`Resultados para: ${termino}`} />
  ) : (
    <div className="sin-resultados">
      <h2>No se encontraron resultados para: {termino}</h2>
      <p>Intenta con otros términos de búsqueda.</p>
    </div>
  );
};

export default ResultadosBusqueda;