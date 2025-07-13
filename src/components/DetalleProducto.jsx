import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import {
  FaArrowLeft,
  FaShoppingCart,
  FaStar,
  FaRegStar,
  FaTruck,
  FaShieldAlt,
  FaExchangeAlt,
} from "react-icons/fa";
import styles from "../CSSmodules/Producto.module.css";
import { toCapital } from "../helpers/toCapital";
import ItemCount from "./ItemCount";

const DetalleProducto = ({ item }) => {
  const navigate = useNavigate();
  const { agregarAlCarrito } = useContext(CartContext);
  const [cantidad, setCantidad] = useState(1);
  const [imagenSeleccionada, setImagenSeleccionada] = useState(0);
  const [cargando, setCargando] = useState(true);

  // Cargar imágenes de ejemplo si no hay
  const imagenes = item.imagen
    ? Array.isArray(item.imagen)
      ? item.imagen
      : [item.imagen]
    : ["https://via.placeholder.com/800x600?text=Imagen+no+disponible"];

  // Simular carga
  useEffect(() => {
    setCargando(true);
    const timer = setTimeout(() => setCargando(false), 800);
    return () => clearTimeout(timer);
  }, [item.id]);

  const handleSumar = () => {
    if (cantidad < item.stock) {
      setCantidad(cantidad + 1);
    }
  };

  const handleRestar = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  const handleAgregarAlCarrito = () => {
    agregarAlCarrito(item, cantidad);
  };

  // Calcular precio con descuento (si aplica)
  const precioFinal = item.descuento
    ? ((item.precio * (100 - item.descuento)) / 100).toFixed(2)
    : item.precio.toFixed(2);

  // Calcular rating (ejemplo)
  const rating = item.rating || 4.5;
  const estrellas = [];
  for (let i = 1; i <= 5; i++) {
    estrellas.push(
      i <= Math.floor(rating) ? (
        <FaStar key={i} className={styles.estrella} />
      ) : (
        <FaRegStar key={i} className={styles.estrella} />
      )
    );
  }

  if (cargando) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Cargando producto...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <button
        className={styles.backButton}
        onClick={() => navigate(-1)}
        aria-label="Volver atrás"
      >
        <FaArrowLeft /> Volver
      </button>

      <div className={styles.productoDetalle}>
        {/* Galería de imágenes */}
        <div className={styles.galeria}>
          <div className={styles.miniaturas}>
            {imagenes.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Vista ${index + 1} de ${item.titulo}`}
                className={`${styles.miniatura} ${imagenSeleccionada === index ? styles.activa : ""}`}
                onClick={() => setImagenSeleccionada(index)}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/100x100?text=Imagen+no+disponible";
                }}
              />
            ))}
          </div>
          <div className={styles.imagenPrincipal}>
            <img
              src={imagenes[imagenSeleccionada]}
              alt={item.titulo}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://via.placeholder.com/800x600?text=Imagen+no+disponible";
              }}
            />
          </div>
        </div>

        {/* Información del producto */}
        <div className={styles.informacion}>
          <div className={styles.encabezado}>
            <h1 className={styles.titulo}>{item.titulo}</h1>
            <div className={styles.rating}>
              <div className={styles.estrellas}>
                {estrellas}
                <span className={styles.puntuacion}>({rating})</span>
              </div>
              <span className={styles.reviews}>• 24 reseñas</span>
              <span className={styles.stockDisponible}>
                {item.stock > 0
                  ? `🟢 En stock (${item.stock} disponibles)`
                  : "🔴 Sin stock"}
              </span>
            </div>
          </div>

          <div className={styles.precioContainer}>
            {item.descuento && (
              <div className={styles.etiquetaDescuento}>
                {item.descuento}% OFF
              </div>
            )}
            <div className={styles.precios}>
              {item.descuento && (
                <span className={styles.precioAnterior}>
                  ${item.precio.toFixed(2)}
                </span>
              )}
              <span className={styles.precioActual}>${precioFinal}</span>
              {item.descuento && (
                <span className={styles.ahorro}>
                  Ahorras ${(item.precio - precioFinal).toFixed(2)} (
                  {item.descuento}%)
                </span>
              )}
            </div>
          </div>

          <div className={styles.descripcion}>
            <h3>Descripción</h3>
            <p>
              {item.descripcion ||
                "No hay descripción disponible para este producto."}
            </p>
          </div>

          <div className={styles.caracteristicas}>
            <h3>Características principales</h3>
            <ul>
              <li>
                <strong>Marca:</strong> {item.marca || "No especificada"}
              </li>
              <li>
                <strong>Categoría:</strong> {toCapital(item.categoria)}
              </li>
              <li>
                <strong>SKU:</strong> {item.id || "N/A"}
              </li>
              <li>
                <strong>Disponibilidad:</strong>{" "}
                {item.stock > 0 ? "En stock" : "Agotado"}
              </li>
            </ul>
          </div>

          <div className={styles.acciones}>
            <ItemCount
              cantidad={cantidad}
              stock={item.stock}
              handleSumar={handleSumar}
              handleRestar={handleRestar}
            />
            <button
              className={`${styles.botonAgregar} ${item.stock === 0 ? styles.sinStock : ""}`}
              onClick={handleAgregarAlCarrito}
              disabled={item.stock === 0}
            >
              <FaShoppingCart />
              {item.stock > 0 ? "Agregar al carrito" : "Sin stock"}
            </button>
            <button className={styles.botonComprar} disabled={item.stock === 0}>
              Comprar ahora
            </button>
          </div>

          <div className={styles.garantia}>
            <div className={styles.beneficio}>
              <FaTruck className={styles.iconoBeneficio} />
              <div>
                <h4>Envío gratis</h4>
                <p>En compras superiores a $500.000</p>
              </div>
            </div>
            <div className={styles.beneficio}>
              <FaShieldAlt className={styles.iconoBeneficio} />
              <div>
                <h4>Garantía</h4>
                <p>6 meses por defecto de fábrica</p>
              </div>
            </div>
            <div className={styles.beneficio}>
              <FaExchangeAlt className={styles.iconoBeneficio} />
              <div>
                <h4>Devoluciones</h4>
                <p>Hasta 30 días después de la compra</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de productos relacionados (opcional) */}
      {/* <ProductosRelacionados categoria={item.categoria} productoActualId={item.id} /> */}
    </div>
  );
};

export default DetalleProducto;
