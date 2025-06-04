import React, {useState, useEffect} from 'react';
import { useNavigate,  } from 'react-router-dom';
import ListaUsuarios from './ListaUsuarios';



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
    const [modalOpen, setModalOpen] = useState(false);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

    const cerrarModal = () => {
        setModalOpen(false);
    };
    const [listaUsuarios, setListaUsuarios] = useState([]);

    const navigate = useNavigate();
    
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

        fetch("http://localhost:8000/cargar-pagina-admin", {
            method: "GET",
            credentials: "include"
        })
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
            <h1>Panel de administrador</h1>
            <ListaUsuarios usuarios={listaUsuarios} />
            <button className='btn btn-app-danger' onClick={logout}> Cerrar sesión</button>
        </div>

        
    );
};

export default AdminPanel;
