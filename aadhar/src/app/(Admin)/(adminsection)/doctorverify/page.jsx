'use client'
import { useState ,useEffect } from 'react';
import { FaEye, FaCheck, FaTimes } from 'react-icons/fa';
import Cookies from 'js-cookie';
const AdminApprovalTable = () => {

  const [users, setUsers] = useState([
    {
      id: 0,
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      role: "",
      contactNumber: "",
      verified: false,
      specialization: "Cardiology",
      profilePicture: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      certifications: "https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg",
      citizenshipPhotoFront: "https://images.pexels.com/photos/269443/pexels-photo-269443.jpeg",
      citizenshipPhotoBack: "https://images.pexels.com/photos/269443/pexels-photo-269443.jpeg",
      verification: "pending"
    },
   
  ]);
  const [fetchedData, setFetchedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const token = Cookies.get('adminAccessToken');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}admin/doctors`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        console.log('data',data)
        setUsers(data.data);
        
      } catch (error) {
        console.error('Error fetching report:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [API_URL, token]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApprove = async (id) => {
    try {
      const response = await fetch(`${API_URL}admin/doctor/accept/${id}`, {
        method: 'POST', // Specify the method as POST
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        // If you need to send a body with the request, uncomment and modify the following:
        // body: JSON.stringify({ 
        //   /* your data here */ 
        // }),
      });
  
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      console.log('data', data);
    setUsers(users.map(user => 
        user.id === id ? { ...user, status: "verified" } : user
      ));
      
    } catch (error) {
      console.error('Error approving doctor:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await fetch(`${API_URL}admin/doctor/reject/${id}`, {
        method: 'POST', // Specify the method as POST
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        // If you need to send a body with the request, uncomment and modify the following:
        // body: JSON.stringify({ 
        //   /* your data here */ 
        // }),
      });
  
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      console.log('data', data);

      setUsers(users.map(user => 
        user.id === id ? { ...user, status: "rejected" } : user
      ));
      
    } catch (error) {
      console.error('Error approving doctor:', error);
    } finally {
      setIsLoading(false);
    }

  };

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Professional Verification Requests</h1>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialization</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Verification</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">View</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img className="h-10 w-10  rounded-full" src={user.profilePicture} alt={`${user.firstName} ${user.lastName}`} />
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
                  <div className="flex flex-wrap gap-1">  
                      <span className="px-2 py-1 text-xs bg-gray-100 rounded">
                        {user.specialization||"not available"}
                      </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${user.verification === 'verified' ? 'bg-green-100 text-green-800' : 
                      user.verification === 'unverified' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {user.verification}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleApprove(user.id)}
                      className="text-green-600 hover:text-green-900"
                      disabled={user.verification === 'approved'}
                    >
                      <FaCheck />
                    </button>
                    <button
                      onClick={() => handleReject(user.id)}
                      className="text-red-600 hover:text-red-900"
                      disabled={user.verification === 'rejected'}
                    >
                      <FaTimes />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => openModal(user)}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                    title="View documents"
                  >
                    <FaEye className="text-lg" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{selectedUser.firstName} {selectedUser.lastName}'s Documents</h2>
                <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                  <FaTimes className="text-lg" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Profile Picture</h3>
                  <img 
                    src={selectedUser.profilePicture} 
                    alt="Profile" 
                    className="w-full h-64 object-cover rounded-lg border border-gray-200"
                  />
                  
                  <h3 className="font-semibold">Certification</h3>
                  <img 
                    src={selectedUser.certifications} 
                    alt="Certification" 
                    className="w-full h-64 object-contain rounded-lg border border-gray-200 bg-gray-50 p-2"
                  />
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold">Citizenship Front</h3>
                  <img 
                    src={selectedUser.citizenshipPhotoFront} 
                    alt="Citizenship Front" 
                    className="w-full h-64 object-contain rounded-lg border border-gray-200 bg-gray-50 p-2"
                  />
                  
                  <h3 className="font-semibold">Citizenship Back</h3>
                  <img 
                    src={selectedUser.citizenshipPhotoBack} 
                    alt="Citizenship Back" 
                    className="w-full h-64 object-contain rounded-lg border border-gray-200 bg-gray-50 p-2"
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={closeModal}
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
  );
};

export default AdminApprovalTable;