import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { suggestProductos } from "../api";
import styles from "./Buscador.module.css";

const DEBOUNCE = 300;

const Buscador = () => {
  const [termino, setTermino] = useState("");
  const [debounced, setDebounced] = useState("");
  const [sugerencias, setSugerencias] = useState([]);
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  // Debounce
  useEffect(() => {
    const id = setTimeout(() => setDebounced(termino), DEBOUNCE);
    return () => clearTimeout(id);
  }, [termino]);

  useEffect(() => {
    const fetchSug = async () => {
      if (debounced.trim().length < 2) {
        setSugerencias([]);
        return;
      }
      setCargando(true);
      try {
        const data = await suggestProductos(debounced);
        const hits = data?.hits?.hits ?? [];
        const lista = hits.map(h => ({
          id: h._source?.id ?? h._id,
          nombre: h._source?.nombre ?? "(sin nombre)",
        }));
        setSugerencias(lista);
      } catch (e) {
        console.error("[Buscador] Error sugerencias:", e);
        setSugerencias([]);
      } finally {
        setCargando(false);
      }
    };
    fetchSug();
  }, [debounced]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const t = termino.trim();
    if (t) navigate(`/busqueda/${t}`);
  };

  return (
    <div className={styles.buscadorWrapper}>
      <form onSubmit={handleSubmit} className={styles.buscadorForm}>
        <input
          type="text"
          value={termino}
          onChange={(e) => setTermino(e.target.value)}
          placeholder="Buscar productos..."
          className={styles.buscadorInput}
        />
        <button type="submit" className={styles.buscadorBoton}>Buscar</button>
      </form>

      {cargando && <div className={styles.loading}>Cargando...</div>}

      {!cargando && sugerencias.length > 0 && (
        <ul className={styles.sugerencias}>
          {sugerencias.map(s => (
            <li key={s.id} onClick={() => navigate(`/busqueda/${s.nombre}`)}>
              {s.nombre}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Buscador;