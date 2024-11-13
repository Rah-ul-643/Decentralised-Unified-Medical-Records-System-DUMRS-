import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';

const baseUrl = process.env.REACT_APP_API;

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export function Graph(props) {
  const [bloodPressureData, setBloodPressureData] = useState([]);
  const { id } = props;

  useEffect(() => {
    const fetchBloodPressureData = async () => {
      try {
        const response = await fetch(baseUrl + `/patient/records/bloodPressure/${id}`, {
          method: 'GET',
          credentials: 'include'
        });
        const data = await response.json();
        
        // Format the dates
        const formattedData = data.map(item => ({
          x: new Date(item.x).toLocaleDateString('default', { 
            month: 'short',
            year: 'numeric'
          }),
          y: item.y
        }));
        
        setBloodPressureData(formattedData);
      } catch (error) {
        console.error('Error fetching blood pressure data:', error);
      }
    };

    fetchBloodPressureData();
  }, [id]);

  // Only render the chart if we have data
  if (!bloodPressureData.length) return <div>Loading...</div>;

  const data = {
    labels: bloodPressureData.map(d => d.x),
    datasets: [
      {
        label: 'Blood Pressure',
        data: bloodPressureData.map(d => d.y),
        borderColor: 'rgba(138, 43, 226, 1)',
        backgroundColor: 'rgba(138, 43, 226, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: 'rgba(138, 43, 226, 1)',
        pointBorderColor: 'white',
        pointBorderWidth: 2,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: 'rgba(138, 43, 226, 1)',
        pointHoverBorderColor: 'white',
        pointHoverBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'white',
        titleColor: 'black',
        bodyColor: 'black',
        borderColor: 'lightgrey',
        borderWidth: 1,
        padding: 10,
        displayColors: false,
        callbacks: {
          title: (context) => `Date: ${context[0].label}`,
          label: (context) => `Blood Pressure: ${context.parsed.y} mmHg`,
        },
      },
    },
    scales: {
      x: {
        type: 'category',
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
          maxRotation: 45,
          autoSkip: false
        },
      },
      y: {
        min: 80,  // Set minimum value slightly below lowest BP
        max: 140, // Set maximum value slightly above highest BP
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          font: {
            size: 12,
          },
          stepSize: 10,
          callback: function(value) {
            return value + ' mmHg';
          }
        },
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <div style={{ width: '100%', height: '350px' }}>
        <Line options={options} data={data} />
      </div>
    </div>
  );
}