import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const crearCuenta = async (e) => {
    e.preventDefault();
    setError(''); // Limpiar errores previos
    
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    
    if (password !== confirmPassword) {
      setError('Las contraseñas tienen que ser iguales');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Opcional: mostrar mensaje de éxito antes de navegar
        navigate('/'); 
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

  const irALogin = () => {
    navigate('/');
  };

  return (
    <div className="container bg-app d-flex align-items-center justify-content-center min-vh-100">
      <div className="col-12 col-md-6 col-lg-4">
        <div className="card card-app p-4">
          <h2 className="text-center mb-4">Registro</h2>
          {error && (
            <div className="alert alert-danger py-2 px-3" style={{backgroundColor: "#FF4D4D", color: "#fff", border: "none"}}>
              {error}
            </div>
          )}
          <form onSubmit={crearCuenta}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email:</label>
              <input type="email" className="form-control input-app" id="email" placeholder="Correo electrónico" required autocomplete="off"/>
            </div>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Nombre de usuario:</label>
              <input type="text" className="form-control input-app" id="username" placeholder="Usuario" required autocomplete="off"/>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña:</label>
              <input type="password" className="form-control input-app" id="password" placeholder="Contraseña" required/>
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="form-label">Confirmar contraseña:</label>
              <input type="password" className="form-control input-app" id="confirmPassword" placeholder="Confirmar contraseña" required/>
            </div>
            <div className="text-center mb-2">
              <button type="submit" className="btn btn-app-primary w-100">Crear cuenta</button>
            </div>
          </form>
          <div className="text-center mt-3">
            <button type="button" className="btn btn-app-secondary w-100" onClick={irALogin}>Inicio de sesión</button>
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

export default Register;
