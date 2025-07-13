import { useEffect, useState } from "react";
import { pedirDatos } from "../helpers/pedirDatos";
import ListadoProductos from "./ListadoProductos";
import { useParams } from "react-router-dom";
//modulo importacion nombrada pedimos la informacion y set los productos

//definicion de componente
const SaveProductos = () => {
  //estados locales
  const [productos, setProductos] = useState([]);
  const [titulo, setTitulo] = useState("productos");
  const categoria = useParams().categoria;
  /* obtenemos datos mediante una promesa 
  efecto para cargar y filtrar productos
  */
  useEffect(() => {
    pedirDatos().then((res) => {
      if (categoria) {
        //si existe categoria, filtrar productos
        setProductos(
          res.filter((prod) =>
            [prod.subcategoria, prod.categoria].includes(categoria)
          )
        );
        setTitulo(categoria);
      } else {
        //si no existe categoria, mostrar todos los productos
        setProductos(res);
        setTitulo("productos");
      }
    });
  }, [categoria]);
  //mandamos los productos y el titulo
  //el contenedor logico de ListadoProductos
  return (
    <div>
      <ListadoProductos productos={productos} titulo={titulo} />
    </div>
  );
};

export default SaveProductos;
