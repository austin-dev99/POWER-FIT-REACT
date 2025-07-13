import InfoProductos from "./InfoProductos";
import styles from "../CSSmodules/Producto.module.css";
import { toCapital } from "../helpers/toCapital";

//recibe como prop un array de productos y un titulo

const ListadoProductos = ({ productos, titulo }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles["main-title"]}> {toCapital(titulo)}</h2>

      <div className={styles.productos}>
        {productos.map((prod) => (
          <InfoProductos producto={prod} key={prod.id} prod={prod} />
        ))}
      </div>
    </div>
  );
};

export default ListadoProductos;

//creamos otro componenete para manejar los items por separado
