'use client'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'

const clientsverify = () => {
  const [appointments, setAppointments] = useState([])
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    const fetchAppointments = async () => {
      const storedToken = Cookies.get('docsAccessToken')
      console.log('Token from cookie:', storedToken)

      if (!storedToken) {
        console.error('No token found in cookies')
        return
      }

      try {
        console.log(storedToken);
        const res = await axios.get(`${API_URL}api/doctor/appointments`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })

        console.log('Fetched appointments:', res.data)
        setAppointments(res.data.data)
      } catch (error) {
        console.error('Error fetching appointments:', error)
      }
    }

    fetchAppointments()
  }, [API_URL])

  
  const handleAccept = async (id, index) => {
    const token = Cookies.get('docsAccessToken')
    if (!token) return console.error('Token missing!')
     console.log(id);
    try {
      await axios.post(`${API_URL}api/doctor/appointments/accept/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
         
      // Update local state after successful API call
      setAppointments(prev =>
        prev.map((appointment, i) =>
          i === index ? { ...appointment, status: 'accepted' } : appointment
        )
      )
    } catch (error) {
      console.error('Error accepting appointment:', error)
    }
  }

  const handleReject = async (id, index) => {
    const token = Cookies.get('docsAccessToken')
    if (!token) return console.error('Token missing!')

    try {
      await axios.post(`${API_URL}api/doctor/appointments/reject/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      // Update local state after successful API call
      setAppointments(prev =>
        prev.map((appointment, i) =>
          i === index ? { ...appointment, status: 'rejected' } : appointment
        )
      )
    } catch (error) {
      console.error('Error accepting appointment:', error)
    }
  }

  const pendingAppointments = appointments.filter(item => item.status === 'pending')

  return (
    <div className="min-h-screen rounded-lg bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-green-500 mb-15">Pending Appointments</h1>
      <div className="grid grid-cols-6 font-semibold p-2 rounded-t-md">
        <div>S.N.</div>
        <div>Name</div>
        <div>Description</div>
        <div>Date</div>
        <div>Address</div>
        <div>Action</div>
      </div>
      {pendingAppointments.length === 0 ? (
        <div className="text-gray-500 p-4 ">
          No pending appointments to display.
        </div>
      ) : (
        pendingAppointments.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-6 border-t border-gray-300 p-2 items-center"
          >
            <div>{index + 1}</div>
            <div>{item.patientName}</div>
            <div>{item.description}</div>
            <div>{new Date(item.dateOfAppointment).toLocaleDateString('en-CA')}</div>
            <div>{item.address}</div>
            <div className="flex gap-2">
              <button className="bg-green-400 text-black px-2 py-1 rounded hover:bg-green-500" onClick={() => handleAccept(item.id, index)}>
                ✔
              </button>
              <button className="bg-gray-400 text-black px-2 py-1 rounded hover:bg-gray-500" onClick={() => handleReject(item.id, index)}>
                ✖
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default clientsverify
