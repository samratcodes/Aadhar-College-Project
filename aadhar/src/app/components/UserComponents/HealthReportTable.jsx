'use client';
import { useState } from 'react';

const HealthReportTable = ({ data }) => {
  const [selectedView, setSelectedView] = useState('all');

  const filteredData = data.map(item => {
    switch(selectedView) {
      case 'temperature':
        return { id: item.id, createdAt: item.createdAt, bodyTemperatureCelsius: item.bodyTemperatureCelsius };
      case 'bloodPressure':
        return { 
          id: item.id, 
          createdAt: item.createdAt, 
          bloodPressure: `${item.bloodPressureSystolic}/${item.bloodPressureDiastolic}`
        };
      case 'heart':
        return { id: item.id, createdAt: item.createdAt, heartRate: item.heartRate };
      case 'respiratory':
        return { id: item.id, createdAt: item.createdAt, respiratoryRate: item.respiratoryRate };
      case 'oxygen':
        return { id: item.id, createdAt: item.createdAt, oxygenSaturationPercent: item.oxygenSaturationPercent };
      case 'glucose':
        return { id: item.id, createdAt: item.createdAt, bloodGlucoseMgDl: item.bloodGlucoseMgDl };
      default:
        return {
          id: item.id,
          createdAt: item.createdAt,
          bodyTemperatureCelsius: item.bodyTemperatureCelsius,
          bloodPressure: `${item.bloodPressureSystolic}/${item.bloodPressureDiastolic}`,
          heartRate: item.heartRate,
          respiratoryRate: item.respiratoryRate,
          oxygenSaturationPercent: item.oxygenSaturationPercent,
          bloodGlucoseMgDl: item.bloodGlucoseMgDl
        };
    }
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-green-600 mb-6">Health Report Dashboard</h1>
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <label htmlFor="view-select" className="text-sm font-medium text-gray-700">
            View:
          </label>
          <select
            id="view-select"
            value={selectedView}
            onChange={(e) => setSelectedView(e.target.value)}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border"
          >
            <option value="all">All Metrics</option>
            <option value="temperature">Body Temperature</option>
            <option value="bloodPressure">Blood Pressure</option>
            <option value="heart">Heart Rate</option>
            <option value="respiratory">Respiratory Rate</option>
            <option value="oxygen">Oxygen Saturation</option>
            <option value="glucose">Blood Glucose</option>
          </select>
        </div>
        <div className="text-sm text-gray-500">
          {data.length} records found
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date & Time
              </th>
              {selectedView === 'all' || selectedView === 'temperature' ? (
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Temp (°C)
                </th>
              ) : null}
              {selectedView === 'all' || selectedView === 'bloodPressure' ? (
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  BP (mmHg)
                </th>
              ) : null}
              {selectedView === 'all' || selectedView === 'heart' ? (
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Heart Rate (bpm)
                </th>
              ) : null}
              {selectedView === 'all' || selectedView === 'respiratory' ? (
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Resp. Rate (bpm)
                </th>
              ) : null}
              {selectedView === 'all' || selectedView === 'oxygen' ? (
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SpO₂ (%)
                </th>
              ) : null}
              {selectedView === 'all' || selectedView === 'glucose' ? (
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Glucose (mg/dL)
                </th>
              ) : null}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(item.createdAt)}
                </td>
                {selectedView === 'all' || selectedView === 'temperature' ? (
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.bodyTemperatureCelsius}
                  </td>
                ) : null}
                {selectedView === 'all' || selectedView === 'bloodPressure' ? (
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.bloodPressure}
                  </td>
                ) : null}
                {selectedView === 'all' || selectedView === 'heart' ? (
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.heartRate}
                  </td>
                ) : null}
                {selectedView === 'all' || selectedView === 'respiratory' ? (
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.respiratoryRate}
                  </td>
                ) : null}
                {selectedView === 'all' || selectedView === 'oxygen' ? (
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.oxygenSaturationPercent}
                  </td>
                ) : null}
                {selectedView === 'all' || selectedView === 'glucose' ? (
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.bloodGlucoseMgDl}
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No health data available. Please check back later.
        </div>
      )}
    </div>
  );
};

export default HealthReportTable;