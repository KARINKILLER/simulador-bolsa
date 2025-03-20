import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const Perfil = () =>{
    return (
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

        </div>
        </div>
        </div>
        
    );
}

export default Perfil;