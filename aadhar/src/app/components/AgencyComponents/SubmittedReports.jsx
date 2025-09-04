import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const SubmittedReports = () => {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = Cookies.get('docsAccessToken');
        const response = await axios.get(`${API_URL}api/doctor/vitalreport`, {
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
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-green-600 mb-6 text-center">
        Submitted Vital Reports
      </h2>

      {error && (
        <p className="text-red-500 text-center mb-4 bg-red-50 border border-red-200 rounded p-2">
          {error}
        </p>
      )}

      {reports.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => (
            <div
              key={report._id}
              className="border border-gray-200 rounded-xl bg-white hover:border-green-500 transition-all duration-300"
            >
              {/* Header */}
              <div className="bg-green-500 text-white p-4 rounded-t-xl">
                <h3 className="text-lg font-medium">Vital Report</h3>
                <p className="text-sm opacity-90">
                  User ID: <span className="font-semibold">{report.userId}</span>
                </p>
              </div>

              {/* Body */}
              <div className="p-5 space-y-3 text-gray-700">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Temperature</span>
                  <span className="font-medium text-green-600">{report.bodyTemperatureCelsius} °C</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Blood Pressure</span>
                  <span className="font-medium text-green-600">
                    {report.bloodPressureSystolic}/{report.bloodPressureDiastolic} mmHg
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Heart Rate</span>
                  <span className="font-medium text-green-600">{report.heartRate} bpm</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Oxygen Saturation</span>
                  <span className="font-medium text-green-600">{report.oxygenSaturationPercent} %</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Blood Glucose</span>
                  <span className="font-medium text-green-600">{report.bloodGlucoseMgDl} mg/dL</span>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-gray-50 text-gray-500 text-xs text-center p-3 rounded-b-xl">
                Report generated on: {new Date(report.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-6 text-gray-600 text-center text-lg">
          No reports found.
        </p>
      )}
    </div>
  );
};

export default SubmittedReports;
