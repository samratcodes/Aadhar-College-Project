'use client';
import { useState } from 'react';
import GenerateInsights from './GenerateInsites';

const NewHealthReportTable = ({ data }) => {
  const [selectedView, setSelectedView] = useState('all');

  if (data.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No health data available. Please check back later.
      </div>
    );
  }
const selectedMetric = 'temperature ,bloodPressure, heart, respiratory, oxygen, glucose';
const values = data
  const latestReport = [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
 const dates = data.map((item) => item.createdAt).sort((a, b) => new Date(a) - new Date(b));

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const metrics = {
    temperature: {
      label: 'Body Temperature (°C)',
      value: latestReport.bodyTemperatureCelsius
    },
    bloodPressure: {
      label: 'Blood Pressure (mmHg)',
      value: `${latestReport.bloodPressureSystolic}/${latestReport.bloodPressureDiastolic}`
    },
    heart: {
      label: 'Heart Rate (bpm)',
      value: latestReport.heartRate
    },
    respiratory: {
      label: 'Respiratory Rate (bpm)',
      value: latestReport.respiratoryRate
    },
    oxygen: {
      label: 'Oxygen Saturation (%)',
      value: latestReport.oxygenSaturationPercent
    },
    glucose: {
      label: 'Blood Glucose (mg/dL)',
      value: latestReport.bloodGlucoseMgDl
    }
  };

  const selectedMetrics = selectedView === 'all'
    ? Object.values(metrics)
    : [metrics[selectedView]];

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-green-600 mb-4">Latest Health Report</h1>

      <div className="flex justify-between items-center mb-6">

        <div className="text-sm text-gray-500">
        Date:  {formatDate(latestReport.createdAt)}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Metric
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Value
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {selectedMetrics.map((metric, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">
                  {metric.label}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {metric.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    <GenerateInsights 
         selectedMetric={selectedMetric} 
        values={values} 
       dates={dates}
       />
    </div>
  );
};

export default NewHealthReportTable;
