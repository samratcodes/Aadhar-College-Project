'use client';
import dynamic from 'next/dynamic';
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });
import React from 'react';
import { BsGraphUpArrow } from "react-icons/bs";

// Generate dummy appointment data for the last 14 days
const generateDummyData = () => {
  const data = [];
  const now = new Date();
  
  for (let i = 13; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(now.getDate() - i);
    
    // Random number of appointments between 3 and 20 for each day
    const appointmentsCount = Math.floor(Math.random() * 18) + 3;
    
    // Create multiple appointments for the same day with different times
    for (let j = 0; j < appointmentsCount; j++) {
      const appointmentDate = new Date(date);
      // Random time during business hours (9am-5pm)
      appointmentDate.setHours(9 + Math.floor(Math.random() * 8));
      appointmentDate.setMinutes(Math.floor(Math.random() * 60));
      
      data.push({
        id: `appt-${i}-${j}`,
        createdAt: appointmentDate.toISOString(),
        patientName: `Patient ${Math.floor(Math.random() * 100)}`,
        service: ['Checkup', 'Consultation', 'Follow-up', 'Procedure'][Math.floor(Math.random() * 4)]
      });
    }
  }
  
  return data;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const DashboardgraphAd = () => {
  // Use the generated dummy data
  const dummyData = generateDummyData();
  
  // Group appointments by date and count them
  const appointmentCounts = {};
  dummyData.forEach(appointment => {
    const date = formatDate(appointment.createdAt);
    appointmentCounts[date] = (appointmentCounts[date] || 0) + 1;
  });

  const dates = Object.keys(appointmentCounts);
  const counts = Object.values(appointmentCounts);

  const chartData = [
    {
      x: dates,
      y: counts,
      type: 'bar',
      name: 'Appointments Booked',
      marker: {
        color: '#10B981', // Blue color for bars
      }
    },
    {
      x: dates,
      y: counts,
      type: 'scatter',
      mode: 'lines+markers',
      name: 'Trend',
      line: {
        color: '#3B82F6', // Green color for trend line
        width: 3
      },
      marker: {
        color: '#10B981',
        size: 8
      }
    }
  ];

  const layout = {
    plot_bgcolor: '#FAFAFA',
    paper_bgcolor: '#FAFAFA',
    showlegend: true,
    legend: { 
      orientation: 'h', 
      x: 0, 
      y: -0.2,
      font: {
        size: 12
      }
    },
    xaxis: {
      title: 'Date',
      tickangle: -45,
      gridcolor: '#EEE',
      type: 'category',
      automargin: true
    },
    yaxis: {
      title: 'Number of Appointments',
      gridcolor: '#EEE',
      rangemode: 'tozero'
    },
    margin: { t: 40, l: 50, r: 30, b: 100 },
    hovermode: 'closest',
    barmode: 'group'
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl mt-4 p-6">
      <h1 className='w-full flex justify-between items-center'>
        <span className="text-2xl font-bold text-green-600">
          <BsGraphUpArrow className='inline-block mr-2'/>
          Appointment Booking Trends (Last 14 Days)
        </span>
      </h1>

      <Plot
        data={chartData}
        layout={layout}
        config={{ 
          responsive: true,
          displayModeBar: true,
          modeBarButtonsToRemove: [
            'toImage',
            'sendDataToCloud',
            'editInChartStudio',
            'pan2d',
            'select2d',
            'lasso2d',
            'drawclosedpath',
            'drawopenpath',
            'drawline',
            'drawrect',
            'drawcircle',
            'eraseshape',
            'autoScale2d',
            'hoverClosestCartesian',
            'hoverCompareCartesian',
            'resetScale2d',
            'toggleSpikelines'
          ],
          displaylogo: false
        }}
        style={{ width: '100%', height: '400px' }}
      />
      
      <div className="mt-4 text-sm text-gray-600">
        <p>
          <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-1"></span>
          Number of appointments booked per day
        </p>
        <p>
          <span className="inline-block w-3 h-3 rounded-full bg-blue-500 mr-1"></span>
          Trend line showing overall booking pattern
        </p>
      </div>
    </div>
  );
};

export default DashboardgraphAd;