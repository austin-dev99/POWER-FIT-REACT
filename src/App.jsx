import Navbar from "./components/Navbar";
import SaveProductos from "./components/SaveProductos";
import PaguinaDetalle from "./components/PaguinaDetalle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nosotros from "./components/info/Nosotros";
import Contacto from "./components/info/Contacto";
import { CartProvider } from "./context/CartContext";
import Carrito from "./components/carrito/Carrito";
import Checkout from "./checkout/Checkout";
import Historial from "./checkout/Historial";
import Devolucion from "./checkout/Devolucion";
import ResultadosBusqueda from "./buscador/ResultadosBusqueda";
function App() {
  return (
    <div>
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<SaveProductos />} />
            <Route path="/item/:id" element={<PaguinaDetalle />} />
            <Route path="/productos" element={<SaveProductos />} />
            <Route path="/productos/:categoria" element={<SaveProductos />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/historial" element={<Historial />} />
            <Route path="/devolucion" element={<Devolucion />} />
            <Route path="/busqueda/:termino" element={<ResultadosBusqueda />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </div>
  );
}

export default App;
//cualquier cosas que mandemos por context se puede acceder desde
//cualquier componente que este encerrado

/* encerramos todo en BrowserRouter los componentes 
/item/:id productos/:categoria parametro dinamico podemos capturar
 de donde lo recibimos
routes son nuestras rutas
 useParams es un objeto que nos devuleve el id que viene de la url 
*/
