import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './componentes/Login';
import Register from './componentes/Register';
import Market from './componentes/Market';
import Perfil from './componentes/Perfil';
import Transacciones from './componentes/Transacciones';
import Help from './componentes/Help';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/market" element={<Market />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/help" element={<Help />} />
        <Route path="/transacciones" element={<Transacciones />} />
      </Routes>
    </Router>
  );
}

export default App;