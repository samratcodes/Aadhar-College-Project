'use client';
import dynamic from 'next/dynamic';
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });
import React, { useState } from 'react';
import { BsGraphUpArrow } from "react-icons/bs";
import GenerateInsites from './GenerateInsites';

//hello
const metricInfo = {
  bloodGlucoseMgDl: {
    label: 'Blood Glucose (mg/dL)',
    normalMin: 70,
    normalMax: 110,
  },
  heartRate: {
    label: 'Heart Rate (bpm)',
    normalMin: 60,
    normalMax: 100,
  },
  bodyTemperatureCelsius: {
    label: 'Body Temperature (°C)',
    normalMin: 36.1,
    normalMax: 37.2,
  },
  bloodPressureSystolic: {
    label: 'Systolic BP (mmHg)',
    normalMin: 90,
    normalMax: 120,
  },
  bloodPressureDiastolic: {
    label: 'Diastolic BP (mmHg)',
    normalMin: 60,
    normalMax: 80,
  },
  oxygenSaturationPercent: {
    label: 'Oxygen Saturation (%)',
    normalMin: 95,
    normalMax: 100,
  },
  respiratoryRate: {
    label: 'Respiratory Rate (bpm)',
    normalMin: 12,
    normalMax: 20,
  }
};

const metricKeys = Object.keys(metricInfo);

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
};

const Reportgraph = ({data}) => {
  console.log(data);

  const [selectedMetric, setSelectedMetric] = useState('bloodGlucoseMgDl');
  const dates = data.map((p) => formatDate(p.createdAt));
  const values = data.map((p) => p[selectedMetric]);

  const { label, normalMin, normalMax } = metricInfo[selectedMetric];

  // Calculate if each value is within normal range
  const inRangeColors = values.map(value => 
    value >= normalMin && value <= normalMax ? '#10B981' : '#EF4444'
  );

  const chartData = [
    {
      x: dates,
      y: values,
      type: 'scatter',
      mode: 'lines+markers',
      name: label,
      line: {
        color: '#10B981',
        width: 3
      },
      marker: {
        color: inRangeColors,
        size: 12,
        line: {
          color: '#FFFFFF',
          width: 2
        }
      }
    },
    {
      x: [dates[0], dates[dates.length - 1]],
      y: [normalMin, normalMin],
      type: 'scatter',
      mode: 'lines',
      name: 'Healthy Range',
      fill: 'tonexty',
      fillcolor: 'rgba(16, 185, 129, 0.1)',
      line: {
        color: 'rgba(16, 185, 129, 0.5)',
        width: 0
      },
      showlegend: false
    },
    {
      x: [dates[0], dates[dates.length - 1]],
      y: [normalMax, normalMax],
      type: 'scatter',
      mode: 'lines',
      line: {
        color: '#10B981', // Green color for max line
        width: 2,
        dash: 'dash'
      },
      hoverinfo: 'none',
      showlegend: false
    },
    {
      x: [dates[0], dates[dates.length - 1]],
      y: [normalMin, normalMin],
      type: 'scatter',
      mode: 'lines',
      line: {
        color: '#10B981', // Green color for min line
        width: 2,
        dash: 'dash'
      },
      hoverinfo: 'none',
      showlegend: false
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
      title: 'Date & Time',
      tickangle: 0,
      gridcolor: '#EEE',
      type: 'category',
      automargin: true
    },
    yaxis: {
      title: label,
      gridcolor: '#EEE'
    },
    margin: { t: 40, l: 50, r: 30, b: 100 },
    hovermode: 'closest',
    annotations: [
      {
        x: dates[dates.length - 1],
        y: normalMax,
        xref: 'x',
        yref: 'y',
        text: 'Upper Limit',
        showarrow: false,
        xanchor: 'left',
        yanchor: 'bottom',
        bgcolor: 'rgba(255,255,255,0.8)',
        bordercolor: '#10B981',
        borderwidth: 1,
        borderpad: 4,
        font: {
          size: 10,
          color: '#065F46'
        }
      },
      {
        x: dates[dates.length - 1],
        y: normalMin,
        xref: 'x',
        yref: 'y',
        text: 'Lower Limit',
        showarrow: false,
        xanchor: 'left',
        yanchor: 'top',
        bgcolor: 'rgba(255,255,255,0.8)',
        bordercolor: '#10B981',
        borderwidth: 1,
        borderpad: 4,
        font: {
          size: 10,
          color: '#065F46'
        }
      }
    ]
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6">
      <h1 className='w-full flex justify-between items-center'>
        <span className="text-2xl font-bold text-green-600">
          <BsGraphUpArrow className='inline-block mr-2'/>
          Health Metrics Trend
        </span>
      </h1>
      <div className="flex gap-1 my-4 border-b pb-2 overflow-x-auto">
        {metricKeys.map((key) => (
          <button
            key={key}
            onClick={() => setSelectedMetric(key)}
            className={`px-1 py-2 rounded-t-md text-sm font-medium whitespace-nowrap ${
              selectedMetric === key
                ? 'bg-green-50 text-green-600 border-b-2 border-green-500'
                : 'text-gray-500 hover:text-green-600'
            }`}
          >
            {metricInfo[key].label}
          </button>
        ))}
      </div>

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
          modeBarButtonsToAdd: [],
          displaylogo: false
        }}
        style={{ width: '100%', height: '400px' }}
      />
      
      <div className="mt-4 text-sm text-gray-600">
        <p>
          <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-1"></span>
          Values within healthy range ({normalMin} - {normalMax})
        </p>
        <p>
          <span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-1"></span>
          Values outside healthy range
        </p>
        <br></br>
        <GenerateInsites 
         selectedMetric={selectedMetric} 
        values={values} 
       dates={dates}
       />
      </div>
    </div>
  );
};

export default Reportgraph;