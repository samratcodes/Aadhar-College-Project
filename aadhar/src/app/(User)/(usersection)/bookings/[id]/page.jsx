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
        console.log(token);
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
      doctorId: id, // Include the doctor ID from params
    };
    const response = await axios.post(`${API_URL}api/user/appointment/checkout-session`, JSON.stringify(appointmentData), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Response from booking:", response.data);
    window.location.href = response.data.url;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const appointmentData = {
        ...formData,
        doctorId: id, // Include the doctor ID from params
      };
  
      console.log("Sending appointment data:", appointmentData);
  
      const response = await fetch(`${API_URL}api/user/appointments/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(appointmentData),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const responseData = await response.json();
      console.log("Appointment created successfully:", responseData);
      
      // Optionally reset the form after successful submission
      setFormData({
        description: '',
        dateOfAppointment: '',
        address: '',
      });
  
      // Optionally show a success message to the user
      alert("Appointment booked successfully!");
  
    } catch (error) {
      console.error("Error creating appointment:", error);
      // Optionally show an error message to the user
      alert("Failed to book appointment. Please try again.");
    }
  };
  if (isLoading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="w-40 h-40 relative rounded-full overflow-hidden border-4 border-green-500 shadow-md">
          <Image
            src={ fetchedData.profilePicture ||"https://images.pexels.com/photos/28216688/pexels-photo-28216688/free-photo-of-autumn-camping.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
            alt="Profile"
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1">
          <h2 className="text-3xl font-bold text-gray-900">
            {fetchedData.firstName || 'Not available'} {fetchedData.lastName || ''}
          </h2>
          <p className="text-sm text-gray-600">{fetchedData.role || 'Role not available'}</p>

          <p className="mt-2 text-sm text-gray-700">
            {fetchedData.bio ? fetchedData.bio : 'Bio not available'}
          </p>

          <div className="grid grid-cols-2 text-sm gap-y-2 mt-4 text-gray-800">
            <span className="font-semibold">Email:</span>
            <span>{fetchedData.email || 'Not available'}</span>

            <span className="font-semibold">Experience:</span>
            <span>{fetchedData.experience || 'Not available'}</span>

          </div>
         
          <span className='font-medium mt-9 text-2xl text-green-600'>{fetchedData.pricePerHour ? `$${fetchedData.pricePerHour} /hr` : '$100/hr'}</span>
          <div className="flex items-center mt-3 text-sm text-gray-800">
            <FaStar className="text-yellow-500 mr-1" />
            <span>{fetchedData.rating || '3'}/5 • 23 reviews</span>
          </div>
        </div>
      </div>

      {/* Booking Form */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold text-green-600 mb-4">Book Appointment</h3>
        <form onSubmit={handleBookAppointment} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              name="description"
              rows="3"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              name="dateOfAppointment"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
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
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          </div>
          <button
            type="submit"
            className="w-max bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 transition"
          >
            Book now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
