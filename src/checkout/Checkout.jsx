import React, { useContext } from "react";
import styles from "../CSSmodules/Checkout.module.css";
import { CartContext } from "../context/CartContext";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingBag, FaArrowLeft, FaClipboardCheck, FaListUl } from "react-icons/fa";

const Checkout = () => {
  const { carrito, vaciarCarrito, precioTotal, agregarPedido } = useContext(CartContext);
  const [compraFinalizada, setCompraFinalizada] = useState(null);
  const [pedido, setPedido] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const comprar = (data) => {
    if (carrito.length === 0) {
      return;
    }
    
    const folio = Math.floor(Math.random() * 1000000);
    const pedido = {
      cliente: data,
      productos: [...carrito],
      precioTotal: precioTotal(),
      folio,
      fecha: new Date().toLocaleDateString(),
    };

    agregarPedido(pedido);
    vaciarCarrito();
    setCompraFinalizada(folio);
    setPedido(pedido);
  };

  const calcularSubtotal = (precio, cantidad) => {
    return (precio * cantidad).toFixed(2);
  };

  return (
    <div className={styles.checkoutPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Finalizar Compra</h1>
          <p>Completa el formulario para completar tu pedido</p>
        </div>
      </section>

      <section className={styles.checkoutSection}>
        {compraFinalizada ? (
          <div className={styles.orderConfirmation}>
            <div className={styles.checkoutContainer}>
              <div className={styles.orderSummary}>
                <FaClipboardCheck size={48} style={{ marginBottom: '1rem' }} />
                <h2>¡Pedido Completado!</h2>
                <p>Gracias por tu compra. Tu pedido ha sido registrado con éxito.</p>
                
                <div className={styles.orderDetails}>
                  <p><strong>Número de pedido:</strong> #{pedido.folio}</p>
                  <p><strong>Fecha:</strong> {pedido.fecha}</p>
                  <p><strong>Total:</strong> ${pedido.precioTotal.toFixed(2)}</p>
                </div>

                <button 
                  onClick={() => navigate("/")} 
                  className={`${styles.button} ${styles.buttonSecondary}`}
                  style={{ marginTop: '2rem' }}
                >
                  <FaArrowLeft style={{ marginRight: '8px' }} />
                  Volver al catálogo
                </button>
                
                <button 
                  onClick={() => navigate("/devolucion")} 
                  className={`${styles.button}`}
                >
                  <FaListUl style={{ marginRight: '8px' }} />
                  Ver mis pedidos
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.checkoutContainer}>
            {/* Formulario de envío */}
            <div className={styles.checkoutForm}>
              <h2>Información de Envío</h2>
              <form onSubmit={handleSubmit(comprar)}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="nombre">Nombre Completo</label>
                  <input
                    id="nombre"
                    className={styles.formInput}
                    type="text"
                    placeholder="Ingresa tu nombre completo"
                    {...register("nombre", { required: "Este campo es obligatorio" })}
                  />
                  {errors.nombre && <span className={styles.errorMessage}>{errors.nombre.message}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="email">Correo Electrónico</label>
                  <input
                    id="email"
                    className={styles.formInput}
                    type="email"
                    placeholder="tucorreo@ejemplo.com"
                    {...register("email", { 
                      required: "Este campo es obligatorio",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Correo electrónico no válido"
                      }
                    })}
                  />
                  {errors.email && <span className={styles.errorMessage}>{errors.email.message}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="direccion">Dirección de Envío</label>
                  <input
                    id="direccion"
                    className={styles.formInput}
                    type="text"
                    placeholder="Calle, número, colonia, ciudad, estado, código postal"
                    {...register("direccion", { required: "Este campo es obligatorio" })}
                  />
                  {errors.direccion && <span className={styles.errorMessage}>{errors.direccion.message}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="telefono">Teléfono de Contacto</label>
                  <input
                    id="telefono"
                    className={styles.formInput}
                    type="tel"
                    placeholder="Número de teléfono"
                    {...register("telefono", { 
                      required: "Este campo es obligatorio",
                      pattern: {
                        value: /^[0-9]{10,}$/,
                        message: "Número de teléfono no válido"
                      }
                    })}
                  />
                  {errors.telefono && <span className={styles.errorMessage}>{errors.telefono.message}</span>}
                </div>

                <button 
                  type="submit" 
                  className={styles.button}
                  disabled={carrito.length === 0}
                >
                  <FaShoppingBag style={{ marginRight: '8px' }} />
                  {carrito.length > 0 
                    ? `Pagar $${precioTotal().toFixed(2)}` 
                    : 'Carrito vacío'}
                </button>
              </form>
            </div>

            {/* Resumen del pedido */}
            <div className={styles.orderSummary}>
              <h2>Resumen del Pedido</h2>
              
              <div className={styles.orderList}>
                {carrito.length > 0 ? (
                  carrito.map((producto) => (
                    <div key={producto.id} className={styles.orderItem}>
                      <div>
                        <h4>{producto.titulo}</h4>
                        <p>{producto.cantidad} x ${producto.precio.toFixed(2)}</p>
                      </div>
                      <span>${calcularSubtotal(producto.precio, producto.cantidad)}</span>
                    </div>
                  ))
                ) : (
                  <p>No hay productos en el carrito</p>
                )}
              </div>

              <div className={styles.orderTotal}>
                <span>Total:</span>
                <span>${precioTotal().toFixed(2)}</span>
              </div>

              <button 
                onClick={() => navigate("/")} 
                className={`${styles.button} ${styles.buttonSecondary}`}
                style={{ marginTop: '2rem' }}
              >
                <FaArrowLeft style={{ marginRight: '8px' }} />
                Seguir comprando
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Checkout;
