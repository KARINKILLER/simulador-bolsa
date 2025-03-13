import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/market" element={<Market />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/transacciones" element={<Transacciones />} />
      </Routes>
    </Router>
  );
}

export default App;