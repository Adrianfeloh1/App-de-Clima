import React from 'react'

const Clima = ({resultado}) => {

    //7. extraemos los valores que queremos de la API
    const {name, main} = resultado 

    // 7.1 para que no saque el error del nombre
    if(!name) return null 

    //7.2 hacemos la formula para pasar de grados kelvin a grados centigrados
    const kelvin = 273.15;


  return (
    <div className="card-panel white col s12">
        <div className='black-text'>
            <h2>El Clima de {name} es: </h2>
            <p className='temperatura'>
                {parseFloat(main.temp - kelvin, 10 ). toFixed(1) }
                <span> &#x2103;</span> {/* es la entidad de grados centigrados */}
            </p>
            <p> Temperatura Máxima: 
                {parseFloat(main.temp_max - kelvin, 10 ). toFixed(1) }
                <span> &#x2103;</span> {/* es la entidad de grados centigrados */}
            </p>
            <p>Temperatura Minima: 
                {parseFloat(main.temp_min - kelvin, 10 ). toFixed(1) }
                <span> &#x2103;</span> {/* es la entidad de grados centigrados */}
            </p>
        </div>
        
    </div>
  )
}

export default Clima