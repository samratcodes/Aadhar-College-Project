'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

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
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        console.log('Fetched accepted appointments:', res.data.data)
        setFromBackend(res.data.data)
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
        [index]: 'Please fill in all fields.',
      }))
      return
    }

    const [systolic, diastolic] = report.bloodPressure.split('/').map((val) => parseInt(val.trim(), 10))

    if (isNaN(systolic) || isNaN(diastolic)) {
      setErrorMessages((prev) => ({
        ...prev,
        [index]: 'Blood Pressure format must be like 120/80.',
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
      console.log('Submitting vitals:', payload.vitalReports[0])
      await axios.post(`${API_URL}api/doctor/vitalreport`, payload.vitalReports[0], {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      setErrorMessages((prev) => ({
        ...prev,
        [index]: 'Vitals submitted successfully!',
      }))
      
      // Clear the success message after 5 seconds
      setTimeout(() => {
        setErrorMessages((prev) => ({
          ...prev,
          [index]: '',
        }))
      }, 5000)

      setFormData((prev) => ({
        ...prev,
        [index]: {},
      }))

      console.log('Vitals submitted successfully!')
    } catch (error) {
      console.error('Submission error:', error)
      setErrorMessages((prev) => ({
        ...prev,
        [index]: 'Failed to submit vitals. Please try again.',
      }))
    }
  }

  return (
    <div className="min-h-screen rounded-lg bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-green-500 mb-10">Submit Reports</h1>

      {fromBackend.length === 0 ? (
        <p className="text-gray-500">No accepted appointments available.</p>
      ) : (
        fromBackend.map((item, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4 mb-4">
            <div
              onClick={() => toggleExpand(index)}
              className="cursor-pointer flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-semibold">{item.patientName}</h2>
                <p className="text-sm text-gray-600">
                  Appointment Date: {new Date(item.dateOfAppointment).toLocaleDateString()}
                </p>
              </div>
              <span className="text-green-600 font-semibold">
                {expandedIndex === index ? '▲' : '▼'}
              </span>
            </div>

            {expandedIndex === index && (
              <div className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block font-medium text-gray-700 mb-1">
                      Body Temperature (°C)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      className="w-full p-2 border rounded"
                      value={formData[index]?.temperature || ''}
                      onChange={(e) => handleChange(index, 'temperature', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-gray-700 mb-1">
                      Blood Pressure (mmHg)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., 120/80"
                      className="w-full p-2 border rounded"
                      value={formData[index]?.bloodPressure || ''}
                      onChange={(e) => handleChange(index, 'bloodPressure', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-gray-700 mb-1">
                      Heart Rate (bpm)
                    </label>
                    <input
                      type="number"
                      className="w-full p-2 border rounded"
                      value={formData[index]?.heartRate || ''}
                      onChange={(e) => handleChange(index, 'heartRate', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-gray-700 mb-1">
                      Respiratory Rate (bpm)
                    </label>
                    <input
                      type="number"
                      className="w-full p-2 border rounded"
                      value={formData[index]?.respiratoryRate || ''}
                      onChange={(e) => handleChange(index, 'respiratoryRate', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-gray-700 mb-1">
                      Oxygen Saturation (%)
                    </label>
                    <input
                      type="number"
                      className="w-full p-2 border rounded"
                      value={formData[index]?.oxygenSaturation || ''}
                      onChange={(e) => handleChange(index, 'oxygenSaturation', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-gray-700 mb-1">
                      Blood Glucose (mg/dL)
                    </label>
                    <input
                      type="number"
                      className="w-full p-2 border rounded"
                      value={formData[index]?.bloodGlucose || ''}
                      onChange={(e) => handleChange(index, 'bloodGlucose', e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center mt-2">
                <span
  className={`text-sm ${
    errorMessages[index] === 'Vitals submitted successfully!'
      ? 'text-green-600'
      : 'text-red-600'
  }`}
>
  {errorMessages[index]}
</span>
                  <button
                    className="w-[100px] bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
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
  )
}

export default SendReport
