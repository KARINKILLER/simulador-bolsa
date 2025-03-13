import React from 'react';
import { Link} from 'react-router-dom';
const Transacciones = () =>{
    return (
        <div className='container mt-3'>
            <Link className='text-start' to="/perfil">Volver al perfil</Link>
            <div className='text-center text-white'>
                <h1>Historial de transacciones</h1>
                <p>*Fecha* - *Compraste/vendiste* *activo* por valor de *numero* $</p>
                <p>*Fecha* - *Compraste/vendiste* *activo* por valor de *numero* $</p>
                <p>*Fecha* - *Compraste/vendiste* *activo* por valor de *numero* $</p>
            </div>
        </div>
    );
}

export default Transacciones;