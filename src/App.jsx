import Header from "./components/Header";
import Formulario from "./components/Formulario";
import Clima from "./components/Clima";
import Error from "./components/Error";
import { useEffect, useState } from "react";

const App = () => {
  //5. pasamos el mismo componente para el app y lo pasamos como prop a formulario
  const [busqueda, guardarBusqueda] = useState({
    ciudad: "",
    pais: "",
  });

  //6. Creamos otro state para el resultado de la busqueda y lo llamamos en la API
  const [resultado, guardarResultado] = useState({});
  //5.2 Creammos un state para controlar la consulta a la API y lo pasamos al formulario como prop
  const [consulta, guardarConsulta] = useState(false);
  //8. creamos otro state para el error al no encontrar la ciudad
  const [error, guardarError] = useState(false);

  const { ciudad, pais } = busqueda;
  //5.1 se agrega useEffect para con ciudad y pais para que cuando cambien se muestre
  useEffect(() => {
    const consultarAPI = async () => {
      if (consulta) {
        const appId = "baaa5ed5b11e963d9d3cf03c12100dbb";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        /* console.log(resultado); */
        guardarResultado(resultado); //6.1 vemos en components que el objeto se llena el objeto en App
        guardarConsulta(false); //7.3 Para poder hacer varias consultas

        //8.1 condicional de error para detectar si encontró la consulta
        if (resultado.cod === "404") {
          guardarError(true);
        } else {
          guardarError(false);
        }
      }
    };
    consultarAPI();
  }, [consulta]); // 5.4 cambiamos ciudad y pais por consulta en dependencias
  // Así no aseguramos que cuando se diligencie ciudad no este llamando la API y solo lo haga cuando seleccione el pais

  // 9. ERROR
  let componente;
  if (error) {
    componente = <Error mensaje = "No hay resultados"/>
  } else {
    componente = <Clima resultado={resultado} />
  }

  

  return (
    <>
      <Header titulo="Clima React" />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda={busqueda}
                guardarBusqueda={guardarBusqueda}
                guardarConsulta={guardarConsulta}
              />
            </div>
            <div className="col m6 s12">
              {componente}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
