import React from 'react';


const opcionesAcciones = [
    {nombre: 'Apple (AAPL)', ticker: 'AAPL' },
    {nombre: 'Microsoft (MSFT)', ticker: 'MSFT' },
    {nombre: 'Amazon (AMZN)', ticker: 'AMZN' },
    {nombre: 'Google (GOOGL)', ticker: 'GOOGL' },
    {nombre: 'NVIDIA (NVDA)', ticker: 'NVDA' },
    {nombre: 'JPMorgan Chase & Co (JPM)', ticker: 'JPM' },
    {nombre: 'Johnson & Johnson (JNJ)', ticker: 'JNJ' },
    {nombre: 'The Walt Disney Company (DIS)', ticker: 'DIS' },
    {nombre: 'The Coca-Cola Company (KO)', ticker: 'KO' },
    {nombre: 'Nike (NKE)', ticker: 'NKE' },
    {nombre: 'Adobe (ADBE)', ticker: 'ADBE' },
    {nombre: 'Netflix (NFLX)', ticker: 'NFLX' },
    {nombre: 'Salesforce / Slack (CRM)', ticker: 'CRM' },
    {nombre: 'Costco (COST)', ticker: 'COST' },
    {nombre: 'The Home Depot (HD)', ticker: 'HD' },
    {nombre: 'Cisco (CSCO)', ticker: 'CSCO' },
    {nombre: 'Toyota (TM)', ticker: 'TM' },
    {nombre: 'Procter & Gamble (PG)', ticker: 'PG' },
    {nombre: 'Starbucks (SBUX)', ticker: 'SBUX' },
    {nombre: 'American Express (AXP)', ticker: 'AXP' },
    {nombre: 'AMD (AMD)', ticker: 'AMD' },
    {nombre: 'McDonalds (MCD)', ticker: 'MCD' },
    {nombre: 'FedEx (FDX)', ticker: 'FDX' },
    {nombre: 'Target (TGT)', ticker: 'TGT' },
    {nombre: 'Unilever (UL)', ticker: 'UL' },
    {nombre: '3M (MMM)', ticker: 'MMM' },
    {nombre: 'Southwest Airlines (LUV)', ticker: 'LUV' },
    {nombre: 'Hershey Company (HSY)', ticker: 'HSY' },
    {nombre: 'Colgate Palmolive (CL)', ticker: 'CL' },
    {nombre: 'Marriott (MAR)', ticker: 'MAR' },
    {nombre: 'Honda (HMC)', ticker: 'HMC' },
    {nombre: 'Logitech (LOGI)', ticker: 'LOGI' },
    {nombre: 'Philips (PHG)', ticker: 'PHG' },
    {nombre: 'Nintendo (NTDOY)', ticker: 'NTDOY' },
    {nombre: 'American Eagle Outfitters (AEO)', ticker: 'AEO' },
    {nombre: 'Foot Locker (FL)', ticker: 'FL' },
    {nombre: 'Nordstrom (JWN)', ticker: 'JWN' },
    {nombre: 'Bitcoin (BTC)', ticker: 'BTC' },
    {nombre: 'Ethereum (ETH)', ticker: 'ETH' },
    {nombre: 'Dogecoin (DOGE)', ticker: 'DOGE' },
    {nombre: 'Cardano (ADA)', ticker: 'ADA' },
    {nombre: 'Monero (XMR)', ticker: 'XMR' }
];

// Esta función busca el nombre del activo basado en su ticker
const obtenerNombreActivo = (ticker) => {
    const activo = opcionesAcciones.find(opcion => opcion.ticker === ticker);
    return activo ? activo.nombre : ticker;
};

const TarjetaActivo = ({ activo }) => {
  const diferencia = activo.precio_actual - activo.precio_inicial;
  const porcentaje = ((diferencia / activo.precio_inicial) * 100).toFixed(2);
  const nombreActivo = obtenerNombreActivo(activo.activo);


  return (
    <div className={`activo-card ${diferencia >= 0 ? 'activo-ganancia' : 'activo-perdida'}`}>
      <div className="activo-header">
        <h5 className="activo-nombre">{nombreActivo}</h5>
      </div>
      
      <div className="activo-precios">
        <div className="precio-item">
          <span className="precio-label">Precio de compra:</span>
          <span className="precio-valor">${activo.precio_inicial.toFixed(2)}</span>
        </div>
        <div className="precio-item">
          <span className="precio-label">Valor de compra:</span>
          <span className="precio-valor">${activo.cantidad_invertida.toFixed(2)}</span>
        </div>
        
        <div className="precio-item">
          <span className="precio-label">Precio por acción:</span>
          <span className={`precio-valor ${diferencia >= 0 ? 'text-gain' : 'text-loss'}`}> ${activo.precio_actual.toFixed(2)}</span>
        </div>
                
        <div className="precio-item">
          <span className="precio-label">Valor actual:</span>
          <span className={`precio-valor ${diferencia >= 0 ? 'text-gain' : 'text-loss'}`}> ${activo.valor.toFixed(2)}</span>
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
        <span className="cambio-icono">{diferencia >= 0 ? "\u2197\uFE0E" : "\u2198\uFE0E"}</span>
        <span className="cambio-porcentaje">{Math.abs(porcentaje)}%</span>
        <span className="cambio-texto">{diferencia >= 0 ? 'Ganancia' : 'Pérdida'}</span>
      </div>
    </div>
  );
};

const ListaActivos = ({ data }) => {

  const activos = data.filter((item) => item.activo !== 'Saldo');
  if (!activos || activos.length === 0) {
      return (
          <div className="transacciones-vacio">
              <p>No hay activos disponibles</p>
          </div>
      );
  }

  return (
    <div className="activos-grid">
      {activos.map((activo, index) => (
        <TarjetaActivo key={index} activo={activo} />
      ))}
    </div>
  );
};

export default ListaActivos;
