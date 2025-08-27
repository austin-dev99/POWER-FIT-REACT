import InfoProductos from "./InfoProductos";
import styles from "../CSSmodules/Producto.module.css";
import { toCapital } from "../helpers/toCapital";
import PropTypes from "prop-types";
import { useMemo } from "react";

const ListadoProductos = ({
  productos,
  titulo,
  loading = false,
  emptyMessage = "No hay productos disponibles",
  ordenarPor = "id",          // campo por el que ordenar
  orden = "asc",              // asc | desc
  filtrarCategoria,           // string opcional para filtrar por categoria
}) => {
  // Normaliza a array seguro
  const listaSegura = Array.isArray(productos) ? productos : [];

  // Aplica filtros y orden
  const listaProcesada = useMemo(() => {
    let arr = [...listaSegura];

    if (filtrarCategoria && filtrarCategoria.trim() !== "") {
      const cat = filtrarCategoria.trim().toLowerCase();
      arr = arr.filter(p => (p.categoria || "").toLowerCase() === cat);
    }

    if (ordenarPor) {
      arr.sort((a, b) => {
        const av = a?.[ordenarPor];
        const bv = b?.[ordenarPor];
        if (av == null && bv == null) return 0;
        if (av == null) return orden === "asc" ? 1 : -1;
        if (bv == null) return orden === "asc" ? -1 : 1;
        if (typeof av === "number" && typeof bv === "number") {
          return orden === "asc" ? av - bv : bv - av;
        }
        // Comparación string/otros
        return orden === "asc"
          ? String(av).localeCompare(String(bv))
          : String(bv).localeCompare(String(av));
      });
    }

    return arr;
  }, [listaSegura, ordenarPor, orden, filtrarCategoria]);

  return (
    <div className={styles.container}>
      <h2 className={styles["main-title"]}>{toCapital(titulo || "Productos")}</h2>

      {loading && (
        <div className={styles.loaderWrapper}>
          <p>Cargando productos...</p>
        </div>
      )}

      {!loading && listaProcesada.length === 0 && (
        <div className={styles.empty}>
          <p>{emptyMessage}</p>
        </div>
      )}

      {!loading && listaProcesada.length > 0 && (
        <div className={styles.productos}>
          {listaProcesada.map((prod) => (
            <InfoProductos
              key={prod.id || prod._id || prod.nombre}
              producto={prod}
            />
          ))}
        </div>
      )}
    </div>
  );
};

ListadoProductos.propTypes = {
  productos: PropTypes.any,      // lo normal sería PropTypes.array, pero usamos any por si llega otra forma
  titulo: PropTypes.string,
  loading: PropTypes.bool,
  emptyMessage: PropTypes.string,
  ordenarPor: PropTypes.string,
  orden: PropTypes.oneOf(["asc", "desc"]),
  filtrarCategoria: PropTypes.string,
};

export default ListadoProductos;