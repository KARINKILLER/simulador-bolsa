import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Select from 'react-dropdown-select';
import Grafica from './Grafica';
import Modal from './Modal';


const Market = () => {
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/session-status", {method: "GET",credentials: "include"})
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (!data.authenticated) {
          navigate("/error"); // Redirige si no hay sesión
        }
      })
      .catch(error => {
        // En caso de error de red, también redirige
        navigate("/error");
      });
  }, [navigate]);


  const [opcion, setOpcion] = useState('');
  const [seleccion, setSeleccion] = useState(false);
  const [accionSeleccionada, setAccionSeleccionada] = useState('Acción generica');
  const [tickerSeleccionado, setTickerSeleccionado] = useState('TKGN');
  const [tiempoSeleccionado, setTiempoSeleccionado] = useState('');
  const [codigoTiempoSeleccionado, setCodigoTiempoSeleccionado] = useState('');
  const [datos, setDatos] = useState([]);  
  const [datosListos, setDatosListos] = useState(false);
  const [datosCargando, setDatosCargando] = useState(false);
  const [modalCompraOpen, setModalCompraOpen] = useState(false);
  const [modalVentaOpen, setModalVentaOpen] = useState(false);
  const [precioActivo, setPrecioActivo] = useState(0);
  const [saldoDisponible, setSaldoDisponible] = useState(0);
  const [cantidadDisponible, setCantidadDisponible] = useState(0);
  const [numAcciones, setNumAcciones] = useState(0);
  const [accionDisponible, setAccionDisponible] = useState(false);
  


  const opcionesAcciones = [
    { value: 1, label: 'Apple (AAPL)', ticker: 'AAPL' },
    { value: 2, label: 'Microsoft (MSFT)', ticker: 'MSFT' },
    { value: 3, label: 'Amazon (AMZN)', ticker: 'AMZN' },
    { value: 4, label: 'Google (GOOGL)', ticker: 'GOOGL' },
    { value: 5, label: 'NVIDIA (NVDA)', ticker: 'NVDA' },
    { value: 6, label: 'JPMorgan Chase & Co (JPM)', ticker: 'JPM' },
    { value: 7, label: 'Johnson & Johnson (JNJ)', ticker: 'JNJ' },
    { value: 8, label: 'The Walt Disney Company (DIS)', ticker: 'DIS' },
    { value: 9, label: 'The Coca-Cola Company (KO)', ticker: 'KO' },
    { value: 10, label: 'Nike (NKE)', ticker: 'NKE' },
    { value: 11, label: 'Adobe (ADBE)', ticker: 'ADBE' },
    { value: 12, label: 'Netflix (NFLX)', ticker: 'NFLX' },
    { value: 13, label: 'Salesforce / Slack (CRM)', ticker: 'CRM' },
    { value: 14, label: 'Costco (COST)', ticker: 'COST' },
    { value: 15, label: 'The Home Depot (HD)', ticker: 'HD' },
    { value: 16, label: 'Cisco (CSCO)', ticker: 'CSCO' },
    { value: 17, label: 'Toyota (TM)', ticker: 'TM' },
    { value: 18, label: 'Procter & Gamble (PG)', ticker: 'PG' },
    { value: 19, label: 'Starbucks (SBUX)', ticker: 'SBUX' },
    { value: 20, label: 'American Express (AXP)', ticker: 'AXP' },
    { value: 21, label: 'AMD (AMD)', ticker: 'AMD' },
    { value: 22, label: 'McDonalds (MCD)', ticker: 'MCD' },
    { value: 23, label: 'FedEx (FDX)', ticker: 'FDX' },
    { value: 24, label: 'Target (TGT)', ticker: 'TGT' },
    { value: 25, label: 'Unilever (UL)', ticker: 'UL' },
    { value: 26, label: '3M (MMM)', ticker: 'MMM' },
    { value: 27, label: 'Southwest Airlines (LUV)', ticker: 'LUV' },
    { value: 28, label: 'Hershey Company (HSY)', ticker: 'HSY' },
    { value: 29, label: 'Colgate Palmolive (CL)', ticker: 'CL' },
    { value: 30, label: 'Marriott (MAR)', ticker: 'MAR' },
    { value: 31, label: 'Honda (HMC)', ticker: 'HMC' },
    { value: 32, label: 'Logitech (LOGI)', ticker: 'LOGI' },
    { value: 33, label: 'Philips (PHG)', ticker: 'PHG' },
    { value: 34, label: 'Nintendo (NTDOY)', ticker: 'NTDOY' },
    { value: 35, label: 'American Eagle Outfitters (AEO)', ticker: 'AEO' },
    { value: 36, label: 'Foot Locker (FL)', ticker: 'FL' },
    { value: 37, label: 'Nordstrom (JWN)', ticker: 'JWN' },
    //añadir con el mismo formato bitcoin, doge, monero, cardano, ethereum 
    { value: 38, label: 'Bitcoin (BTC)', ticker: 'BTC' },
    { value: 39, label: 'Ethereum (ETH)', ticker: 'ETH' },
    { value: 40, label: 'Dogecoin (DOGE)', ticker: 'DOGE' },
    { value: 41, label: 'Cardano (ADA)', ticker: 'ADA' },
    { value: 42, label: 'Monero (XMR)', ticker: 'XMR' }
    ]
  

  const opcionesTiempo = [
    { value: 1, label: '1 año', codigo:'anno'},
    { value: 2, label: '1 mes', codigo:'mes'},
    { value: 3, label: '1 semana', codigo:'semana'}]

    
    
  const cambioAcciones = (values) => {
    if (values && values.length > 0) {
      setAccionSeleccionada(values[0].label);
      setTickerSeleccionado(values[0].ticker);
      actualizarOpcion(values[0].label, tiempoSeleccionado);
      setSeleccion(true);
    } else {
      setAccionSeleccionada('');
      setTickerSeleccionado('');
      actualizarOpcion('', tiempoSeleccionado);
      setSeleccion(false);
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
        default:
          periodoTiempo = '';
      }
      setOpcion(`Valores de ${accion} ${periodoTiempo}`);
    } else if (accion) {
      setOpcion(`Valores de ${accion}`);
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
    const response = await fetch(`http://localhost:8000/datos-pre-transaccion-compra?activo=${tickerSeleccionado}`, {credentials: 'include'});    
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    const datosPreCompra = await response.json();

    console.log(datosPreCompra)
    setPrecioActivo(datosPreCompra.precioActivo)
    setSaldoDisponible(datosPreCompra.saldoDisponible)

    console.log("Se va a comprar el siguiente activo:  " + tickerSeleccionado);
    setModalCompraOpen(true);
  };
const confirmarCompra = async () => {
    const cantidadCompra = document.getElementById('cantidad-compra').value;
    const stopLoss = parseFloat(document.getElementById('stop-loss').value) || 0;
    const takeProfit = parseFloat(document.getElementById('take-profit').value) || 0;

    try {
        const response = await fetch('http://localhost:8000/comprar-acciones', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                activo: tickerSeleccionado,
                cantidad: cantidadCompra,
                stopLoss: stopLoss,
                takeProfit: takeProfit
            }),
            credentials: 'include'
        });

        if (!response.ok) throw new Error('Error en la compra');
        
        const data = await response.json();
        console.log(data);
        setModalCompraOpen(false);
    } catch (error) {
        console.error('Error:', error);
    }
};


  const preVenta = async () => {
    console.log("Mirar si se tienen acciones y cuanto valen")
    const response = await fetch(`http://localhost:8000/datos-pre-transaccion-venta?activo=${tickerSeleccionado}`, {credentials: 'include'});
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    const datosPreVenta = await response.json();
    setPrecioActivo(datosPreVenta.precioActivo);
    setCantidadDisponible(datosPreVenta.cantidadDisponible);
    setNumAcciones(datosPreVenta.numAcciones);
    setModalVentaOpen(true);
    
  }

  const confirmarVenta = async () => {
    const cantidadVenta = document.getElementById('cantidad-venta').value;
    const response = await fetch(`http://localhost:8000/vender-acciones?activo=${tickerSeleccionado}& cantidad=${cantidadVenta}`, {credentials: 'include', method: 'POST'});
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    cerrarModalVenta();
  }

  const cerrarModalCompra = () => {
    setModalCompraOpen(false);  
  };

  const cerrarModalVenta = () => {
    setModalVentaOpen(false);
  };

  const ajustarMaximo = (id, maximo) => {
    const cantidad = document.getElementById(id).value;
    if (cantidad > maximo){
      document.getElementById(id).value = maximo;
    }
  }
  return (
      <div className='container'>

        <Modal isOpen = {modalVentaOpen}>

          { (numAcciones>0) && (<div>
            <h2>Vas a vender acciones de {accionSeleccionada}</h2>
          <h4 info ='Cuando vendes un activo se transforma en saldo virtual'>¿Cuánto dinero de este activo quieres vender?</h4>
          <h5>Cantidad disponible: ${cantidadDisponible}</h5>
          <input placeholder = "0"  type='number' id='cantidad-venta' step = "1" max = {cantidadDisponible} onBlur={() => ajustarMaximo('cantidad-venta', cantidadDisponible)} ></input>
          <button className='mt-2 mb-2 ms-2' onClick={confirmarVenta}>Confirmar</button>
          <button className='mb-2 ms-2' onClick={cerrarModalVenta}>Cancelar</button>
          <br></br></div>
          )}
          { (numAcciones<=0) && (<div className='text-center'>
            <h2>No dispones del activo: {accionSeleccionada}</h2>
            <button className='mb-2 mt-2' onClick={cerrarModalVenta}>Aceptar</button>
            <br></br></div>)
          
          }
         
        
        </Modal>


        <Modal isOpen={modalCompraOpen}>
                    <h2 title='El precio de la acción podría variar si se tarda en realizar la compra'>Vas a comprar el activo {accionSeleccionada} a ${precioActivo} &#9432;</h2>
                    <h4>¿Cuánto dinero quieres gastarte? ($)</h4>
                    <input type='number' placeholder='0' id='cantidad-compra' step = "0.5" max = {saldoDisponible} onBlur={() => ajustarMaximo('cantidad-compra', saldoDisponible)} ></input>
                    <h5 title='Stop loss y take profit: % que tiene que BAJAR o SUBIR un activo para ser vendido automáticamente. Si ya tenías un activo se sobreescribirá el stop loss y el take profit con los últimos valores que se reciban'>Configura tu stop loss y tu take profit (%) &#9432;</h5>
                    <h6>Stop loss</h6>
                    <input title='Si lo dejas vacío o en 0 no se ejecutarán acciones automáticas' type='number' step = "0.5" min = "0" id='stop-loss' placeholder='0' className='me-2'></input>
                    <h6>Take profit</h6>
                    <input title='Si lo dejas vacío o en 0 no se ejecutarán acciones automáticas' type='number' step = "0.5" min = "0" id='take-profit' placeholder='0'></input>
                    <br></br>
                    <button className='mt-2 mb-2 ms-2' onClick={confirmarCompra}>Confirmar</button>
                    <button className='mb-2 ms-2' onClick={cerrarModalCompra}>Cancelar</button>
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
      {(opcion) && (tiempoSeleccionado) && <button onClick={pedirDatos}>Consultar valores</button>}
      {(opcion && <div className="text-white">{opcion}</div>)}
     </div>
     <div className='text-center text-white'>
     {datosListos && 
      // <div className='grafica-valores'>
        <Grafica datos={datos} />
      // </div>
      }
      {datosCargando && <p>Cargando datos...</p>}
      </div>
        <div className='row'>
        <div id = 'placeholder' className='col-10'></div>


          <div className='col-1 text-end mb-3 mt-2'>
            {seleccion && <button className = 'btn btn-success' onClick={preCompra}>Comprar</button>}
          </div>
          {<div className='col-1 text-end mb-3 mt-2'>
            {seleccion && <button className = 'btn btn-danger' onClick={preVenta}>Vender</button>}
          </div>}
      </div>
     </div>
   );
}
  
  export default Market;
  