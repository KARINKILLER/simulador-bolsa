import {React, useEffect, useState} from 'react';
import { Link} from 'react-router-dom';
import ListaTransacciones from './ListaTransacciones';
const Transacciones = () =>{
    const [datosTransacciones, setDatosTransacciones] = useState([]);
    const [transaccionesDisponibles, setTransaccionesDisponibles] = useState(false);

    useEffect(() => {
        const cargarTransacciones = async () => {
            const response = await fetch('http://localhost:8000/cargar-todas-transacciones?username=ejemplo');
            if (!response.ok) throw new Error(`Error: ${response.status}`);
            const datosTransacciones = await response.json();
            setDatosTransacciones(datosTransacciones);
            setTransaccionesDisponibles(true);
            console.log(datosTransacciones);
        }
        cargarTransacciones();
    }
    , []);

    return (
        <div className='container mt-3'>
            <Link className='text-start' to="/perfil">Volver al perfil</Link>
            <div className='text-center text-white'>
                <h1>Historial de transacciones</h1>
                {transaccionesDisponibles && <ListaTransacciones transacciones={datosTransacciones} />}
                {!transaccionesDisponibles && <p>Cargando transacciones...</p>}
                
            </div>
        </div>
    );
}

export default Transacciones;