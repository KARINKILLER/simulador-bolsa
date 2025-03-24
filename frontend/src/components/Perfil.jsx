import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from './Modal';


const Perfil = () =>{
    const cargarPerfil = async () => {
        const response = await fetch('http://localhost:8000/perfil?username=ejemplo');
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();
        console.log(data);
    }
    
    const [modalOpen, setModalOpen] = useState(false);
    
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
            <p>Donut de fondos</p>
            <p>últimas transacciones:</p>
            <p>*Fecha* - *Compraste/vendiste* *activo* por valor de *numero* $</p>
            <p>*Fecha* - *Compraste/vendiste* *activo* por valor de *numero* $</p>
            <p>*Fecha* - *Compraste/vendiste* *activo* por valor de *numero* $</p>

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