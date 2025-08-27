import { useEffect, useState } from "react";
import { facetsCategorias, buscarProductos } from "../api";
import ListadoProductos from "../components/ListadoProductos";

const CategoriasFacets = () => {
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const fetchFacets = async () => {
      try {
        const data = await facetsCategorias();
        const buckets = data?.aggregations?.categorias?.buckets ?? [];
        setCategorias(buckets.map(b => b.key));
      } catch (e) {
        console.error("Error cargando facetas:", e);
      }
    };
    fetchFacets();
  }, []);

  useEffect(() => {
    if (!categoriaSeleccionada) return;
    let cancelled = false;
    const fetchProd = async () => {
      setCargando(true);
      try {
        const data = await buscarProductos(categoriaSeleccionada);
        const hits = data?.hits?.hits ?? [];
        const items = hits.map(h => ({
          id: h._source?.id ?? h._id,
          ...h._source
        }));
        if (!cancelled) setProductos(items);
      } catch (e) {
        console.error("Error en búsqueda por categoría:", e);
        if (!cancelled) setProductos([]);
      } finally {
        if (!cancelled) setCargando(false);
      }
    };
    fetchProd();
    return () => { cancelled = true; };
  }, [categoriaSeleccionada]);

  return (
    <div>
      <h2>Categorías</h2>
      <ul>
        {categorias.map(cat => (
          <li key={cat}>
            <button
              disabled={cargando && categoriaSeleccionada === cat}
              onClick={() => setCategoriaSeleccionada(cat)}
            >
              {cat}
            </button>
          </li>
        ))}
      </ul>

      {categoriaSeleccionada && (
        <>
          {cargando && <p>Cargando productos...</p>}
          {!cargando && (
            <ListadoProductos
              productos={productos}
              titulo={`Productos en ${categoriaSeleccionada}`}
            />
          )}
        </>
      )}
    </div>
  );
};

export default CategoriasFacets;