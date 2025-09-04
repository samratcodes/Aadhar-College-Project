'use client';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';

const Page = ({ params }) => {
  const { id } = React.use(params);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const token = Cookies.get('accessToken');
  const [fetchedData, setFetchedData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    description: '',
    dateOfAppointment: '',
    address: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}api/user/doctors/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setFetchedData(data.data || {});
      } catch (error) {
        console.error('Error fetching report:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [API_URL, token, id]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBookAppointment = async (e) => {
    e.preventDefault();
    const appointmentData = {
      ...formData,
      doctorId: id,
    };
    const response = await axios.post(
      `${API_URL}api/user/appointment/checkout-session`,
      JSON.stringify(appointmentData),
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    window.location.href = response.data.url;
  };

  if (isLoading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-8 rounded-2xl shadow-lg">
        
    <div className="flex flex-col w-full">
        <div className="flex flex-col items-center w-full">
          <div className="relative w-72 h-72 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition">
            <Image
              src={
                fetchedData.profilePicture ||
                "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              }
              alt="Profile"
              fill
              className="object-cover"
            />
          </div>
          </div>
          {/* Rating */}
          <div className="flex items-center gap-2 mt-4 text-lg text-gray-700">
            <FaStar className="text-yellow-400" />
            <span>{fetchedData.rating || '4.5'}/5 • 34 reviews</span>
          </div>
                    {/* About */}
          <div>
            <h2 className="text-lg font-semibold mt-8 mb-2">About</h2>
            <p className="text-gray-700 leading-relaxed">
              {fetchedData.bio ||
                'Dr. John Doe is a highly experienced cardiologist with 10+ years in the medical field. Specializes in preventive care, diagnostics, and patient wellness.'}
            </p>
          </div>
        </div>

        {/* Right: Info + Booking */}
        <div className="flex flex-col justify-between space-y-6">
          {/* Title + Price */}
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900">
              {fetchedData.firstName || 'Dr. John'} {fetchedData.lastName || 'Doe'}
            </h1>
            <p className="text-xl text-gray-600 mt-2">{fetchedData.role || 'Cardiologist'}</p>

            <div className="flex items-center gap-4 mt-4">
              <span className="text-3xl font-bold text-green-600">
                {fetchedData.pricePerHour ? `$${fetchedData.pricePerHour}/hr` : '$120/hr'}
              </span>
              <span className="px-4 py-1 text-sm bg-green-100 text-green-700 rounded-full font-medium">
                Available
              </span>
            </div>
          </div>


          {/* Dummy Specialties Section */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Specialties</h2>
            <div className="flex flex-wrap gap-2">
              {['Cardiology', 'Preventive Care', 'Diagnostics', 'Nutrition'].map((skill, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 text-sm bg-gray-100 rounded-full border text-gray-700 hover:bg-green-50"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Booking Form */}
          <div className="mt-4">
            <h2 className="text-xl font-semibold text-green-600 mb-4">Book Appointment</h2>
            <form onSubmit={handleBookAppointment} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  name="description"
                  rows="3"
                  className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Write a short message..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    name="dateOfAppointment"
                    className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600"
                    value={formData.dateOfAppointment}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    name="address"
                    className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter address..."
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 text-lg bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-md transition"
              >
                Book Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
