import React from 'react';
import { useNavigate } from 'react-router-dom';

const Error = () => {
    const navigate = useNavigate();

    const logout = async () => {

        navigate("/");

}

    return (
        <div className='container bg-app min-vh-100 d-flex align-items-center justify-content-center'>
            <div className='error-container-simple'>
                <div className='card card-app p-4 text-center'>
                    <div className='mb-3'>
                       <h1>:(</h1>
                    </div>
                    
                    <h2 className='mb-3'>Algo salió mal</h2>
                    
                    <p className='error-message-simple mb-4'>
                        Ha ocurrido un error. Por favor, inicia sesión nuevamente.
                    </p>
                    
                    <button className='btn btn-app-primary' onClick={logout}>
                        Ir al Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Error;
