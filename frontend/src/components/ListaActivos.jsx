import React from 'react';

const TarjetaActivo = ({ activo }) => {
  const diferencia = activo.precio_actual - activo.precio_inicial;
  const porcentaje = ((diferencia / activo.precio_inicial) * 100).toFixed(2);

  return (
    <div className="card text-center mb-3" style={{ width: '18rem' }}>
      <div className="card-body">
        <h5 className="card-title">{activo.activo}</h5>
        <p className="card-text">
          <strong>Precio de compra:</strong> ${activo.precio_inicial.toFixed(2)}
        </p>
        <p className="card-text">
          <strong>Precio actual:</strong>{' '}
          <span className={diferencia >= 0 ? 'text-success fw-bold' : 'text-danger fw-bold'}>
            ${activo.precio_actual.toFixed(2)}
          </span>
        </p>
        <p className={ diferencia >= 0
              ? 'text-success d-flex align-items-center justify-content-center'
              : 'text-danger d-flex align-items-center justify-content-center'
          }
>
          {diferencia >= 0 ? "↑" : "↓"}
          <span className="ms-2">{porcentaje}%</span>
        </p>
      </div>
    </div>
  );
};

const listaActivos = ({ data }) => {
  const activos = data.filter((item) => item.activo !== 'Saldo');

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        {activos.map((activo, index) => (
          <div key={index} className="col-md-4 d-flex justify-content-center">
            <TarjetaActivo activo={activo} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default listaActivos;
