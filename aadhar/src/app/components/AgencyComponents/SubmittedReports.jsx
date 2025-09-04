import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:8000/api/';

const SubmittedReports = () => {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = Cookies.get('docsAccessToken');
        const response = await axios.get(`${API_URL}doctor/vitalreport`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReports(response.data.data); // assuming backend returns { success, data }
      } catch (err) {
        console.error('Error fetching submitted reports:', err);
        setError('Failed to fetch reports. Please try again.');
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Submitted Vital Reports</h2>
      {error && <p className="text-red-500">{error}</p>}

      {reports.length > 0 ? (
        <ul className="mt-4 space-y-4">
          {reports.map((report) => (
            <li
              key={report._id}
              className="border p-4 rounded shadow bg-gray-50"
            >
              <p><strong>User ID:</strong> {report.userId}</p>
              <p><strong>Temperature:</strong> {report.bodyTemperatureCelsius} °C</p>
              <p><strong>Blood Pressure:</strong> {report.bloodPressureSystolic}/{report.bloodPressureDiastolic}</p>
              <p><strong>Heart Rate:</strong> {report.heartRate} bpm</p>
              <p><strong>Oxygen Saturation:</strong> {report.oxygenSaturationPercent} %</p>
              <p><strong>Blood Glucose:</strong> {report.bloodGlucoseMgDl} mg/dL</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-gray-600">No reports found.</p>
      )}
    </div>
  );
};

export default SubmittedReports;
