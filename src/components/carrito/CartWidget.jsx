import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../../context/CartContext";
import styles from "../../CSSmodules/Navbar.module.css";

const CartWidget = () => {
  const { cantidadEnCarrito } = useContext(CartContext);
  const [itemsCount, setItemsCount] = useState(0);
  const [isBouncing, setIsBouncing] = useState(false);

  // Obtener la cantidad actual del carrito
  const currentCartCount = cantidadEnCarrito();

  // Actualizar el contador con animación
  useEffect(() => {
    if (currentCartCount > 0) {
      setItemsCount(currentCartCount);
      
      // Animación de rebote al actualizar
      setIsBouncing(true);
      const timer = setTimeout(() => setIsBouncing(false), 1000);
      return () => clearTimeout(timer);
    } else {
      setItemsCount(0);
    }
  }, [currentCartCount, cantidadEnCarrito]);

  return (
    <div className={`${styles.cartWidget} ${isBouncing ? styles.bounce : ""}`}>
      <Link
        to="/carrito"
        className={styles.cartLink}
        aria-label={`Carrito de compras (${itemsCount} ${itemsCount === 1 ? "artículo" : "artículos"})`}
      >
        <FaShoppingCart className={styles.cartIcon} />
        {itemsCount > 0 && (
          <span className={styles.cartBadge}>
            {itemsCount > 9 ? "9+" : itemsCount}
          </span>
        )}
      </Link>
    </div>
  );
};

export default CartWidget;
