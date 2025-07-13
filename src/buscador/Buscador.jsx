import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Buscador.module.css";

const Buscador = () => {
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (terminoBusqueda.trim() !== "") {
      navigate(`/busqueda/${terminoBusqueda}`);
    }
  };

  return (
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
  );
}; //Buscador

export default Buscador;
