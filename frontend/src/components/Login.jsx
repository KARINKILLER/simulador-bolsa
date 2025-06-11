import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoSimuMarket from '../assets/simumarket2.png';

const Login = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  //Función para enviar el formulario de inicio de sesión
  const enviarFormulario = async (e) => {
  e.preventDefault();
  setError(''); 
  try {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    const response = await fetch('https://simulador-bolsa-05g9.onrender.com/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
      credentials: 'include' 
    });

    if (response.ok) {
      const data = await response.json();

      navigate(data.ruta); 
    } else {
      try {
        const errorData = await response.json();
        setError(errorData.detail || `Error ${response.status}: ${response.statusText}`);
      } catch (jsonError) {
        setError(`Error ${response.status}: ${response.statusText}`);
      }
    }
  } catch (err) {
    console.error('Error de conexión:', err);
    setError('Error de conexión con el servidor');
  }
};


  const irARegistro = () => {
    navigate('/register');
  };

  return (
    <div className="container bg-app d-flex justify-content-center min-vh-100">
      <div className="col-12 col-md-6 col-lg-4">
        <div className="align-items-center justify-content-center mt-4">
            <img src={logoSimuMarket} alt="Logo SimuMarket" className='mb-4 mt-4' style={{ maxWidth: '430px' }} />
        </div>
        <div className="card card-app p-4 mt-3">
          <h2 className="text-center mb-4 mt-3">Inicio de sesión</h2>
          {error && (
            <div className="alert alert-danger py-2 px-3" style={{backgroundColor: "#FF4D4D", color: "#fff", border: "none"}}>
              {error}
            </div>
          )}
          <form onSubmit={enviarFormulario}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Nombre de usuario:</label>
              <input type="text" className="form-control input-app" id="username" placeholder='Usuario'required autoComplete="off"/>
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="form-label">Contraseña:</label>
              <input type="password" className="form-control input-app" id="password" placeholder='Contraseña' required autoComplete="off"/>
            </div>
            <div className="text-center mb-2">
              <button type="submit" className="btn btn-app-primary w-100">
                Iniciar sesión
              </button>
            </div>
          </form>
          <div className="text-center mt-3">
            <button type="button" className="btn btn-app-secondary w-100" onClick={irARegistro}>
              ¡Crea tu cuenta ya!
            </button>
          </div>
        </div>
      </div>
      <div className="fixed-bottom py-3">
        <div className="container text-center">
          © 2025 UAH   
          <Link to="/terms" className="ms-3 link-app">
            Términos y Condiciones
          </Link>
        </div>
</div>

    </div>
  );
};

export default Login;
