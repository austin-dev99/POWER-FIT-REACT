import { useEffect, useState } from "react";
import { pedirDatos } from "../helpers/pedirDatos";
import ListadoProductos from "./ListadoProductos";
import { useParams } from "react-router-dom";
//modulo importacion nombrada pedimos la informacion y set los productos

const SaveProductos = () => {
  const [productos, setProductos] = useState([]);

  const [titulo, setTitulo] = useState("productos");

  const categoria = useParams().categoria;
  /* obtenemos datos mediante una promesa */
  useEffect(() => {
    pedirDatos().then((res) => {
      if (categoria) {
        setProductos(
          res.filter((prod) =>
            [prod.subcategoria, prod.categoria].includes(categoria)
          )
        );
        setTitulo(categoria);
      } else {
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
