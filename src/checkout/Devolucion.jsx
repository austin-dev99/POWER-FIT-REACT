import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaBoxOpen } from "react-icons/fa";
import styles from "../CSSmodules/Checkout.module.css";

const Devolucion = () => {
  const { devoluciones } = useContext(CartContext);
  const navigate = useNavigate();

  console.log("Devoluciones en el componente:", devoluciones);
  console.log("¿Es un array?", Array.isArray(devoluciones));
  console.log("Número de devoluciones:", devoluciones?.length || 0);

  const formatearFecha = (fechaString) => {
    if (!fechaString) return "Fecha no disponible";
    const fecha = new Date(fechaString);
    return fecha.toLocaleDateString("es-MX", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className={styles.checkoutPage}>
      <section
        className={styles.hero}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), 
          url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')`,
        }}
      >
        <div className={styles.heroContent}>
          <h1>Mis Devoluciones</h1>
          <p>Revisa el estado de tus devoluciones</p>
        </div>
      </section>

      <section className={styles.checkoutSection}>
        <div className={styles.checkoutContainer}>
          {devoluciones.length === 0 ? (
            <div className={styles.orderConfirmation}>
              <FaBoxOpen
                size={64}
                style={{ marginBottom: "1.5rem", color: "#6c757d" }}
              />
              <h2>No hay devoluciones registradas</h2>
              <p>Tus devoluciones aparecerán aquí.</p>
              <button
                onClick={() => navigate("/historial")}
                className={styles.button}
                style={{ marginTop: "2rem" }}
              >
                <FaArrowLeft style={{ marginRight: "8px" }} />
                Ver Historial de Pedidos
              </button>
            </div>
          ) : (
            <div className={styles.orderList}>
              <h2
                style={{
                  gridColumn: "1 / -1",
                  marginBottom: "2rem",
                  color: "#2c3e50",
                  fontSize: "1.75rem",
                  position: "relative",
                  paddingBottom: "1rem",
                }}
              >
                Historial de Devoluciones
                <span
                  style={{
                    content: "",
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "60px",
                    height: "3px",
                    background: "#4361ee",
                  }}
                ></span>
              </h2>

              {devoluciones.map((devolucion) => (
                <div
                  key={devolucion.folio}
                  className={`${styles.orderCard} ${styles.devolucionCard}`}
                >
                  <div className={styles.orderHeader}>
                    <div>
                      <h3>Pedido #{devolucion.folio}</h3>
                      <p className={styles.orderDate}>
                        Fecha de compra: {formatearFecha(devolucion.fecha)}
                      </p>
                      <p className={styles.orderDate}>
                        Fecha de devolución:{" "}
                        {formatearFecha(devolucion.fechaDevolucion)}
                      </p>
                    </div>
                    <span className={styles.orderStatus}>Devuelto</span>
                  </div>

                  <div className={styles.orderDetails}>
                    {devolucion.carrito &&
                      devolucion.carrito.map((item, index) => (
                        <div key={index} className={styles.orderItem}>
                          <img
                            src={item.imagen}
                            alt={item.titulo}
                            className={styles.orderItemImage}
                          />
                          <div className={styles.orderItemInfo}>
                            <h4>{item.titulo}</h4>
                            <p>
                              {item.cantidad} x $
                              {item.precio?.toFixed(2) || "0.00"}
                            </p>
                            <p>
                              Subtotal: $
                              {(item.cantidad * item.precio).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>

                  <div className={styles.orderFooter}>
                    <div className={styles.orderTotal}>
                      <span>Total del pedido:</span>
                      <span>${devolucion.precioTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Devolucion;
