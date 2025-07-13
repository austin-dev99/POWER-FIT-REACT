import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../CSSmodules/Carrito.module.css";
import {
  FaShoppingCart,
  FaTrashAlt,
  FaPlus,
  FaMinus,
  FaArrowLeft,
  FaShoppingBag,
} from "react-icons/fa";

function Carrito() {
  const {
    carrito,
    vaciarCarrito,
    precioTotal,
    eliminarDelCarrito,
    actualizarCantidad,
  } = useContext(CartContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Simular carga inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleIncrementar = (producto) => {
    actualizarCantidad(producto.id, producto.cantidad + 1);
  };

  const handleDecrementar = (producto) => {
    if (producto.cantidad > 1) {
      actualizarCantidad(producto.id, producto.cantidad - 1);
    }
  };

  const handleEliminar = (productoId) => {
    if (
      window.confirm(
        "¿Estás seguro de que deseas eliminar este producto del carrito?"
      )
    ) {
      eliminarDelCarrito(productoId);
    }
  };

  const handleVaciarCarrito = () => {
    if (window.confirm("¿Estás seguro de que deseas vaciar el carrito?")) {
      vaciarCarrito();
    }
  };

  if (loading) {
    return (
      <div className={styles.cartPage}>
        <div className={styles.container}>
          <div className={styles.emptyCart}>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cartPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Tu Carrito de Compras</h1>
          <p>Revisa y gestiona los productos en tu carrito</p>
        </div>
      </section>

      <div className={styles.container}>
        {carrito.length === 0 ? (
          <div className={styles.emptyCart}>
            <div className={styles.emptyCartIcon}>
              <FaShoppingCart />
            </div>
            <h2 className={styles.emptyCartTitle}>Tu carrito está vacío</h2>
            <p className={styles.emptyCartText}>
              Parece que aún no has agregado ningún producto a tu carrito.
              Explora nuestros productos y encuentra algo que te guste.
            </p>
            <button
              onClick={() => navigate("/")}
              className={`${styles.button} ${styles.primaryButton}`}
            >
              <FaShoppingBag style={{ marginRight: "8px" }} />
              Ver Productos
            </button>

            <Link
              to="/historial"
              className={`${styles.button} ${styles.primaryButton}`}
            >
              Pedidos
              <FaShoppingBag style={{ marginLeft: "12px" }} />
            </Link>
            <Link
              to="/devolucion"
              className={`${styles.button} ${styles.primaryButton}`}
              style={{ marginTop: "2rem" }}
            >
              <FaArrowLeft style={{ marginRight: "8px" }} />
              Ver Devoluciones
            </Link>
          </div>
        ) : (
          <>
            <div className={styles.productsList}>
              {carrito.map((producto) => (
                <div key={producto.id} className={styles.productCard}>
                  <img
                    src={producto.imagen}
                    alt={producto.titulo}
                    className={styles.productImage}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://via.placeholder.com/300x200?text=Imagen+no+disponible";
                    }}
                  />
                  <div className={styles.productInfo}>
                    <h3 className={styles.productTitle}>{producto.titulo}</h3>
                    <p className={styles.productPrice}>
                      ${producto.precio.toFixed(2)} c/u
                    </p>

                    <div className={styles.productQuantity}>
                      <button
                        className={styles.quantityButton}
                        onClick={() => handleDecrementar(producto)}
                        aria-label="Reducir cantidad"
                      >
                        <FaMinus />
                      </button>
                      <input
                        type="number"
                        value={producto.cantidad}
                        min="1"
                        readOnly
                        className={styles.quantityInput}
                      />
                      <button
                        className={styles.quantityButton}
                        onClick={() => handleIncrementar(producto)}
                        aria-label="Aumentar cantidad"
                      >
                        <FaPlus />
                      </button>
                    </div>

                    <p className={styles.productSubtotal}>
                      Subtotal:{" "}
                      <strong>
                        ${(producto.precio * producto.cantidad).toFixed(2)}
                      </strong>
                    </p>

                    <button
                      className={styles.removeButton}
                      onClick={() => handleEliminar(producto.id)}
                    >
                      <FaTrashAlt style={{ marginRight: "8px" }} />
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.cartSummary}>
              <h2 className={styles.summaryTitle}>Resumen del Pedido</h2>

              <div className={styles.summaryRow}>
                <span>
                  Subtotal (
                  {carrito.reduce((total, item) => total + item.cantidad, 0)}{" "}
                  productos)
                </span>
                <span>${precioTotal().toFixed(2)}</span>
              </div>

              <div className={styles.summaryRow}>
                <span>Envío</span>
                <span>Gratis</span>
              </div>

              <div className={styles.summaryTotal}>
                <span>Total</span>
                <span>${precioTotal().toFixed(2)}</span>
              </div>

              <div className={styles.actionButtons}>
                <button
                  onClick={handleVaciarCarrito}
                  className={`${styles.button} ${styles.secondaryButton}`}
                >
                  <FaTrashAlt style={{ marginRight: "8px" }} />
                  Vaciar Carrito
                </button>

                <Link
                  to="/checkout"
                  className={`${styles.button} ${styles.primaryButton}`}
                >
                  Proceder al Pago
                  <FaShoppingBag style={{ marginLeft: "8px" }} />
                </Link>
                <Link
                  to="/historial"
                  className={`${styles.button} ${styles.primaryButton}`}
                >
                  Pedidos
                  <FaShoppingBag style={{ marginLeft: "8px" }} />
                </Link>
              </div>

              <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
                <button
                  onClick={() => navigate("/")}
                  className={styles.button}
                  style={{
                    background: "none",
                    color: "#4361ee",
                    textDecoration: "underline",
                    padding: "0.5rem 1rem",
                  }}
                >
                  <FaArrowLeft style={{ marginRight: "8px" }} />
                  Seguir comprando
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Carrito;
