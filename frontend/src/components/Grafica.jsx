import React from 'react';
import { Line } from 'react-chartjs-2';
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from 'chart.js';

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
    return (
      <div className="grafica-sin-datos">
        <p>No hay datos disponibles para graficar</p>
      </div>
    );
  }

  const labels = datosArray.map(d => d.fecha);
  const valores = datosArray.map(d => d.precio);
  const primerValor = datosArray[0].precio;
  const ultimoValor = datosArray[datosArray.length - 1].precio;
  const colorLinea = primerValor < ultimoValor ? '#05FF4E' : '#FF4D4D';

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
    responsive: true,
    maintainAspectRatio: false, 
    interaction:{
      mode: 'index',
      intersect: false,
      axis: 'x'
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          color: '#FFFFFF', 
          // Formatear los valores para que aparezcan como moneda
          callback: (value) => {
            return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
          }
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: '#FFFFFF' 
        }
      },
      tooltip: {
        backgroundColor: '#232323',
        titleColor: '#FFFFFF',
        bodyColor: '#FFFFFF',
        borderColor: '#757575',
        borderWidth: 1,
        callbacks: {
          label: (context) => {
            let label;
            //Formatear el valor del tooltip como moneda
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
    <div className="grafica-line-container">
      <Line data={data} options={options} />
    </div>
  );
}

export default Grafica;
