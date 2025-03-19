import React from 'react';
import { Line } from 'react-chartjs-2';
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from 'chart.js';
import plugin from 'eslint-plugin-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Grafica({ datos }) {
  const datosArray = datos.datos || [];

  if (datosArray.length === 0) {
    return <div>No hay datos disponibles para graficar</div>;
  }

  const labels = datosArray.map(d => d.fecha);
  const valores = datosArray.map(d => d.valor);

  const data = {
    labels,
    datasets: [{
      label: 'Valor',
      data: valores,
      borderColor: 'rgb(5, 225, 78)',
      tension: 0
    }]
  };
  
  const options = {
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: (value) => {
            return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
          }
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            let label;
            console.log(context.raw);   
            if (context.parsed !== null) {
              label = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.raw);
            }
            return label;
          }
        }
      }
    }
  };
  

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
}

export default Grafica;
