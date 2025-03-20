import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Register = () => {

  const [error, setError] = useState('');
  const navigate = useNavigate();

  //Función para envío de datos para crear la cuenta
  const crearCuenta = async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
    const confirmPassword = document.getElementById("confirmPassword").value
    if (password!=confirmPassword){
      setError('Las contraseñas tienen que ser iguales');
    }
    else{
      //Si las contraseñas son iguales, se intenta crear el usuario
      try{
      const response = await fetch('http://127.0.0.1:8000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email,username, password}),
      });
      const data = await response.json();

      if (response.ok) {
        //crear la cuenta y mandar al inicio de sesión ***PONER ALGÚN MENSAJE DE ÉXITO??***
        navigate('/'); 
      } else {
        //Indicar que el nombre de usuario o el correo ya están en uso 
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
    }
  };
    }

    //Código HTML de la página de registro
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Registro</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={crearCuenta}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email:</label>
                  <input type="email" className="form-control" id="email" required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Nombre de usuario:</label>
                  <input type="username" className="form-control" id="username" required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Contraseña:</label>
                  <input type="password" className="form-control" id="password" required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">Confirmar contraseña:</label>
                  <input type="password" className="form-control" id="confirmPassword" required/>
                </div>
                <div className='text-center'>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">Crear cuenta</button>
                </div>
              </form>
              <div className='text-center'>
              <Link to="/">Inicio de sesión</Link>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;