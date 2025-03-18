import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-dropdown-select';
import Grafica from './Grafica';
import Modal from './Modal';


const Market = () => {
  const [opcion, setOpcion] = useState('');
  const [accionSeleccionada, setAccionSeleccionada] = useState('Acción generica');
  const [tickerSeleccionado, setTickerSeleccionado] = useState('TKGN');
  const [tiempoSeleccionado, setTiempoSeleccionado] = useState('');
  const [codigoTiempoSeleccionado, setCodigoTiempoSeleccionado] = useState('');
  const [datos, setDatos] = useState([]);  
  const [datosListos, setDatosListos] = useState(false);
  const [datosCargando, setDatosCargando] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [precioActivo, setPrecioActivo] = useState(0);
  const [saldoDisponible, setSaldoDisponible] = useState(0);
  


  const opcionesAcciones = [
    { value: 1, label: 'Apple (AAPL)', ticker: 'AAPL' },
    { value: 2, label: 'Microsoft (MSFT)', ticker: 'MSFT' },
    { value: 3, label: 'Amazon (AMZN)', ticker: 'AMZN' },
    { value: 4, label: 'Alphabet (GOOGL)', ticker: 'GOOGL' },
    { value: 5, label: 'Meta Platforms (META)', ticker: 'META' },
    { value: 6, label: 'Tesla (TSLA)', ticker: 'TSLA' },
    { value: 7, label: 'NVIDIA (NVDA)', ticker: 'NVDA' },
    { value: 8, label: 'Netflix (NFLX)', ticker: 'NFLX' },
    { value: 9, label: 'Walt Disney (DIS)', ticker: 'DIS' },
    { value: 10, label: 'Coca-Cola (KO)', ticker: 'KO' },
    { value: 11, label: 'Walmart (WMT)', ticker: 'WMT' },
    { value: 12, label: 'JPMorgan Chase (JPM)', ticker: 'JPM' },
    { value: 13, label: 'Johnson & Johnson (JNJ)', ticker: 'JNJ' },
    { value: 14, label: 'Visa (V)', ticker: 'V' },
    { value: 15, label: 'Procter & Gamble (PG)', ticker: 'PG' },
    { value: 16, label: 'ExxonMobil (XOM)', ticker: 'XOM' },
    { value: 17, label: 'Chevron (CVX)', ticker: 'CVX' },
    { value: 18, label: 'Home Depot (HD)', ticker: 'HD' },
    { value: 19, label: 'Intel (INTC)', ticker: 'INTC' },
    { value: 20, label: 'Cisco Systems (CSCO)', ticker: 'CSCO' },
    { value: 21, label: 'Verizon (VZ)', ticker: 'VZ' },
    { value: 22, label: 'AT&T (T)', ticker: 'T' },
    { value: 23, label: 'Adobe (ADBE)', ticker: 'ADBE' },
    { value: 24, label: 'PayPal (PYPL)', ticker: 'PYPL' },
    { value: 25, label: 'Nike (NKE)', ticker: 'NKE' },
    { value: 26, label: 'McDonalds (MCD)', ticker: 'MCD' },
    { value: 27, label: 'IBM (IBM)', ticker: 'IBM' },
    { value: 28, label: 'Boeing (BA)', ticker: 'BA' },
    { value: 29, label: 'Mastercard (MA)', ticker: 'MA' },
    { value: 30, label: 'Pfizer (PFE)', ticker: 'PFE' },
    { value: 31, label: 'Merck (MRK)', ticker: 'MRK' },
    { value: 32, label: 'Salesforce (CRM)', ticker: 'CRM' },
    { value: 33, label: 'Goldman Sachs (GS)', ticker: 'GS' },
    { value: 34, label: 'Caterpillar (CAT)', ticker: 'CAT' },
    { value: 35, label: '3M (MMM)', ticker: 'MMM' },
    { value: 36, label: 'American Express (AXP)', ticker: 'AXP' },
    { value: 37, label: 'UnitedHealth Group (UNH)', ticker: 'UNH' },
    { value: 38, label: 'Starbucks (SBUX)', ticker: 'SBUX' },
    { value: 39, label: 'Advanced Micro Devices (AMD)', ticker: 'AMD' },
    { value: 40, label: 'Oracle (ORCL)', ticker: 'ORCL' },
    { value: 41, label: 'Qualcomm (QCOM)', ticker: 'QCOM' },
    { value: 42, label: 'Costco (COST)', ticker: 'COST' },
    { value: 43, label: 'PepsiCo (PEP)', ticker: 'PEP' },
    { value: 44, label: 'Comcast (CMCSA)', ticker: 'CMCSA' },
    { value: 45, label: 'General Electric (GE)', ticker: 'GE' },
    { value: 46, label: 'Target (TGT)', ticker: 'TGT' },
    { value: 47, label: 'Ford Motor (F)', ticker: 'F' },
    { value: 48, label: 'General Motors (GM)', ticker: 'GM' },
    { value: 49, label: 'Spotify (SPOT)', ticker: 'SPOT' },
    { value: 50, label: 'Airbnb (ABNB)', ticker: 'ABNB' }
  ];
  

  const opcionesTiempo = [
    { value: 1, label: '1 año', codigo:'año'},
    { value: 2, label: '1 mes', codigo:'mes'},
    { value: 3, label: '1 semana', codigo:'semana'},
    { value: 4, label: '1 día', codigo:'dia'},
    { value: 5, label: '1 hora', codigo:'hora'}]

    
    
  const cambioAcciones = (values) => {
    if (values && values.length > 0) {
      setAccionSeleccionada(values[0].label);
      setTickerSeleccionado(values[0].ticker);
      actualizarOpcion(values[0].label, tiempoSeleccionado);
    } else {
      setAccionSeleccionada('');
      setTickerSeleccionado('');
      actualizarOpcion('', tiempoSeleccionado);
    }
  };

  const cambioTiempo = (values) => {
    if (values && values.length > 0) {
      setTiempoSeleccionado(values[0].label);
      setCodigoTiempoSeleccionado(values[0].codigo);
      actualizarOpcion(accionSeleccionada, values[0].label);
    } else {
      setTiempoSeleccionado('');
      setCodigoTiempoSeleccionado('');
      actualizarOpcion(accionSeleccionada, '');
    }
  };

  const actualizarOpcion = (accion, tiempo) => {
    if (accion && tiempo) {
      let periodoTiempo = '';
      switch(tiempo) {
        case '1 año':
          periodoTiempo = 'del último año';
          break;
        case '1 mes':
          periodoTiempo = 'del último mes';
          break;
        case '1 semana':
          periodoTiempo = 'de la última semana';
          break;
        case '1 día':
          periodoTiempo = 'del último día';
          break;
        case '1 hora':
          periodoTiempo = 'de la última hora';
          break;
        default:
          periodoTiempo = '';
      }
      setOpcion(`Acciones de ${accion} ${periodoTiempo}`);
    } else if (accion) {
      setOpcion(`Acciones de ${accion}`);
    } else {
      setOpcion('');
    }
  };


  const pedirDatos = async () => {
    if (!tickerSeleccionado || !codigoTiempoSeleccionado) return;
    setDatosCargando(true);

    try {
      const response = await fetch(`http://localhost:8000/consult?activo=${tickerSeleccionado}&periodo=${codigoTiempoSeleccionado}`);
      
      if (!response.ok) throw new Error(`Error: ${response.status}`);

      const datosBackend = await response.json();
      console.log("Petición correcta!")
      console.log(typeof datosBackend)
      console.log(datosBackend)
      setDatosListos(true)
      
      setDatos(datosBackend);
      setDatosCargando(false);

    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };


  const preCompra = async () => {
    //Petición para saber de cuánto dinero se dispone y cuanto vale una acción
    const response = await fetch(`http://localhost:8000/datos-pre-transaccion?activo=${tickerSeleccionado}&username=ejemplo`);
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    const datosPreCompra = await response.json();

    console.log(datosPreCompra)
    setPrecioActivo(datosPreCompra.precioActivo)
    setSaldoDisponible(datosPreCompra.saldoDisponible)

    console.log("Se van a comprar acciones de " + tickerSeleccionado);
    setModalOpen(true);
  };
 const confirmarCompra = () =>{
    const cantidadCompra = document.getElementById('cantidad-compra').value;
    console.log("Se van a comprar " + cantidadCompra + " acciones de " + tickerSeleccionado);
    //Poner simbolo de cargando o algo
    //Petición
    fetch(`http://localhost:8000/comprar-acciones?activo=${tickerSeleccionado}&cantidad=${cantidadCompra}&username=ejemplo`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      setModalOpen(false);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    setModalOpen(false);
  }

  const cerrarModal = () => {
    setModalOpen(false);  
  };

  return (
      <div className='container'>

        <Modal isOpen={modalOpen}>
                    <h2 title='El precio de la acción podría variar si se tarda en realizar la compra'>Vas a comprar acciones de {accionSeleccionada} a ${precioActivo} &#9432;</h2>
                    <h4>¿Cuánto dinero quieres gastarte? ($)</h4>
                    <input type='number' step = "0.5" max = {saldoDisponible} id='cantidad-compra'></input>
                    <button className='mb-2 ms-2' onClick={confirmarCompra}>Confirmar</button>
                    <button className='mb-2 ms-2' onClick={cerrarModal}>Cancelar</button>
                    <br></br>
                  </Modal>

        <div className="mt-3 text-end display-box">
          <Link to="/perfil">Perfil</Link>
        </div>
        <div className='mt-3 row text-center'>
          <div className='col'>
            <Select
              options={opcionesAcciones}
              onChange={cambioAcciones}
              placeholder="Selecciona un activo"
              className="dropdown-acciones"
              noDataRenderer={() => "No se han encontrado resultados"}        
              />
          </div>
          <div className='col'>
            <Select
              options={opcionesTiempo}
              onChange={cambioTiempo}
              placeholder="Selecciona un lapso de tiempo"
              className="dropdown-acciones"
              noDataRenderer={() => "No se han encontrado resultados"}        
              />
          </div>
      </div>
      <div className='text-center mt-3'>
      <button onClick={pedirDatos}>Realizar petición</button>
      {(opcion && <div className="text-white">{opcion}</div>)}
     </div>
     <div className='text-center text-white'>
      {datosListos && <Grafica datos={datos} />}
      {datosCargando && <p>Cargando datos...</p>}
      </div>
      <div>
        {/* Este botón solo se debe mostrar cuando estén los datos listos */}
      {<button className = 'text-end' onClick={preCompra}>Comprar</button>}
      </div>
    
     </div>
   );
}
  
  export default Market;
  