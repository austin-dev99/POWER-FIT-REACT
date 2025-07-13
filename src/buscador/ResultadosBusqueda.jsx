import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { pedirDatos } from "../helpers/pedirDatos";
import ListadoProductos from "../components/ListadoProductos";

const ResultadosBusqueda = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const { termino } = useParams();

  useEffect(() => {
    setCargando(true);

    pedirDatos().then((res) => {
      const resultados = res.filter(
        (prod) =>
          (prod.titulo && prod.titulo.toLowerCase().includes(termino)) ||
          (prod.descripcion &&
            prod.descripcion.toLowerCase().includes(termino)) ||
          (prod.categoria && prod.categoria.toLowerCase().includes(termino)) ||
          (prod.subcategoria &&
            prod.subcategoria.toLowerCase().includes(termino))
      );

      setProductos(resultados);
      setCargando(false);
    });
  }, [termino]);

  if (cargando) {
    return <div className="cargando">Buscando productos...</div>;
  }

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
