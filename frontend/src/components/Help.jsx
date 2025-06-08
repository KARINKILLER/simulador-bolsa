import React, { useState, useEffect } from 'react';
import GraficaDonut from './GraficaDonut';

//EN DESUSO
const Help = () => {
  const datosActivos = [
  { activo: "Acciones", cantidad: 5000 },
  { activo: "Bonos", cantidad: 3000 },
  { activo: "Efectivo", cantidad: 2000 }
];
return(
<GraficaDonut activos={datosActivos} />
);
};

export default Help;
