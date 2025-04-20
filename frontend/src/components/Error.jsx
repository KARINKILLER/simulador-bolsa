import React from 'react';
import { useNavigate } from 'react-router-dom';

const Error = () => {
    const navigate = useNavigate();

    const irALogin = () => {
        navigate('/');
    };

    return (
        <div className='text-center mt-5'>
            <p className='text-white'>Parece que ha habido un error, si el error persiste contacta a un administrador</p>
            <button  onClick={irALogin}>
                Ir a Login
            </button>
        </div>
    );
};

export default Error;