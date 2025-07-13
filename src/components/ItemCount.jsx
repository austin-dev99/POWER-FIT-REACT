import React, { useState, useEffect } from "react";
import { FaMinus, FaPlus, FaShoppingCart } from "react-icons/fa";
import styles from "../CSSmodules/Producto.module.css";

const ItemCount = ({
  cantidad,
  handleSumar,
  handleRestar,
  stock = 10,
  maxCantidad = 10,
  onAddToCart,
  showAddToCart = true,
}) => {
  const [localCantidad, setLocalCantidad] = useState(cantidad || 1);
  const [agregando, setAgregando] = useState(false);

  // Sincronizar con la cantidad del padre si cambia
  useEffect(() => {
    if (cantidad !== undefined) {
      setLocalCantidad(cantidad);
    }
  }, [cantidad]);

  const handleIncrementar = () => {
    if (localCantidad < maxCantidad && localCantidad < stock) {
      const nuevaCantidad = localCantidad + 1;
      setLocalCantidad(nuevaCantidad);
      if (handleSumar) handleSumar(nuevaCantidad);
    }
  };

  const handleDecrementar = () => {
    if (localCantidad > 1) {
      const nuevaCantidad = localCantidad - 1;
      setLocalCantidad(nuevaCantidad);
      if (handleRestar) handleRestar(nuevaCantidad);
    }
  };

  const handleAgregarAlCarrito = () => {
    if (onAddToCart) {
      setAgregando(true);
      // Simular carga
      setTimeout(() => {
        onAddToCart(localCantidad);
        setAgregando(false);
      }, 800);
    }
  };

  const handleCantidadChange = (e) => {
    const valor = parseInt(e.target.value, 10);
    if (!isNaN(valor) && valor >= 1 && valor <= Math.min(maxCantidad, stock)) {
      setLocalCantidad(valor);
    } else if (e.target.value === "") {
      setLocalCantidad("");
    }
  };

  const handleBlur = () => {
    if (localCantidad === "") {
      setLocalCantidad(1);
    }
  };

  const sinStock = stock <= 0;
  const maxAlcanzado = localCantidad >= maxCantidad || localCantidad >= stock;
  const minimoAlcanzado = localCantidad <= 1;

  return (
    <div className={styles.itemCountContainer}>
      <div className={styles.controlesCantidad}>
        <button
          className={`${styles.botonCantidad} ${minimoAlcanzado ? styles.deshabilitado : ""}`}
          onClick={handleDecrementar}
          disabled={minimoAlcanzado || sinStock}
          aria-label="Reducir cantidad"
        >
          <FaMinus />
        </button>

        <div className={styles.inputContainer}>
          <input
            type="number"
            min="1"
            max={Math.min(maxCantidad, stock)}
            value={localCantidad}
            onChange={handleCantidadChange}
            onBlur={handleBlur}
            className={styles.inputCantidad}
            disabled={sinStock}
            aria-label="Cantidad"
          />
          {maxCantidad > 0 && (
            <span className={styles.maximo}>
              Máx: {Math.min(maxCantidad, stock)}
            </span>
          )}
        </div>

        <button
          className={`${styles.botonCantidad} ${maxAlcanzado ? styles.deshabilitado : ""}`}
          onClick={handleIncrementar}
          disabled={maxAlcanzado || sinStock}
          aria-label="Aumentar cantidad"
        >
          <FaPlus />
        </button>
      </div>

      {showAddToCart && onAddToCart && (
        <button
          className={`${styles.botonAgregar} ${sinStock ? styles.sinStock : ""}`}
          onClick={handleAgregarAlCarrito}
          disabled={sinStock || agregando}
        >
          {agregando ? (
            <span className={styles.loading}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          ) : (
            <>
              <FaShoppingCart className={styles.carritoIcono} />
              {sinStock ? "Sin stock" : "Agregar al carrito"}
            </>
          )}
        </button>
      )}

      {sinStock && (
        <p className={styles.sinStockMensaje}>
          Producto agotado. ¡Pronto tendremos más stock!
        </p>
      )}

      {stock > 0 && stock < 5 && (
        <p className={styles.pocoStock}>
          ¡Quedan pocas unidades! Solo {stock} disponible{stock > 1 ? "s" : ""}.
        </p>
      )}
    </div>
  );
};

export default ItemCount;
