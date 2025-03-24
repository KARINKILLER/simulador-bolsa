import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-dropdown-select';
import Grafica from './Grafica';
import Modal from './Modal';


const CryptoMarket = () => {
  //petición de datos
  


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
  


  const opcionesCriptoMonedas = [
    
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
    let stopLoss = document.getElementById('stop-loss').value;
    let takeProfit = document.getElementById('take-profit').value;
    if (stopLoss === ''){
      stopLoss = 0;
    }
    if (takeProfit === ''){
      takeProfit = 0;
    }

    console.log("Se van a comprar " + cantidadCompra + " acciones de " + tickerSeleccionado);
    //Poner simbolo de cargando o algo
    //Petición
    fetch(`http://localhost:8000/comprar-acciones?activo=${tickerSeleccionado}&cantidad=${cantidadCompra}&stopLoss=${stopLoss}&takeProfit=${takeProfit}&username=ejemplo`)
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

  const ajustarMaximo = () => {
    const cantidadCompra = document.getElementById('cantidad-compra').value;
    if (cantidadCompra > saldoDisponible){
      document.getElementById('cantidad-compra').value = saldoDisponible;
    }
  }
  return (
      <div className='container'>

        <Modal isOpen={modalOpen}>
                    <h2 title='El precio de la acción podría variar si se tarda en realizar la compra'>Vas a comprar acciones de {accionSeleccionada} a ${precioActivo} &#9432;</h2>
                    <h4>¿Cuánto dinero quieres gastarte? ($)</h4>
                    <input type='number' step = "0.5" max = {saldoDisponible} onBlur={ajustarMaximo} id='cantidad-compra'></input>
                    <h5 title='Stop loss y take profit: % que tiene que BAJAR o SUBIR un activo para ser vendido automáticamente'>Configura tu stop loss y tu take profit (%) &#9432;</h5>
                    <h6>Stop loss</h6>
                    <input title='Si lo dejas vacío o en 0 no se ejecutarán acciones automáticas' type='number' step = "0.5" min = "0" id='stop-loss' placeholder='0' className='me-2'></input>
                    <h6>Take profit</h6>
                    <input title='Si lo dejas vacío o en 0 no se ejecutarán acciones automáticas' type='number' step = "0.5" min = "0" id='take-profit' placeholder='0'></input>
                    <br></br>
                    <button className='mt-2 mb-2 ms-2' onClick={confirmarCompra}>Confirmar</button>
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
      <div className='text-end mb-3 mt-2'>
        {datosListos && <button onClick={preCompra}>Comprar</button>}
      </div>
    
     </div>
   );
}
  
  export default CryptoMarket;
  