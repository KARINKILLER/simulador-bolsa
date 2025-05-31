import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from './Modal';
import GraficaDonut from './GraficaDonut';
import ListaTransacciones from './ListaTransacciones';
import ListaActivos from './ListaActivos';

const Perfil = () => {   
    const [datosActivos, setDatosActivos] = useState(null);
    const [datosTransacciones, setDatosTransacciones] = useState([]);
    const [transaccionesDisponibles, setTransaccionesDisponibles] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const verificarSesion = async () => {
            try {
                const response = await fetch("http://localhost:8000/session-status", {
                    method: "GET",
                    credentials: "include"
                });
                
                const data = await response.json();
                if (!data.authenticated) {
                    navigate("/error");
                }
            } catch (error) {
                navigate("/error");
            }
        };

        const cargarPerfil = async () => {
            try {
                await verificarSesion();
                
                const response = await fetch('http://localhost:8000/cargar-activos-perfil', {
                    credentials: 'include'
                });
                const response2 = await fetch('http://localhost:8000/cargar-transacciones-perfil', {
                    credentials: 'include'
                });
                
                if (!response.ok) throw new Error(`Error: ${response.status}`);
                if (!response2.ok) throw new Error(`Error: ${response2.status}`);
                
                const datosActivos = await response.json();
                const datosTransacciones = await response2.json();
                
                setDatosActivos(datosActivos);
                setDatosTransacciones(datosTransacciones);
                setTransaccionesDisponibles(true);
                
            } catch (error) {
                console.error("Error al cargar el perfil:", error);
                navigate("/error");
            }
        };

        cargarPerfil();
    }, [navigate]);

    
    const preReinicio = () => {
        setModalOpen(true);
    }
    
    const cerrarModal = () => {
        setModalOpen(false);  
    };

    const reinicio = async () => {
        const response = await fetch('http://localhost:8000/reinicio', {method: 'POST', credentials: 'include'});
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        alert('Cuenta reiniciada con éxito');
        setModalOpen(false); 
        window.location.reload();
    }

    const calcularSumaTotal = (activos) => {
        return activos
          .reduce((total, activo) => total + activo.valor, 0)
          .toFixed(2);
      };

    const irAMarket = () => {
        navigate('/market');
    };
    
    const logout = async () => {
        try {
            const response = await fetch('http://localhost:8000/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include' 
            });
            if (response.ok) {
                window.location.href = '/'; // Redirigir a la página de inicio de sesión
            } else {
                console.error('Error al cerrar sesión');
            }
        } catch (error) {
            console.error('Error de conexión con el servidor', error);
        }
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
        <button className='col-2 btn btn-primary' onClick={irAMarket}>
                Volver al mercado
            </button>
        <p className='col-8'></p>
        <button className='col-2 btn btn-danger' onClick={logout}>Cerrar sesión</button>
        <div className='text-center text-white'>
            <p>Nombre de usuario</p>
            <h3>Fondos</h3>
            <div className='grafica-donut'>
                <GraficaDonut activos={datosActivos} options={{maintainAspectRatio: false}}/>
            </div>
            <h3 className='mt-2'>Saldo total</h3>
            {datosActivos && (<p className='mt-2'> ${calcularSumaTotal(datosActivos)}</p>)}
            <h3 className='mt-2'>Activos</h3>
                {datosActivos && (
                    <div className="mt-4">
                        <ListaActivos data={datosActivos} />
                    </div>
                )}
            <p className='mt-2'>Últimas transacciones:</p>
            {transaccionesDisponibles && <ListaTransacciones transacciones={datosTransacciones} />}
            {!transaccionesDisponibles && <p>Cargando transacciones...</p>}

            <Link to ="/transacciones">Consultar historial de transacciones</Link>
            <br></br>
            <button className='btn btn-danger mt-4 mb-4' onClick={preReinicio}>Reiniciar cuenta</button>

        </div>
        </div>
        </div>
        </div>

    );
}

export default Perfil;