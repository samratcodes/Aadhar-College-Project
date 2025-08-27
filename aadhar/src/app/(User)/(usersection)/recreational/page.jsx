'use client'
import Cookies from 'js-cookie';
import React, { useState,useEffect } from 'react';
import { FaHiking, FaPaintBrush, FaYinYang, FaUtensils, FaRegBookmark, FaBookmark, FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import { FiUsers, FiCalendar, FiClock, FiMapPin } from 'react-icons/fi';
import Image from 'next/image';


const ActivityCard = ({ activity, onClick }) => {


  return (
    <div 
      className="flex flex-col w-full max-w-sm overflow-hidden bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer"
      onClick={onClick}
    >
      {/* Card content remains the same */}
      <div className="relative w-full h-48 bg-gradient-to-r from-gray-50 to-gray-100 flex items-center justify-center">
        <Image
        width={300}
        height={300}
          src={activity.images[0]}
          alt={activity.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          {activity.booked ? (
            <FaBookmark className="text-emerald-600 text-xl" />
          ) : (
            <FaRegBookmark className="text-gray-300 text-xl hover:text-emerald-400 transition-colors" />
          )}
        </div>
      </div>

      <div className="p-5 flex flex-col h-full">
        <div className="mb-3">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wide text-emerald-600 uppercase bg-emerald-50 rounded-full">
            {activity.category}
          </span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2">{activity.title}</h3>
        <p className="text-gray-600 mb-5 flex-grow">{activity.description}</p>

        <div className="grid grid-cols-2 gap-3 mb-5 text-sm">
          <div className="flex items-center text-gray-700 space-x-1.5">
            <FiUsers className="text-gray-400 flex-shrink-0" />
            <span>{activity.numberOfPeople} spots</span>
          </div>
          <div className="flex items-center text-gray-700 space-x-1.5">
            <FiCalendar className="text-gray-400 flex-shrink-0" />
            <span>{new Date(activity.tentativeDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
          </div>
          <div className="flex items-center text-gray-700 space-x-1.5">
            <FiClock className="text-gray-400 flex-shrink-0" />
            <span>{activity.time.slice(0, 5)}</span>
          </div>
          <div className="flex items-center text-gray-700 space-x-1.5">
            <FiMapPin className="text-gray-400 flex-shrink-0" />
            <span>Location</span>
          </div>
        </div>

        <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100">
          <div>
            <span className="text-xs text-gray-500">From</span>
            <span className="text-2xl font-bold text-emerald-600 block">${activity.price.toFixed(2)}</span>
          </div>
          <button
            className={`px-5 py-2.5 rounded-lg font-medium text-sm tracking-wide transition-all ${
              activity.booked
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md hover:shadow-emerald-200'
            }`} >
            {activity.booked ? 'Fully Booked' : 'Join Now'}
          </button>
        </div>
      </div>
    </div>
  );
};

const ActivityModal = ({ activity, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const token = Cookies.get('accessToken');
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === activity.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? activity.images.length - 1 : prevIndex - 1
    );
  };
  const Booknow = async (id) => {
    try {
      const response = await fetch(`${API_URL}api/user/book_activity/${id}`, {
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
      
    } catch (error) {
      console.error('Error approving doctor:', error);
    } 
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md z-10 hover:bg-gray-100"
          >
            <FaTimes className="text-gray-600" />
          </button>

          {/* Image slider */}
          <div className="relative h-64 md:h-96 bg-gray-100">
            {activity.images.length > 0 ? (
              <>
                <img 
                  src={activity.images[currentImageIndex]} 
                  alt={activity.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Navigation arrows */}
                {activity.images.length > 1 && (
                  <>
                    <button 
                      onClick={(e) => { e.stopPropagation(); prevImage(); }}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
                    >
                      <FaChevronLeft className="text-gray-600" />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); nextImage(); }}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
                    >
                      <FaChevronRight className="text-gray-600" />
                    </button>
                  </>
                )}
                
                {/* Image indicators */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                  {activity.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(index); }}
                      className={`w-2 h-2 rounded-full ${index === currentImageIndex ? 'bg-emerald-600' : 'bg-white bg-opacity-50'}`}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <FaHiking size={48} className="text-emerald-600" />
              </div>
            )}
          </div>

          {/* Modal content */}
          <div className="p-6">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wide text-emerald-600 uppercase bg-emerald-50 rounded-full">
                {activity.category}
              </span>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-3">{activity.title}</h2>
            <p className="text-gray-600 mb-6">{activity.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center text-gray-700">
                <FiUsers className="text-gray-400 mr-2" />
                <span>{activity.numberOfPeople} spots available</span>
              </div>
              <div className="flex items-center text-gray-700">
                <FiCalendar className="text-gray-400 mr-2" />
                <span>{new Date(activity.tentativeDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <FiClock className="text-gray-400 mr-2" />
                <span>{activity.time.slice(0, 5)}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <FiMapPin className="text-gray-400 mr-2" />
                <span>Location details</span>
              </div>
            </div>

            <div className="flex justify-between items-center border-t border-gray-100 pt-4">
              <div>
                <span className="text-xs text-gray-500">Starting from</span>
                <span className="text-3xl font-bold text-emerald-600 block">${activity.price.toFixed(2)}</span>
              </div>
              <button
                className={`px-6 py-3 rounded-lg font-medium text-base tracking-wide transition-all ${
                  activity.booked
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md hover:shadow-emerald-200'
                }`}
                onClick={(e) => { e.stopPropagation(); Booknow(activity.id);  // Close the modal after booking
                  alert('Booking Successful!'); // Show success message
                }}
              >
                {activity.booked ? 'Fully Booked' : 'Book Now'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ActivityList = () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const token = Cookies.get('accessToken');
    const [activityData, setActivityData] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}api/user/activities`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        console.log('data',data)
        setActivityData(data.data || []);
        
      } catch (error) {
        console.error('Error fetching report:', error);
      } 
}

    fetchData();
  }, [API_URL, token]);
  return (
    <div className="container mx-auto px-4 py-4">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-green-600 mb-3">Discover Upcoming Activities</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">Join unique experiences and connect with like-minded people</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {activityData.map((activity) => (
          <ActivityCard 
            key={activity.id} 
            activity={activity} 
            onClick={() => setSelectedActivity(activity)}
          />
        ))}
      </div>

      {selectedActivity && (
        <ActivityModal 
          activity={selectedActivity} 
          onClose={() => setSelectedActivity(null)}
        />
      )}
    </div>
  );
};

export default ActivityList;