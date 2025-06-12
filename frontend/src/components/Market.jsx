import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Select from 'react-dropdown-select';
import Grafica from './Grafica';
import Modal from './Modal';

const Market = () => {
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://inappropriate-dari-karinkiller-25441d28.koyeb.app//session-status", {method: "GET",credentials: "include"})
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (!data.authenticated) {
          navigate("/error");
        }
      })
      .catch(error => {
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
  const [modalCompraRealizadaOpen, setModalCompraRealizadaOpen] = useState(false);
  const [modalVentaRealizadaOpen, setModalVentaRealizadaOpen] = useState(false);
  const [cantidadCompra, setCantidadCompra] = useState(0);
  const [cantidadVenta, setCantidadVenta] = useState(0);
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

  //Función que se encarga de pedir los datos al backend sobre un activo en un periodo de tiempo concreto
  const pedirDatos = async (ticker, codigoTiempo) => {
    if (!ticker || !codigoTiempo) return;
    setDatosCargando(true);
    setDatosListos(false);

    try {
      const response = await fetch(`https://inappropriate-dari-karinkiller-25441d28.koyeb.app//consult?activo=${ticker}&periodo=${codigoTiempo}`);
      
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
      setDatosCargando(false);
    }
  };

  const cambioAcciones = (values) => {
    if (values && values.length > 0) {
      setAccionSeleccionada(values[0].label);
      setTickerSeleccionado(values[0].ticker);
      actualizarOpcion(values[0].label, tiempoSeleccionado);
      setSeleccion(true);
      
      // Si ya hay un tiempo seleccionado, cargar datos automáticamente
      if (codigoTiempoSeleccionado) {
        pedirDatos(values[0].ticker, codigoTiempoSeleccionado);
      }
    } else {
      setAccionSeleccionada('');
      setTickerSeleccionado('');
      actualizarOpcion('', tiempoSeleccionado);
      setSeleccion(false);
      setDatosListos(false);
    }
  };

  const cambioTiempo = (values) => {
    if (values && values.length > 0) {
      setTiempoSeleccionado(values[0].label);
      setCodigoTiempoSeleccionado(values[0].codigo);
      actualizarOpcion(accionSeleccionada, values[0].label);
      
      // Si ya hay un activo seleccionado, cargar datos automáticamente
      if (tickerSeleccionado) {
        pedirDatos(tickerSeleccionado, values[0].codigo);
      }
    } else {
      setTiempoSeleccionado('');
      setCodigoTiempoSeleccionado('');
      actualizarOpcion(accionSeleccionada, '');
      setDatosListos(false);
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

  //función que se encarga de pedir los datos al backend para antes de la compra de un activo
  const preCompra = async () => {
    const response = await fetch(`https://inappropriate-dari-karinkiller-25441d28.koyeb.app//datos-pre-transaccion-compra?activo=${tickerSeleccionado}`, {credentials: 'include'});    
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    const datosPreCompra = await response.json();

    console.log(datosPreCompra)
    setPrecioActivo(datosPreCompra.precioActivo)
    setSaldoDisponible(datosPreCompra.saldoDisponible)

    console.log("Se va a comprar el siguiente activo:  " + tickerSeleccionado);
    setModalCompraOpen(true);
  };

  //función que se encarga de confirmar la compra de un activo
  const confirmarCompra = async () => {
    setCantidadCompra(document.getElementById('cantidad-compra').value);
    const cantidadComprada = document.getElementById('cantidad-compra').value;
    console.log("Cantidad a comprar: " + cantidadComprada);
    const stopLoss = parseFloat(document.getElementById('stop-loss').value) || 0;
    const takeProfit = parseFloat(document.getElementById('take-profit').value) || 0;

    try {
        const response = await fetch('https://inappropriate-dari-karinkiller-25441d28.koyeb.app//comprar-acciones', {
            method: 'POST',credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                activo: tickerSeleccionado,
                cantidad: cantidadComprada,
                stopLoss: stopLoss,
                takeProfit: takeProfit
            })
        });

        if (!response.ok) throw new Error('Error en la compra');
        
        const data = await response.json();
        console.log(data);
        setModalCompraOpen(false);
        setModalCompraRealizadaOpen(true);
    } catch (error) {
        console.error('Error:', error);
    }
  };

  //función que se encarga de pedir los datos al backend para antes de la venta de un activo
  const preVenta = async () => {
    console.log("Mirar si se tienen acciones y cuanto valen")
    const response = await fetch(`https://inappropriate-dari-karinkiller-25441d28.koyeb.app//datos-pre-transaccion-venta?activo=${tickerSeleccionado}`, {credentials: 'include'});
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    const datosPreVenta = await response.json();
    setPrecioActivo(datosPreVenta.precioActivo);
    setCantidadDisponible(datosPreVenta.cantidadDisponible);
    setNumAcciones(datosPreVenta.numAcciones);
    setModalVentaOpen(true);
  }

  //función que se encarga de confirmar la venta de un activo
  const confirmarVenta = async () => {
    setCantidadVenta(document.getElementById('cantidad-venta').value);
    const cantidadVendida = document.getElementById('cantidad-venta').value;
    const response = await fetch(`https://inappropriate-dari-karinkiller-25441d28.koyeb.app//vender-acciones?activo=${tickerSeleccionado}&cantidad=${cantidadVendida}`, {credentials: 'include', method: 'POST'});
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    cerrarModalVenta();
    setModalVentaRealizadaOpen(true);
  }

  const cerrarModalCompra = () => {
    setModalCompraOpen(false);  
  };

  const cerrarModalVenta = () => {
    setModalVentaOpen(false);
  };

  const cerrarModalCompraRealizada = () => {
    setModalCompraRealizadaOpen(false);
  };
  const cerrarModalVentaRealizada = () => {
    setModalVentaRealizadaOpen(false);
  };


  const ajustarMaximo = (id, maximo) => {
    const cantidad = document.getElementById(id).value;
    if (cantidad > maximo){
      document.getElementById(id).value = maximo;
    }
  }

  const irAPerfil = () => {
    navigate('/perfil');
  };

  return (
    <div className='container bg-app min-vh-100'>

      <Modal isOpen={modalVentaOpen}>
        { (numAcciones>0) && (
          <div className='modal-content-app p-4'>
            <h2 className='mb-3'>Vas a vender acciones de {accionSeleccionada}</h2>
            <h4 className='mb-3'>¿Cuánto dinero de este activo quieres vender?</h4>
            <h5 className='mb-3'>Cantidad disponible: <span className='text-gain'>${cantidadDisponible.toFixed(2)}</span></h5>
            <input placeholder="0" type='number' className='form-control input-app mb-3' id='cantidad-venta' step="1" max={cantidadDisponible} onBlur={() => ajustarMaximo('cantidad-venta', cantidadDisponible)} />
            <div className='text-center'>
              <button className='btn btn-app-primary me-2' onClick={confirmarVenta}>Confirmar</button>
              <button className='btn btn-app-secondary' onClick={cerrarModalVenta}>Cancelar</button>
            </div>
          </div>
        )}
        { (numAcciones<=0) && (
          <div className='modal-content-app p-4 text-center'>
            <h2 className='mb-3'>No dispones del activo: {accionSeleccionada}</h2>
            <button className='btn btn-app-secondary' onClick={cerrarModalVenta}>Aceptar</button>
          </div>
        )}
      </Modal>

      <Modal isOpen={modalCompraOpen}>
        <div className='modal-content-app p-4'>
          <h2 className='mb-3'>Vas a comprar el activo {accionSeleccionada} a <span className='text-gain'>${precioActivo}</span></h2>
          <h4 className='mb-3'>¿Cuánto dinero quieres gastarte? ($)</h4>
          <input type='number' min='0' placeholder='0' className='form-control input-app mb-3' id='cantidad-compra' step="0.5" max={saldoDisponible} onBlur={() => ajustarMaximo('cantidad-compra', saldoDisponible)} />
          <h5 className='mb-3' title = 'Stop Loss y Take Profit son los % que deberá bajar o subir el activo respectivamente antes de realizar una venta automática, dejar en 0 si no se desea venta automática'>Configura tu stop loss y tu take profit (%) ⓘ</h5>
          <div className='row mb-3'>
            <div className='col-6'>
              <h6>Stop loss</h6>
              <input type='number' step="0.5" min="0" className='form-control input-app' id='stop-loss' placeholder='0' />
            </div>
            <div className='col-6'>
              <h6>Take profit</h6>
              <input type='number' step="0.5" min="0" className='form-control input-app' id='take-profit' placeholder='0' />
            </div>
          </div>
          <div className='text-center'>
            <button className='btn btn-app-primary me-2' onClick={confirmarCompra}>Confirmar</button>
            <button className='btn btn-app-secondary' onClick={cerrarModalCompra}>Cancelar</button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={modalCompraRealizadaOpen}>
        <div className='modal-content-app p-4 text-center'>
          <h2 className='mb-3'>Compra realizada con éxito</h2>
          <p className='mb-3'>Has comprado acciones de {accionSeleccionada} por un total de ${cantidadCompra}</p>
          <button className='btn btn-app-primary' onClick={cerrarModalCompraRealizada}>Aceptar</button>
        </div>
      </Modal>
      
      <Modal isOpen={modalVentaRealizadaOpen}>
        <div className='modal-content-app p-4 text-center'>
          <h2 className='mb-3'>Venta realizada con éxito</h2>
          <p className='mb-3'>Has vendido acciones de {accionSeleccionada} por un total de ${cantidadVenta}</p>
          <button className='btn btn-app-primary' onClick={cerrarModalVentaRealizada}>Aceptar</button>
        </div>
      </Modal>

      <div className="mt-3 text-end">
        <button className='btn btn-app-primary' onClick={irAPerfil}>Ver tu perfil</button>
      </div>

      <div className='mt-3 row text-center'>
        <div className='col'>
          <Select options={opcionesAcciones} onChange={cambioAcciones} placeholder="Selecciona un activo" className="dropdown-app" noDataRenderer={() => "No se han encontrado resultados"} />
        </div>
        <div className='col'>
          <Select options={opcionesTiempo} onChange={cambioTiempo} placeholder="Selecciona un lapso de tiempo" className="dropdown-app" noDataRenderer={() => "No se han encontrado resultados"}/>
        </div>
      </div>

      <div className='text-center mt-3'>
        {opcion && <div className="mt-2 text-white">{opcion}</div>}
      </div>

      <div className='text-center'>
        {datosListos && <Grafica datos={datos} />}
        {datosCargando && <p className="text-white">Cargando datos...</p>}
      </div>

      <div className='row'>
        <div className='col-10'></div>
        <div className='col-1 text-end mb-3 mt-2'>
          {seleccion && <button className='btn btn-app-primary' onClick={preCompra}>Comprar</button>}
        </div>
        <div className='col-1 text-end mb-3 mt-2'>
          {seleccion && <button className='btn btn-app-danger' onClick={preVenta}>Vender</button>}
        </div>
      </div>
    </div>
  );
}
  
export default Market;
