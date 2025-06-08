import React, {useState, useEffect} from 'react';
import { useNavigate,  } from 'react-router-dom';
import ListaUsuarios from './ListaUsuarios';
import Modal from './Modal';



// Función para cerrar sesión
const logout = async () => {
    try {
        const response = await fetch('http://localhost:8000/logout', {
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
    
    // Verificar el estado de la sesión y cargar la lista de usuarios al montar el componente
      useEffect(() => {
        fetch("http://localhost:8000/session-status", {method: "GET",credentials: "include"})
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

        fetch("http://localhost:8000/session-status-admin", {method: "GET",credentials: "include"})
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (!data.es_admin) {
                navigate("/error");
                }
            })
            .catch(error => {
                navigate("/error");
            });

        fetch("http://localhost:8000/cargar-pagina-admin", {method: "GET", credentials: "include"})
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setListaUsuarios(data.usuariosYSaldos);
            })
            .catch(error => {
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
