import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from './Modal';
import GraficaDonut from './GraficaDonut';
import ListaTransacciones from './ListaTransacciones';

const Perfil = () =>{   
    const [datosActivos, setDatosActivos] = useState(null);
    const [datosTransacciones, setDatosTransacciones] = useState([]);
    const [transaccionesDisponibles, setTransaccionesDisponibles] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const cargarPerfil = async () => {
            try {
                const response = await fetch('http://localhost:8000/cargar-activos-perfil?username=ejemplo');
                const response2 = await fetch('http://localhost:8000/cargar-transacciones-perfil?username=ejemplo');
                if (!response.ok) throw new Error(`Error: ${response.status}`);
                if (!response2.ok) throw new Error(`Error: ${response2.status}`);
                const datosActivos = await response.json();
                const datosTransacciones = await response2.json();
                setDatosActivos(datosActivos);
                setDatosTransacciones(datosTransacciones);
                setTransaccionesDisponibles(true);
                console.log(datosActivos);   
                console.log(datosTransacciones);
            } catch (error) {
                console.error("Error al cargar el perfil:", error);
            }
        };

        cargarPerfil();
    }, []);

    
    const preReinicio = () => {
        setModalOpen(true);
    }
    
    const cerrarModal = () => {
        setModalOpen(false);  
    };

    const reinicio = async () => {
        const response = await fetch('http://localhost:8000/reinicio?username=ejemplo');
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        alert('Cuenta reiniciada con éxito');
        setModalOpen(false);  
    }
    return (
        <div className='container'>

        <Modal isOpen={modalOpen}>
                    <div className='text-center'>
                        <h2>¿Estás seguro de que quieres reiniciar tu cuenta?</h2>
                        <p>Si reinicias tu cuenta, perderás todo tu progreso y no podrás recuperarlo.</p>
                        <button className='mt-2 mb-2 ms-2' onClick={reinicio}>Confirmar</button>
                        <button className='mb-2 ms-2' onClick={cerrarModal}>Cancelar</button>
                    </div>
         </Modal>

        <div className='container'>
        <div className='mt-3 row'>
        <Link className='col' to="/market">Volver</Link>
        <p className='col-9'></p>
        <Link className='col' to ="/">Cerrar sesión</Link>
        <div className='text-center text-white'>
            <p>Nombre de usuario</p>
            <p>Fondos</p>
            <GraficaDonut activos={datosActivos} />
            <p className='mt-2'>Últimas transacciones:</p>
            {transaccionesDisponibles && <ListaTransacciones transacciones={datosTransacciones} />}
            {!transaccionesDisponibles && <p>Cargando transacciones...</p>}

            <Link to ="/transacciones">Consultar historial de transacciones</Link>
            <br></br>
            <button className='btn btn-danger mt-4' onClick={preReinicio}>Reiniciar cuenta</button>

        </div>
        </div>
        </div>
        </div>

    );
}

export default Perfil;