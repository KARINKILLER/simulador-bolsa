import React from 'react';

const DatosDisplay = ({ datos }) => {
    const datosArray = datos.datos || [];
    return (
      <div>
        {datosArray.map((item, index) => (
          <div key={index}>
            {item.fecha}: {item.valor}
            <br />
          </div>
        ))}
      </div>
    );
  };
  

export default DatosDisplay;
