'use client'
import { useState } from 'react';

const DashboardDrtable = () => {
  // Sample data - replace with your actual data
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "john_doe_123",
      email: "john.doe@example.com",
      firstName: "John",
      lastName: "Doe",
      role: "doctor",
      contactNumber: "+1 (555) 123-4567",
      verified: false,
      specialization: ["Cardiology", "General Medicine"],
      profilePicture: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      certifications: "https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg",
      citizenshipPhotoFront: "https://images.pexels.com/photos/269443/pexels-photo-269443.jpeg",
      citizenshipPhotoBack: "https://images.pexels.com/photos/269443/pexels-photo-269443.jpeg",
      status: "pending"
    },
    {
      id: 2,
      username: "jane_smith",
      email: "jane.smith@example.com",
      firstName: "Jane",
      lastName: "Smith",
      role: "nurse",
      contactNumber: "+1 (555) 987-6543",
      verified: false,
      specialization: ["Pediatrics", "Emergency Care"],
      profilePicture: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
      certifications: "https://images.pexels.com/photos/159832/book-open-pages-literature-159832.jpeg",
      citizenshipPhotoFront: "https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg",
      citizenshipPhotoBack: "https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg",
      status: "pending"
    }
  ]);

  return (
    <div className="container w-1/2 py-8">
      <h1 className="text-2xl text-green-600 font-bold mb-6">Verification Requests</h1>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y bg-white divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img className="h-10 w-10 rounded-full" src={user.profilePicture} alt={`${user.firstName} ${user.lastName}`} />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${user.role === 'doctor' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.contactNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${user.status === 'approved' ? 'bg-green-100 text-green-800' : 
                      user.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {user.status}
                  </span>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardDrtable;