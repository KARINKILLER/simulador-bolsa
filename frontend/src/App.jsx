import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Market from './components/Market';
import Perfil from './components/Perfil';
import Transacciones from './components/Transacciones';
import Help from './components/Help';
import CryptoMarket from './components/CryptoMarket';
import Error from './components/Error';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/market" element={<Market />} />
        <Route path="/cryptomarket" element={<CryptoMarket />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/help" element={<Help />} />
        <Route path="/transacciones" element={<Transacciones />} />
        <Route path="/error" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;