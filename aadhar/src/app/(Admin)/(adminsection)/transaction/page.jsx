'use client'

import React, { useState } from 'react'
import { FaEye, FaCheck, FaTimes } from 'react-icons/fa'

const Page = () => {
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
  const [currentAppointment, setCurrentAppointment] = useState(null)
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleAccept = (id, index) => {
    setCurrentAppointment({ id, index })
    setCurrentAction('accept')
    setShowConfirmation(true)
  }

  const handleReject = (id, index) => {
    setCurrentAppointment({ id, index })
    setCurrentAction('reject')
    setShowConfirmation(true)
  }

  const confirmAction = () => {
    if (currentAction === 'accept') {
      console.log('Accepted:', currentAppointment.id)
      setPendingAppointments(pendingAppointments.filter(
        (_, i) => i !== currentAppointment.index
      ))
    } else {
      console.log('Rejected:', currentAppointment.id)
      setPendingAppointments(pendingAppointments.filter(
        (_, i) => i !== currentAppointment.index
      ))
    }
    setShowConfirmation(false)
  }

  const cancelAction = () => {
    setShowConfirmation(false)
  }

  const openDetailsModal = (appointment) => {
    setSelectedAppointment(appointment)
    setIsModalOpen(true)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Pending Withdrawals</h1>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.N.</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount (Rs.)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">View</th>
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
                    {item.description}
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleAccept(item.id, index)}
                        className="text-green-600 hover:text-green-900"
                      >
                        <FaCheck />
                      </button>
                      <button
                        onClick={() => handleReject(item.id, index)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => openDetailsModal(item)}
                      className="text-gray-500 hover:text-gray-700 transition-colors"
                      title="View documents"
                    >
                      <FaEye className="text-lg" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                  Confirm {currentAction === 'accept' ? 'Acceptance' : 'Rejection'}
                </h2>
                <button onClick={cancelAction} className="text-gray-500 hover:text-gray-700">
                  <FaTimes className="text-lg" />
                </button>
              </div>
              
              <p className="mb-6 text-gray-600">
                Are you sure you want to {currentAction} this withdrawal request?
              </p>
              
              <div className="flex justify-end gap-4">
                <button
                  onClick={cancelAction}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmAction}
                  className={`px-4 py-2 rounded-md text-white ${
                    currentAction === 'accept' 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  {currentAction === 'accept' ? 'Accept' : 'Reject'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Documents Modal */}
      {isModalOpen && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{selectedAppointment.patientName}'s Documents</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                  <FaTimes className="text-lg" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Prescription</h3>
                  <img 
                    src={selectedAppointment.documents.prescription} 
                    alt="Prescription" 
                    className="w-full h-64 object-contain rounded-lg border border-gray-200 bg-gray-50 p-2"
                  />
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold">Payment Receipt</h3>
                  <img 
                    src={selectedAppointment.documents.paymentReceipt} 
                    alt="Payment Receipt" 
                    className="w-full h-64 object-contain rounded-lg border border-gray-200 bg-gray-50 p-2"
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Page