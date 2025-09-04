'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import SubmittedReports from '@/app/components/AgencyComponents/SubmittedReports'

const SendReport = () => {
  const [fromBackend, setFromBackend] = useState([])
  const [expandedIndex, setExpandedIndex] = useState(null)
  const [formData, setFormData] = useState({})
  const [errorMessages, setErrorMessages] = useState({})
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    const fetchData = async () => {
      const storedToken = Cookies.get('docsAccessToken')
      if (!storedToken) return console.error('No token found in cookies')

      try {
        const res = await axios.get(`${API_URL}api/doctor/accepted_appointments`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        setFromBackend(res.data.data || [])
      } catch (error) {
        console.error('Error fetching profile:', error)
      }
    }

    fetchData()
  }, [API_URL])

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  const handleChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        [field]: value,
      },
    }))

    setErrorMessages((prev) => ({
      ...prev,
      [index]: '',
    }))
  }

  const handleSubmit = async (index) => {
    const storedToken = Cookies.get('docsAccessToken')
    if (!storedToken) {
      setErrorMessages((prev) => ({
        ...prev,
        [index]: 'Authentication token missing.',
      }))
      return
    }

    const report = formData[index]
    const appointment = fromBackend[index]

    if (
      !report ||
      !report.bloodPressure ||
      !report.heartRate ||
      !report.temperature ||
      !report.respiratoryRate ||
      !report.oxygenSaturation ||
      !report.bloodGlucose
    ) {
      setErrorMessages((prev) => ({
        ...prev,
        [index]: '⚠️ Please fill in all fields before submitting.',
      }))
      return
    }

    const [systolic, diastolic] = report.bloodPressure.split('/').map((val) => parseInt(val.trim(), 10))
    if (isNaN(systolic) || isNaN(diastolic)) {
      setErrorMessages((prev) => ({
        ...prev,
        [index]: '⚠️ Blood Pressure format must be like 120/80.',
      }))
      return
    }

    const payload = {
      vitalReports: [
        {
          userId: appointment.userId,
          bodyTemperatureCelsius: parseFloat(report.temperature),
          bloodPressureSystolic: systolic,
          bloodPressureDiastolic: diastolic,
          heartRate: parseInt(report.heartRate),
          respiratoryRate: parseInt(report.respiratoryRate),
          oxygenSaturationPercent: parseInt(report.oxygenSaturation),
          bloodGlucoseMgDl: parseInt(report.bloodGlucose),
        },
      ],
    }

    try {
      await axios.post(`${API_URL}api/doctor/vitalreport`, payload.vitalReports[0], {
        headers: { Authorization: `Bearer ${storedToken}` },
      })

      setErrorMessages((prev) => ({
        ...prev,
        [index]: '✅ Vitals submitted successfully!',
      }))

      setTimeout(() => {
        setErrorMessages((prev) => ({ ...prev, [index]: '' }))
      }, 5000)

      setFormData((prev) => ({ ...prev, [index]: {} }))
    } catch (error) {
      console.error('Submission error:', error)
      setErrorMessages((prev) => ({
        ...prev,
        [index]: '❌ Failed to submit vitals. Please try again.',
      }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white p-6">
      {/* Page Header */}
      <div className="max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-bold text-green-600">Submit Patient Health Reports</h1>
        <p className="mt-4 text-gray-600 text-lg">
          Fill out the patient’s vital signs accurately. This information will be stored securely
          and used for their ongoing medical care.
        </p>
        <p className="mt-2 text-sm text-gray-500">
          <span className="font-medium text-green-500">Note:</span> Double-check all values before submitting.
        </p>
      </div>
      <SubmittedReports />
      {/* Appointment List */}
      <div className="max-w-4xl mx-auto">
        {fromBackend.length === 0 ? (
          <p className="text-gray-500 text-center">
            No accepted appointments available at the moment.
          </p>
        ) : (
          fromBackend.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-2xl p-6 mb-6 border border-gray-200 transition hover:shadow-xl"
            >
              <div
                onClick={() => toggleExpand(index)}
                className="cursor-pointer flex justify-between items-center"
              >
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{item.patientName}</h2>
                  <p className="text-sm text-gray-600">
                    Appointment Date:{' '}
                    <span className="font-medium">
                      {new Date(item.dateOfAppointment).toLocaleDateString()}
                    </span>
                  </p>
                </div>
                <span className="text-green-600 font-semibold text-lg">
                  {expandedIndex === index ? '▲' : '▼'}
                </span>
              </div>

              {expandedIndex === index && (
                <div className="mt-6 border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">
                    Patient Vital Signs
                  </h3>

                  {/* Input Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    {/* Temperature */}
                    <div>
                      <label className="block font-medium text-gray-700 mb-1">
                         Body Temperature (°C)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        min="30"
                        max="45"
                        placeholder="e.g., 36.6"
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-400"
                        value={formData[index]?.temperature || ''}
                        onChange={(e) => handleChange(index, 'temperature', e.target.value)}
                      />
                      <p className="text-xs text-gray-500 mt-1">Normal range: 36.5°C - 37.5°C</p>
                    </div>

                    {/* Blood Pressure */}
                    <div>
                      <label className="block font-medium text-gray-700 mb-1">
                         Blood Pressure (mmHg)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., 120/80"
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-400"
                        value={formData[index]?.bloodPressure || ''}
                        onChange={(e) => handleChange(index, 'bloodPressure', e.target.value)}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Enter in format systolic/diastolic (e.g., 120/80)
                      </p>
                    </div>

                    {/* Heart Rate */}
                    <div>
                      <label className="block font-medium text-gray-700 mb-1">
                        Heart Rate (bpm)
                      </label>
                      <input
                        type="number"
                        min="30"
                        max="200"
                        placeholder="e.g., 72"
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-400"
                        value={formData[index]?.heartRate || ''}
                        onChange={(e) => handleChange(index, 'heartRate', e.target.value)}
                      />
                      <p className="text-xs text-gray-500 mt-1">Typical resting: 60 - 100 bpm</p>
                    </div>

                    {/* Respiratory Rate */}
                    <div>
                      <label className="block font-medium text-gray-700 mb-1">
                         Respiratory Rate (bpm)
                      </label>
                      <input
                        type="number"
                        min="8"
                        max="40"
                        placeholder="e.g., 16"
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-400"
                        value={formData[index]?.respiratoryRate || ''}
                        onChange={(e) => handleChange(index, 'respiratoryRate', e.target.value)}
                      />
                      <p className="text-xs text-gray-500 mt-1">Normal range: 12 - 20 bpm</p>
                    </div>

                    {/* Oxygen Saturation */}
                    <div>
                      <label className="block font-medium text-gray-700 mb-1">
                         Oxygen Saturation (%)
                      </label>
                      <input
                        type="number"
                        min="50"
                        max="100"
                        placeholder="e.g., 98"
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-400"
                        value={formData[index]?.oxygenSaturation || ''}
                        onChange={(e) => handleChange(index, 'oxygenSaturation', e.target.value)}
                      />
                      <p className="text-xs text-gray-500 mt-1">Normal: 95% - 100%</p>
                    </div>

                    {/* Blood Glucose */}
                    <div>
                      <label className="block font-medium text-gray-700 mb-1">
                         Blood Glucose (mg/dL)
                      </label>
                      <input
                        type="number"
                        min="40"
                        max="500"
                        placeholder="e.g., 90"
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-400"
                        value={formData[index]?.bloodGlucose || ''}
                        onChange={(e) => handleChange(index, 'bloodGlucose', e.target.value)}
                      />
                      <p className="text-xs text-gray-500 mt-1">Fasting: 70 - 100 mg/dL</p>
                    </div>
                  </div>

                  {/* Error / Success Message */}
                  <div className="flex justify-between items-center mt-4">
                    <span
                      className={`text-sm font-medium ${
                        errorMessages[index]?.includes('successfully')
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {errorMessages[index]}
                    </span>

                    <button
                      className="w-[120px] bg-green-500 hover:bg-green-600 transition text-white py-2 px-4 rounded-lg shadow-md"
                      onClick={() => handleSubmit(index)}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default SendReport
