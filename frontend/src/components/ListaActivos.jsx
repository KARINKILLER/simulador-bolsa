import React from 'react';

const TarjetaActivo = ({ activo }) => {
  const diferencia = activo.precio_actual - activo.precio_inicial;
  const porcentaje = ((diferencia / activo.precio_inicial) * 100).toFixed(2);

  return (
    <div className="activo-card">
      <div className="activo-header">
        <h5 className="activo-nombre">{activo.activo}</h5>
        <div className="activo-ticker">#{activo.activo}</div>
      </div>
      
      <div className="activo-precios">
        <div className="precio-item">
          <span className="precio-label">Precio de compra:</span>
          <span className="precio-valor">${activo.precio_inicial.toFixed(2)}</span>
        </div>
        
        <div className="precio-item">
          <span className="precio-label">Precio actual:</span>
          <span className={`precio-valor ${diferencia >= 0 ? 'text-gain' : 'text-loss'}`}>
            ${activo.precio_actual.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="activo-configuracion">
        <div className="config-item">
          <span className="config-label">Take Profit:</span>
          <span className="config-valor text-gain">{activo.take_profit.toFixed(2)}%</span>
        </div>
        
        <div className="config-item">
          <span className="config-label">Stop Loss:</span>
          <span className="config-valor text-loss">{activo.stop_loss.toFixed(2)}%</span>
        </div>
      </div>

      <div className={`activo-cambio ${diferencia >= 0 ? 'cambio-positivo' : 'cambio-negativo'}`}>
        <span className="cambio-icono">{diferencia >= 0 ? "↗" : "↘"}</span>
        <span className="cambio-porcentaje">{Math.abs(porcentaje)}%</span>
        <span className="cambio-texto">{diferencia >= 0 ? 'Ganancia' : 'Pérdida'}</span>
      </div>
    </div>
  );
};

const ListaActivos = ({ data }) => {
  const activos = data.filter((item) => item.activo !== 'Saldo');

  return (
    <div className="activos-grid">
      {activos.map((activo, index) => (
        <TarjetaActivo key={index} activo={activo} />
      ))}
    </div>
  );
};

export default ListaActivos;
