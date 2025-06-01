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
    return (
      <div className="grafica-sin-datos">
        <p>No hay datos disponibles para graficar</p>
      </div>
    );
  }

  // Función para generar colores dinámicamente
  const generarColoresDinamicos = (cantidad) => {
    const coloresBase = [
      '#4CAF50', 
      '#FF4D4D', 
      '#36A2EB', 
      '#FFCE56', 
      '#9966FF', 
      '#FF9F40', 
      '#4BC0C0', 
      '#8DD17F'  
    ];
    
    if (cantidad <= coloresBase.length) {
      return coloresBase.slice(0, cantidad);
    }
    
    const colores = [...coloresBase];
    const coloresAdicionales = cantidad - coloresBase.length;
    //HSL es Hue, Saturation, Lightness,
    // donde Hue es el color (0-360 grados), Saturation es la intensidad del color (0-100%),
    // y Lightness es el brillo del color (0-100%).
    const step = 360 / coloresAdicionales;
    
    for (let i = 0; i < coloresAdicionales; i++) {
      const hue = (i * step + 45) % 360;
      const saturation = i % 2 === 0 ? 70 : 85;
      const lightness = i % 3 === 0 ? 55 : (i % 3 === 1 ? 65 : 45);
      colores.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
    }
    
    return colores;
  };

  const activosOrdenados = activos.sort((a, b) => b.valor - a.valor);
  
  const labels = activosOrdenados.map(a => a.activo);
  const valores = activosOrdenados.map(a => a.valor);
  const colores = generarColoresDinamicos(activosOrdenados.length);

  const data = {
    labels,
    datasets: [{
      label: 'Valor por Activo',
      data: valores,
      backgroundColor: colores,
      borderColor: '#1A1A1A',
      borderWidth: 2,
      hoverOffset: 8,
      hoverBorderWidth: 3,
      hoverBorderColor: '#FFFFFF'
    }]
  };

  const opciones = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          color: '#FFFFFF',
          font: {
            size: 12,
            weight: '500'
          },
          padding: 15,
          usePointStyle: true,
          pointStyle: 'circle'
        },
        // Deshabilitar la funcionalidad de click
        onClick: null
      },
      tooltip: {
        backgroundColor: '#232323',
        titleColor: '#FFFFFF',
        bodyColor: '#FFFFFF',
        borderColor: '#757575',
        borderWidth: 1,
        titleFont: {
          size: 14,
          weight: '600'
        },
        bodyFont: {
          size: 13
        },
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = new Intl.NumberFormat('en-US', { 
              style: 'currency', 
              currency: 'USD' 
            }).format(context.parsed);
            
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      },
      title: {
        display: true,
        color: '#FFFFFF',
        text: 'Distribución de Activos',
        font: {
          size: 18,
          weight: '600'
        },
        padding: {
          bottom: 20
        }
      }
    },
    elements: {
      arc: {
        borderWidth: 2
      }
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1000
    }
  };

  return (
    <div className="grafica-donut-wrapper">
      <Doughnut data={data} options={opciones} />
    </div>
  );
}

export default GraficaDonut;
