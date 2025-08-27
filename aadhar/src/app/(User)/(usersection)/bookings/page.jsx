'use client'
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import DoctorCard from '@/app/components/UserComponents/DoctorCard';

const Page = () => {
  const [fetchedData, setFetchedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('doctor');
  const [sortOption, setSortOption] = useState('default');
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const token = Cookies.get('accessToken');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}api/user/doctors/`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setFetchedData(data.data|| []);
        console.log(data)
      } catch (error) {
        console.error('Error fetching report:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [API_URL, token]);


  const roles = ['doctor', 'nurse', 'caretaker'];

  const filteredData = fetchedData.filter(person => person.role === activeTab);

  const sortedData = [...filteredData].sort((a, b) => {
    switch (sortOption) {
      case 'price-low':
        return (a.pricePerHour || 0) - (b.pricePerHour || 0);
      case 'price-high':
        return (b.pricePerHour || 0) - (a.pricePerHour || 0);
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'experience':
        return (b.experience || 0) - (a.experience || 0);
      default:
        return 0;
    }
  });

  return (
    <div className='p-4 bg-gray-100 min-h-screen'>
      {/* Filter/Sort Section */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
        <div className="flex justify-between items-center gap-4">
        <div className="flex items-center justify-start gap-4 mb-2">
        {roles.map(role => (
          <button
            key={role}
            onClick={() => setActiveTab(role)}
            className={`px-6 py-2 rounded-t-xl text-sm font-medium 
              ${activeTab === role 
                ? ' border-b-2 border-green-600 font-semibold text-green-700 ' 
                : ' text-gray-700 border-b border-gray-300 0 transition'}`}
          >
            {role}s
          </button>
        ))}
      </div>
          <div>
            <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">Sort by:</label>
            <select
              id="sort"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
            >
              <option value="default">Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
              <option value="experience">Experience</option>
            </select>
          </div>

        </div>
      </div>

      <div className='flex flex-wrap justify-center gap-6'>
        {sortedData.map((person, index) => (
          <DoctorCard key={index} doctor={person} />
        ))}
      </div>

      {isLoading && (
        <div className="text-center text-gray-500 mt-8">Loading...</div>
      )}
    </div>
  );
};

export default Page;