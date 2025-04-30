import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const enviarFormulario = async (e) => {
    e.preventDefault();
    try {
      console.log("Intentamos iniciar sesión");
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include' 
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/market'); 
      } else {
        setError(data.detail || 'Error al iniciar sesión');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
    }
  };


 return (
 <div className="container mt-5">
     <div className="row justify-content-center">
         <div className="col-md-6">
             <div className="card">
                 <div className="card-body">
                     <h2 className="card-title text-center">Inicio de sesión</h2>
                     {error && <div className="alert alert-danger">{error}</div>}
                     <form onSubmit={enviarFormulario}>
                         <div className="mb-3">
                             <label htmlFor="username" className="form-label">Nombre de usuario:</label>
                             <input type="username" className="form-control" id="username" required />
                         </div>
                         <div className="mb-3">
                             <label htmlFor="password" className="form-label">Contraseña:</label>
                             <input type="password" className="form-control" id="password" required />
                         </div>
                         <div className="text-center">
                             <button type="submit" className="btn btn-primary">Iniciar sesión</button>
                         </div>
                     </form>
                     <div className="text-center mt-2">
                         <Link to="/register">Crea tu cuenta ya!</Link>
                     </div>
                 </div>
             </div>
         </div>
     </div>
 </div>
 );
};

export default Login;
