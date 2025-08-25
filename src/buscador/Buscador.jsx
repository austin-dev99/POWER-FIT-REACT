import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { suggestProductos } from "../api";   // 👈 importa tu función del backend
import styles from "./Buscador.module.css";

const Buscador = () => {
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [sugerencias, setSugerencias] = useState([]);
  const navigate = useNavigate();

  // 🔎 Cada vez que el usuario escribe, pedimos sugerencias
  useEffect(() => {
    const fetchSugerencias = async () => {
      if (terminoBusqueda.length < 2) {
        setSugerencias([]);
        return;
      }

      try {
        const res = await suggestProductos(terminoBusqueda);
        const hits = res.data?.hits?.hits ?? [];
        const sugerenciasFormateadas = hits.map((h) => ({
          id: h._id,
          nombre: h._source?.nombre,
        }));
        setSugerencias(sugerenciasFormateadas);
      } catch (e) {
        console.error("Error cargando sugerencias:", e);
        setSugerencias([]);
      }
    };

    fetchSugerencias();
  }, [terminoBusqueda]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (terminoBusqueda.trim() !== "") {
      navigate(`/busqueda/${terminoBusqueda}`);
    }
  };

  const handleClickSugerencia = (nombre) => {
    navigate(`/busqueda/${nombre}`);
    setSugerencias([]); // ocultar sugerencias después de click
  };

  return (
    <div className={styles.buscadorWrapper}>
      <form onSubmit={handleSubmit} className={styles.buscadorForm}>
        <input
          type="text"
          value={terminoBusqueda}
          onChange={(e) => setTerminoBusqueda(e.target.value)}
          placeholder="Buscar productos..."
          className={styles.buscadorInput}
        />
        <button type="submit" className={styles.buscadorBoton}>
          Buscar
        </button>
      </form>

      {/* 🔽 Mostrar sugerencias */}
      {sugerencias.length > 0 && (
        <ul className={styles.sugerencias}>
          {sugerencias.map((s) => (
            <li key={s.id} onClick={() => handleClickSugerencia(s.nombre)}>
              {s.nombre}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Buscador;
