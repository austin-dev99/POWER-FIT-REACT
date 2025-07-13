import { createContext, useState, useEffect } from "react";
// Context y LocalStorage 👨🏽‍💻
export const CartContext = createContext();

//funcion para guardar en localStorage
const carritoInicial = JSON.parse(localStorage.getItem("carrito")) || [];
const pedidosIniciales = JSON.parse(localStorage.getItem("pedidos")) || [];
const devolucionesIniciales =
  JSON.parse(localStorage.getItem("devoluciones")) || [];

// carrito: Almacena los productos añadidos al carrito.
// pedidos: Guarda el historial de pedidos realizados.
// devoluciones: Almacena las devoluciones realizadas.
// loading: Estado para controlar la carga inicial.
export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState(carritoInicial);
  const [pedidos, setPedidos] = useState(pedidosIniciales);
  const [devoluciones, setDevoluciones] = useState(devolucionesIniciales);
  const [loading, setLoading] = useState(true);

  // Simular carga inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const agregarAlCarrito = (item, cantidad) => {
    const itemAgregado = { ...item, cantidad };
    const nuevoCarrito = [...carrito];
    const estaEnElCarrito = nuevoCarrito.find(
      (producto) => producto.id === itemAgregado.id
    );

    if (estaEnElCarrito) {
      estaEnElCarrito.cantidad += cantidad;
    } else {
      nuevoCarrito.push(itemAgregado);
    }
    setCarrito(nuevoCarrito);
  };

  // Eliminar un producto del carrito
  const eliminarDelCarrito = (productoId) => {
    const nuevoCarrito = carrito.filter(
      (producto) => producto.id !== productoId
    );
    setCarrito(nuevoCarrito);
  };

  // Actualizar la cantidad de un producto en el carrito
  const actualizarCantidad = (productoId, nuevaCantidad) => {
    if (nuevaCantidad < 1) return;

    const nuevoCarrito = carrito.map((producto) => {
      if (producto.id === productoId) {
        return { ...producto, cantidad: nuevaCantidad };
      }
      return producto;
    });

    setCarrito(nuevoCarrito);
  };

  const cantidadEnCarrito = () => {
    return carrito.reduce(
      (acumulador, producto) => acumulador + producto.cantidad,
      0
    );
  };

  const vaciarCarrito = (pedido = null) => {
    if (pedido) {
      /* console.log("Pedido completado:", pedido.folio); */
    }
    setCarrito([]);
  };

  const precioTotal = () => {
    return carrito.reduce(
      (acumulador, producto) =>
        acumulador + producto.precio * producto.cantidad,
      0
    );
  };

  // Función para agregar un nuevo pedido
  const agregarPedido = (nuevoPedido) => {
    const pedidoConFecha = {
      ...nuevoPedido,
      fecha: new Date().toISOString(),
    };
    setPedidos([...pedidos, pedidoConFecha]);
  };
  // Función para mover un pedido a devoluciones
  const devolucionPedido = (folio) => {
    const pedido = pedidos.find((p) => p.folio === folio);
    if (!pedido) return null;

    const nuevaDevolucion = {
      ...pedido,
      fechaDevolucion: new Date().toISOString(),
      estado: "devuelto",
    };

    setDevoluciones((prev) => [...prev, nuevaDevolucion]);
    return nuevaDevolucion;
  };

  // Función para eliminar un pedido
  const eliminarPedido = (folio) => {
    const nuevosPedidos = pedidos.filter((pedido) => pedido.folio !== folio);
    setPedidos(nuevosPedidos);
  };

  // Guardar en localStorage cuando cambia el carrito
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  // Guardar en localStorage cuando cambian los pedidos
  useEffect(() => {
    localStorage.setItem("pedidos", JSON.stringify(pedidos));
  }, [pedidos]);

  // Guardar devoluciones en localStorage
  useEffect(() => {
    localStorage.setItem("devoluciones", JSON.stringify(devoluciones));
  }, [devoluciones]);

  return (
    <CartContext.Provider
      value={{
        carrito, // Estado actual del carrito
        pedidos, // Estado actual de los pedidos
        loading, // Estado de carga
        devoluciones, // Estado actual de las devoluciones
        agregarAlCarrito, // Función para agregar un producto al carrito
        eliminarDelCarrito, // Función para eliminar un producto del carrito
        actualizarCantidad, // Función para actualizar la cantidad de un producto en el carrito
        cantidadEnCarrito, // Función para obtener la cantidad total de productos en el carrito
        vaciarCarrito, // Función para vaciar el carrito
        precioTotal, // Función para obtener el precio total de los productos en el carrito
        agregarPedido, // Función para agregar un nuevo pedido
        eliminarPedido, // Función para eliminar un pedido
        devolucionPedido, // Función para devolver un pedido
      }}
    >
      {children} {/* Componentes hijos que pueden acceder al contexto */}
    </CartContext.Provider>
  );
};
