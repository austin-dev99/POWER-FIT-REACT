import data from "../data/data.json";
//funcion para simular una peticion a una api
export const pedirDatos = () => {
  //promesa
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      //ver la demora de la promesa
      resolve(data);
    }, 500);
  });
};

export const pedirItemPorId = (id) => {
  return new Promise((resolve, reject) => {
    const item = data.find((el) => el.id === id);

    if (item) {
      resolve(item);
    } else {
      reject({ error: "No se encontro el item" });
    }
  });
};

// el data find de un elemento busca en el array data el elemento que cumpla con la condicion
/* el dato que devuelve comparado con cada uno de los elemetnos 
que viene con data

promesa mediante props*/
