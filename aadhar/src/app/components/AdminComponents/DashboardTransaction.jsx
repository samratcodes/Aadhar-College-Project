'use client'

import React, { useState } from 'react'
import { FaEye, FaCheck, FaTimes } from 'react-icons/fa'

const DashboardTransaction = () => {
  const [pendingAppointments, setPendingAppointments] = useState([
    {
      id: 1,
      patientName: 'Samrat',
      description: 'This is the description',
      dateOfAppointment: '2081-12-31',
      address: 'Kathmandu, Nepal',
      amount: 1500,
      documents: {
        prescription: 'https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg',
        paymentReceipt: 'https://images.pexels.com/photos/269443/pexels-photo-269443.jpeg'
      }
    },
    {
      id: 2,
      patientName: 'Aarav',
      description: 'Follow-up consultation',
      dateOfAppointment: '2081-12-25',
      address: 'Pokhara, Nepal',
      amount: 2000,
      documents: {
        prescription: 'https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg',
        paymentReceipt: 'https://images.pexels.com/photos/159832/book-open-pages-literature-159832.jpeg'
      }
    }
  ])
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [currentAction, setCurrentAction] = useState(null)
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)



  return (
    <div className="container w-1/2 px-4 py-8">
      <h1 className="text-2xl text-green-600 font-bold mb-6">Pending Withdrawals</h1>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.N.</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount (Rs.)</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pendingAppointments.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                  No pending withdrawals to display.
                </td>
              </tr>
            ) : (
              pendingAppointments.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{item.patientName}</div>
                  </td>
                 
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(item.dateOfAppointment).toLocaleDateString('en-CA')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.address}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                    ₨ {item.amount.toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DashboardTransaction