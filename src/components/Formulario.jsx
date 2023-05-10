import React, { useEffect, useState } from "react";
import Error from './Error';


import M from "materialize-css";

const Formulario = ({busqueda, guardarBusqueda, guardarConsulta}) => {
  //
  useEffect(() => {
    // 1. Inicializa los campos select al cargar el componente con la biblioteca de materialize
    const elems = document.querySelectorAll("select");
    M.FormSelect.init(elems);
  }, []);

  //2. Creamos el state del formulario // se corta y se pasa al app principal en el punto 5.
  /* const [busqueda, guardarBusqueda] = useState({
    ciudad: "",
    pais: "",
  }); */



  //4.1.1 creamos la validación del formulario con error 
  const [error, guardarError] = useState(false)


  //2.1 aplicando destructuring a ciudad y pais y se pasan al value
  const { ciudad, pais } = busqueda;

  //3. Creamos el onChange del formulario
  const handleChange = (e) => {
    guardarBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value,
    });
  };

  //4. Creamos el onSubmit del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(busqueda);

    //4.1 validar
    if (ciudad.trim() === "" || pais.trim() === "") {
      guardarError(true)
      return
    }
    guardarError(false);

    //5.3 pasamos guardarConsulta cuando se le da al submit  
    guardarConsulta(true)

    //4.2 pasarlo al componente principal
  };

  return (
    <form onSubmit={handleSubmit}>
      {error ? <Error mensaje = "Todos los campos son obligatorios" /> : null}
      <div className="input-field col s12">
        <input
          type="text"
          name="ciudad"
          id="ciudad"
          value={ciudad} /* 2.1 */
          onChange={handleChange} /* 3 */
        />
        <label htmlFor="ciudad">Ciudad: </label>
      </div>

      <div className="input-field col s12">
        <select
          name="pais"
          id="pais"
          value={pais} /* 2.1 */
          onChange={handleChange} /* 3 */
        >
          <option value="">-- Seleccione un país --</option>

          <option value="US">Estados Unidos</option>
          <option value="MX">México</option>
          <option value="AR">Argentina</option>
          <option value="CO">Colombia</option>
          <option value="CR">Costa Rica</option>
          <option value="ES">España</option>
          <option value="PE">Perú</option>
        </select>
        <label htmlFor="pais">País: </label>
      </div>

      <div className="input-field col s12 ">
        <input 
          type="submit"
          value="Buscar Clima"
          className="waves-effect waves-light btn-large btn-block #ffd600 yellow accent-4"        />
      </div>
    </form>
  );
};

export default Formulario;
