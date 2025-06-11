import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Market from './components/Market';
import Perfil from './components/Perfil';
import Transacciones from './components/Transacciones';
import Error from './components/Error';
import Terms from './components/Terms';
import AdminPanel from './components/AdminPanel';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/market" element={<Market />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/transacciones" element={<Transacciones />} />
        <Route path="/error" element={<Error />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/adminPanel" element={<AdminPanel />} />

      </Routes>
    </Router>
  );
}

export default App;
