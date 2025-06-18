import React, {useState, useEffect} from 'react';
import { useNavigate,  } from 'react-router-dom';
import ListaUsuarios from './ListaUsuarios';
import Modal from './Modal';



// Función para cerrar sesión
const logout = async () => {
    try {
        const response = await fetch('https://shivering-adriena-backendtfg-b6859741.koyeb.app/logout', {
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


const AdminPanel = () => {
    const [listaUsuarios, setListaUsuarios] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        // Verificar autenticación
        fetch("https://shivering-adriena-backendtfg-b6859741.koyeb.app/session-status", {
            method: "GET",
            credentials: "include"
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (!data.authenticated) {
                navigate("/error");
                return; // Salir temprano si no está autenticado
            }
            
            // Solo verificar admin si está autenticado
            return fetch("https://shivering-adriena-backendtfg-b6859741.koyeb.app/session-status-admin", {
                method: "GET",
                credentials: "include"
            });
        })
        .then(response => {
            if (!response) return; // Si ya se redirigió, no continuar
            return response.json();
        })
        .then(data => {
            if (!data) return; // Si ya se redirigió, no continuar
            
            console.log(data);
            console.log("Es admin: ", data.es_admin);
            
            // Corregir la comparación
            if (data.es_admin === "False" || data.es_admin === false) {
                navigate("/error");
                return;
            }
            
            // Solo cargar datos si es admin
            return fetch("https://shivering-adriena-backendtfg-b6859741.koyeb.app/cargar-pagina-admin", {
                method: "GET", 
                credentials: "include"
            });
        })
        .then(response => {
            if (!response) return;
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data && data.usuariosYSaldos && Array.isArray(data.usuariosYSaldos)) {
                setListaUsuarios(data.usuariosYSaldos);
            }
        })
        .catch(error => {
            console.error("Error:", error);
            navigate("/error");
        });
        
    }, [navigate]);
    
    return (
        <div className='container bg-app min-vh-100'>

            
            <h1 className='text-center mt-2'>Panel de administrador</h1>
            <div className='card card-app p-2 mb-3'>
                <h3 className='text-center'>Lista de usuarios:</h3>
                <ListaUsuarios usuarios={listaUsuarios} />
            </div>
            <button className='btn btn-app-danger d-block mx-auto mb-3' onClick={logout}> Cerrar sesión</button>
        </div>

        
    );
};

export default AdminPanel;
