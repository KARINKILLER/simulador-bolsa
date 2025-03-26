import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function GraficaDonut({ activos }) {
  if (!activos || activos.length === 0) {
    return <div>No hay datos disponibles para graficar</div>;
  }

  const labels = activos.map(a => a.activo);
  const cantidades = activos.map(a => a.cantidad);

  const colores = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
    '#9966FF', '#FF9F40', '#C9CBCF', '#8DD17F'
  ];

  const data = {
    labels,
    datasets: [{
      label: 'Porcentaje por Activo',
      data: cantidades,
      backgroundColor: colores.slice(0, activos.length),
      hoverOffset: 4
    }]
  };

  const opciones = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white'
        }
      },
      tooltip: {
        callbacks: {
          label: (context)=> {
            let label;
            if (context.parsed !== null) {
              label = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed);
            }
            return label;
          }
        }
      },
      title: {
        display: true,
        color: 'white',
        text: 'Distribución de Activos'
      }
    }
  };

  return (
    <div>
      <Doughnut data={data} options={opciones} />
    </div>
  );
}

export default GraficaDonut;
