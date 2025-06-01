import { React, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ListaTransacciones from './ListaTransacciones';

const Transacciones = () => {
    const [datosTransacciones, setDatosTransacciones] = useState([]);
    const [transaccionesDisponibles, setTransaccionesDisponibles] = useState(false);
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

        const cargarTransacciones = async () => {
            try {
                await verificarSesion();
                
                const response = await fetch('http://localhost:8000/cargar-todas-transacciones', {
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
        <div className='container mt-3'>
            <button className='btn btn-app-primary' onClick={irAPerfil}> Volver al perfil</button>

            <div className='text-center text-white'>
                <h1>Historial de transacciones</h1>
                {transaccionesDisponibles && <ListaTransacciones transacciones={datosTransacciones} />}
                {!transaccionesDisponibles && <p>Cargando transacciones...</p>}
                
            </div>
        </div>
    );
}

export default Transacciones;