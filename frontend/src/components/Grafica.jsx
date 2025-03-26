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
  const valores = datosArray.map(d => d.precio);
  const primerValor = datosArray[0].precio;
  const ultimoValor = datosArray[datosArray.length - 1].precio;
  const colorLinea = primerValor < ultimoValor ? 'rgb(5, 225, 78)' : 'rgb(255, 0, 0)';

  const data = {
    labels,
    datasets: [{
      data: valores,
      label : 'Precio',
      borderColor: colorLinea,
      tension: 0,
      pointRadius: 0,         
      pointHoverRadius: 0,    
      pointHitRadius: 20,     
      showLine: true,         
      borderWidth: 2          

    }]
  };
  
  const options = {
    // maintainAspectRatio: false,
    interaction:{
      mode: 'index',
      intersect: false,
      axis: 'x'
    },
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
