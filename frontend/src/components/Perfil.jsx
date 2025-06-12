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
    const [modalCuentaReiniciada, setModalCuentaReiniciada] = useState(false);


    useEffect(() => {
        // Verificar el estado de la sesión al cargar el componente
        const verificarSesion = async () => {
            try {
                const response = await fetch("https://inappropriate-dari-karinkiller-25441d28.koyeb.app/session-status", {
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

        // Cargar los datos del perfil y las transacciones
        const cargarPerfil = async () => {
            try {
                await verificarSesion();
                
                const response = await fetch('https://inappropriate-dari-karinkiller-25441d28.koyeb.app/cargar-activos-perfil', {
                    credentials: 'include'
                });
                const response2 = await fetch('https://inappropriate-dari-karinkiller-25441d28.koyeb.app/cargar-transacciones-perfil', {
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
    };
    
    const cerrarModal = () => {
        setModalOpen(false);  
    };

    const cerrarModalCuentaReiniciada = () => {
        setModalCuentaReiniciada(false);
        navigate("/");
        navigate("/perfil"); 
    };

    // Función para reiniciar la cuenta
    const reinicio = async () => {
        const response = await fetch('https://inappropriate-dari-karinkiller-25441d28.koyeb.app/reinicio', {method: 'POST', credentials: 'include'});
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        setModalOpen(false); 
        setModalCuentaReiniciada(true);
    }

    const calcularSumaTotal = (activos) => {
        return activos
          .reduce((total, activo) => total + activo.valor, 0)
          .toFixed(2);
      };

    const irAMarket = () => {
        navigate('/market');
    };

    const irATransacciones = () => {
        navigate('/transacciones');
    };
    
    // Función para cerrar sesión
    const logout = async () => {
        try {
            const response = await fetch('https://inappropriate-dari-karinkiller-25441d28.koyeb.app/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include' 
            });
            if (response.ok) {
                window.location.href = '/';
            } else {
                console.error('Error al cerrar sesión');
            }
        } catch (error) {
            console.error('Error de conexión con el servidor', error);
        }
    }

    return (
        <div className='container bg-app min-vh-100'>

            <Modal isOpen={modalCuentaReiniciada}>
                <div className='modal-content-app p-4 text-center'>
                <h2 className='mb-3'>Cuenta reiniciada con éxito</h2>
                <p className='mb-3'>Se han borrado las transacciones y sus activos. La cuenta vuelve a tener $1000 de saldo virtual.</p>
                <button className='btn btn-app-primary' onClick={cerrarModalCuentaReiniciada}>Aceptar</button>
                </div>
            </Modal>

            <Modal isOpen={modalOpen}>
                <div className='modal-content-app p-4 text-center'>
                    <h2 className='mb-3'>¿Estás seguro de que quieres reiniciar tu cuenta?</h2>
                    <p className='mb-4'>Si reinicias tu cuenta, perderás todo tu progreso y no podrás recuperarlo.</p>
                    <button className='btn btn-app-primary me-2' onClick={reinicio}>Confirmar</button>
                    <button className='btn btn-app-secondary' onClick={cerrarModal}>Cancelar</button>
                </div>
            </Modal>

            <div className='mt-3 row'>
                <div className='col-12 col-md-6'>
                    <button className='btn btn-app-primary' onClick={irAMarket}>
                        Volver al mercado
                    </button>
                </div>
                <div className='col-12 col-md-6 text-end'>
                    <button className='btn btn-app-danger' onClick={logout}>Cerrar sesión</button>
                </div>
            </div>

            <div className='text-center text-white mt-4'>
                <h2 className='mb-4'>Mi Perfil</h2>
                
                <div className='row justify-content-center mb-4'>
                    <div className='col-12'>
                        <div className='card card-app p-4'>
                            <h3 className='mb-3'>Fondos</h3>
                            <div className='grafica-donut-container-large'>
                                <GraficaDonut activos={datosActivos} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='row justify-content-center mb-4'>
                    <div className='col-12 col-md-8 col-lg-6'>
                        <div className='card card-app p-4'>
                            <h3 className='mb-3'>Saldo total</h3>
                            {datosActivos && (
                                <h4 className='text-gain'>${calcularSumaTotal(datosActivos)}</h4>
                            )}
                        </div>
                    </div>
                </div>

                <div className='row justify-content-center mb-4'>
                    <div className='col-12'>
                        <div className='card card-app p-4'>
                            <h3>Activos</h3>
                            {datosActivos && (
                                <div className="mt-2">
                                    <ListaActivos data={datosActivos} />
                                </div>
                            )}
                            {!datosActivos && <p>Cargando activos...</p>}
                        </div>
                    </div>
                </div>

                <div className='row justify-content-center mb-4'>
                    <div className='col-12'>
                        <div className='card card-app p-4'>
                            <h3 className='mb-3'>Últimas transacciones</h3>
                            {transaccionesDisponibles && <ListaTransacciones transacciones={datosTransacciones} />}
                            {!transaccionesDisponibles && <p>Cargando transacciones...</p>}
                            
                            <div className='mt-3'>
                                <button className='btn btn-app-primary' onClick={irATransacciones}>
                                    Ver historial completo
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='text-center mb-4'>
                    <button className='btn btn-app-danger' onClick={preReinicio}>
                        Reiniciar cuenta
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Perfil;
