//recibe como prop un objeto producto para mostrar informacion de cada uno
import { Link } from "react-router-dom";
import styles from "../CSSmodules/Producto.module.css";
import { toCapital } from "../helpers/toCapital";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const InfoProductos = ({ producto }) => {
  const { agregarAlCarrito } = useContext(CartContext);
  return (
    <div className={styles.producto}>
      <img src={producto.imagen} alt={producto.titulo} />
      <div className={styles["producto"]}>
        <h2>{producto.titulo}</h2>
        <p>${producto.precio}</p>
        <p>Categoria: {toCapital(producto.categoria)}</p>
        <p>Descripcion: {producto.descripcion}</p>
        <p>Stock: {producto.stock}</p>
        <button
          className={styles["agregar-al-carrito"]}
          onClick={() => agregarAlCarrito(producto, 1)}
        >
          Agregar al carrito
        </button>
        <Link className={styles["ver-mas"]} to={`/item/${producto.id}`}>
          Ver más
        </Link>
      </div>
    </div>
  );
};

export default InfoProductos;

/* implementacion de las vistas  */
