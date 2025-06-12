import { React, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ListaTransacciones from './ListaTransacciones';

const Transacciones = () => {
    const [datosTransacciones, setDatosTransacciones] = useState([]);
    const [transaccionesDisponibles, setTransaccionesDisponibles] = useState(false);
    const navigate = useNavigate();

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

        // Cargar las transacciones al montar el componente
        const cargarTransacciones = async () => {
            try {
                await verificarSesion();
                
                const response = await fetch('https://inappropriate-dari-karinkiller-25441d28.koyeb.app/cargar-todas-transacciones', {
                    credentials: 'include'
                });
                
                if (!response.ok) throw new Error(`Error: ${response.status}`);
                
                const datosTransacciones = await response.json();
                setDatosTransacciones(datosTransacciones);
                setTransaccionesDisponibles(true);
                
            } catch (error) {
                console.error("Error al cargar transacciones:", error);
                navigate("/error");
            }
        };

        cargarTransacciones();
    }, [navigate]);

    const irAPerfil = () => {
        navigate("/perfil");
    }

    return (
        <div className='container bg-app min-vh-100'>
            <div className='mt-3 mb-4'>
                <button className='btn btn-app-primary' onClick={irAPerfil}>
                    Volver al perfil
                </button>
            </div>

            <div className='text-center text-white'>
                <h1 className='mb-4'>Historial de transacciones</h1>
                
                <div className='row justify-content-center'>
                    <div className='col-12 col-lg-10'>
                        <div className='card card-app p-4 mb-3'>
                            {transaccionesDisponibles && <ListaTransacciones transacciones={datosTransacciones} />}
                            {!transaccionesDisponibles && <p>Cargando transacciones...</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Transacciones;
