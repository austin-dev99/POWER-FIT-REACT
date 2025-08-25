import { useEffect, useState } from "react";
import { facetsCategorias, buscarProductos } from "../api";
import ListadoProductos from "../components/ListadoProductos";

const CategoriasFacets = () => {
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");

  // 🔹 Cargar categorías desde Elastic
  useEffect(() => {
    const fetchFacets = async () => {
      try {
        const res = await facetsCategorias();
        const buckets = res.data?.aggregations?.categorias?.buckets ?? [];
        setCategorias(buckets.map((b) => b.key));
      } catch (e) {
        console.error("Error cargando facetas:", e);
      }
    };
    fetchFacets();
  }, []);

  // 🔹 Cargar productos de la categoría seleccionada
  useEffect(() => {
    if (!categoriaSeleccionada) return;
    const fetchProductos = async () => {
      try {
        const res = await buscarProductos(categoriaSeleccionada);
        const hits = res.data?.hits?.hits ?? [];
        const items = hits.map((h) => ({
          id: h._source?.id ?? h._id,
          ...h._source,
        }));
        setProductos(items);
      } catch (e) {
        console.error("Error en búsqueda por categoría:", e);
      }
    };
    fetchProductos();
  }, [categoriaSeleccionada]);

  return (
    <div>
      <h2>Categorías</h2>
      <ul>
        {categorias.map((cat) => (
          <li key={cat}>
            <button onClick={() => setCategoriaSeleccionada(cat)}>
              {cat}
            </button>
          </li>
        ))}
      </ul>

      {categoriaSeleccionada && (
        <ListadoProductos
          productos={productos}
          titulo={`Productos en ${categoriaSeleccionada}`}
        />
      )}
    </div>
  );
};

export default CategoriasFacets;
