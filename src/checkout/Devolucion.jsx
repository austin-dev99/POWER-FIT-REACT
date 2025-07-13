import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import {
  FaShoppingBag,
  FaTrashAlt,
  FaArrowLeft,
  FaBoxOpen,
} from "react-icons/fa";
import styles from "../CSSmodules/Checkout.module.css";

const Devolucion = () => {
  const { pedidos, eliminarPedido } = useContext(CartContext);

  const navigate = useNavigate();

  const formatearFecha = (fechaString) => {
    if (!fechaString) return "Fecha no disponible";

    // Si ya es una fecha formateada, devolverla tal cual
    if (typeof fechaString === "string" && fechaString.includes("/")) {
      return fechaString;
    }

    // Si es un objeto Date o un string de fecha ISO
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
      {/* Hero Section */}
      <section
        className={styles.hero}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), 
          url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')`,
        }}
      >
        <div className={styles.heroContent}>
          <h1>Mis Pedidos</h1>
          <p>Revisa el estado de tus pedidos anteriores</p>
        </div>
      </section>

      <section className={styles.checkoutSection}>
        <div className={styles.checkoutContainer}>
          {pedidos.length === 0 ? (
            <div className={styles.orderConfirmation}>
              <FaBoxOpen
                size={64}
                style={{ marginBottom: "1.5rem", color: "#6c757d" }}
              />
              <h2>No hay pedidos registrados</h2>
              <p>
                ¡Aún no has realizado ningún pedido! Explora nuestro catálogo y
                descubre nuestras ofertas.
              </p>
              <button
                onClick={() => navigate("/")}
                className={styles.button}
                style={{ marginTop: "2rem" }}
              >
                <FaShoppingBag style={{ marginRight: "8px" }} />
                Ver Catálogo
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
                Historial de Pedidos
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

              {pedidos.map((pedido) => (
                <div key={pedido.folio} className={styles.orderCard}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      flexWrap: "wrap",
                      marginBottom: "1rem",
                      paddingBottom: "1rem",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    <div>
                      <h3>Pedido #{pedido.folio}</h3>
                      <p>
                        <strong>Fecha:</strong> {formatearFecha(pedido.fecha)}
                      </p>
                    </div>
                    <div
                      style={{
                        backgroundColor: "#e9f7ef",
                        color: "#28a745",
                        padding: "0.35rem 0.75rem",
                        borderRadius: "50px",
                        fontSize: "0.85rem",
                        fontWeight: "600",
                      }}
                    >
                      Completado
                    </div>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "2rem",
                      marginBottom: "1.5rem",
                    }}
                  >
                    <div>
                      <h4
                        style={{
                          color: "#2c3e50",
                          margin: "0 0 0.75rem 0",
                          fontSize: "1.1rem",
                        }}
                      >
                        Información del Cliente
                      </h4>
                      <p style={{ margin: "0.5rem 0", color: "#555" }}>
                        <strong>Nombre:</strong> {pedido.cliente.nombre}
                      </p>
                      <p style={{ margin: "0.5rem 0", color: "#555" }}>
                        <strong>Correo:</strong> {pedido.cliente.email}
                      </p>
                      <p style={{ margin: "0.5rem 0", color: "#555" }}>
                        <strong>Teléfono:</strong>{" "}
                        {pedido.cliente.telefono || "No especificado"}
                      </p>
                      <p style={{ margin: "0.5rem 0", color: "#555" }}>
                        <strong>Dirección:</strong> {pedido.cliente.direccion}
                      </p>
                    </div>

                    <div>
                      <h4
                        style={{
                          color: "#2c3e50",
                          margin: "0 0 0.75rem 0",
                          fontSize: "1.1rem",
                        }}
                      >
                        Productos
                      </h4>
                      <ul
                        style={{
                          margin: "0.5rem 0",
                          paddingLeft: "1.25rem",
                          listStyleType: "none",
                        }}
                      >
                        {pedido.productos.map((producto, index) => (
                          <li
                            key={index}
                            style={{
                              marginBottom: "0.5rem",
                              color: "#666",
                              display: "flex",
                              justifyContent: "space-between",
                              borderBottom: "1px dashed #eee",
                              paddingBottom: "0.5rem",
                            }}
                          >
                            <span>
                              {producto.cantidad}x {producto.titulo}
                            </span>
                            <span>
                              $
                              {(producto.precio * producto.cantidad).toFixed(2)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "1.5rem",
                      paddingTop: "1.5rem",
                      borderTop: "1px solid #eee",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: "700",
                        color: "#2c3e50",
                      }}
                    >
                      Total: ${pedido.precioTotal.toFixed(2)}
                    </div>
                    <div style={{ display: "flex", gap: "1rem" }}>
                      <button
                        onClick={() => {
                          if (
                            window.confirm(
                              "¿Estás seguro de que deseas devolver este pedido?"
                            )
                          ) {
                            eliminarPedido(pedido.folio);
                            alert(
                              "Pedido devuelto exitosamente. Por favor revise su correo electrónico para más detalles de la devolución"
                            );
                          }
                        }}
                        className={`${styles.button} ${styles.buttonDanger}`}
                        style={{ padding: "0.6rem 1.25rem", width: "auto" }}
                      >
                        <FaTrashAlt style={{ marginRight: "6px" }} />
                        Devolver Pedido
                      </button>
                      <button
                        onClick={() => navigate("/")}
                        className={`${styles.button} ${styles.buttonSecondary}`}
                        style={{ padding: "0.6rem 1.25rem", width: "auto" }}
                      >
                        <FaShoppingBag style={{ marginRight: "6px" }} />
                        Comprar de nuevo
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div
                style={{
                  gridColumn: "1 / -1",
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "2rem",
                }}
              >
                <button
                  onClick={() => navigate("/")}
                  className={styles.button}
                  style={{ maxWidth: "300px" }}
                >
                  <FaArrowLeft style={{ marginRight: "8px" }} />
                  Volver al catálogo
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Devolucion;
