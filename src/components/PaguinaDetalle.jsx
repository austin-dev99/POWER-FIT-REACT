import { useState, useEffect } from "react";
import { pedirItemPorId } from "../helpers/pedirDatos";
import DetalleProducto from "./DetalleProducto";
import { useParams } from "react-router-dom";
//Donde recibimos el itemId por props se definira como parametro dinamico
const PaguinaDetalle = () => {
  //tenemos un estado---null para no mostrar nada al principio
  const [item, setItem] = useState(null);
  //llamamos a la funcion pedirItemPorId y ponemos el itemId por props
  const id = useParams().id;
  /* useParams es un objeto que nos devuleve el id que viene de la url 
  devuelve el string y lo convertimos con Number a numero
  */

  useEffect(() => {
    pedirItemPorId(Number(id)).then((res) => {
      setItem(res);
    });
  }, [id]);
  //tenemos nuestro item que recibe el estado del item final
  return <div>{item && <DetalleProducto item={item} />}</div>;
};

export default PaguinaDetalle;
