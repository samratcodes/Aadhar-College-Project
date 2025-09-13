'use client'
import React from 'react'
import { FaHeart, FaShieldAlt, FaStar, FaClock, FaUserMd, FaHome, FaPhoneAlt, FaCalendarCheck } from 'react-icons/fa'
import { MdHealthAndSafety, MdUpdate, MdSupport, MdLocalPharmacy, MdEmergency } from 'react-icons/md'
import { IoIosPeople, IoMdNutrition } from 'react-icons/io'
import { GiMedicines } from 'react-icons/gi'
import LandingDoctors from '@/app/components/UserComponents/Landing/LandingDoctors'
import LandingRecreational from '@/app/components/UserComponents/Landing/LandingRecreational'

const Page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50">
      {/* Hero Section with Background Image */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`
          }}
        />
        <div className="relative container mx-auto px-6 py-24">
          <div className="text-center max-w-4xl mx-auto text-white">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-md rounded-full px-6 py-3 mb-8 animate-fade-in border border-white/30">
              <FaHeart className="w-5 h-5 text-green-400 mr-2" />
              <span className="text-sm font-medium">Comprehensive Care Services</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
              Our <span className="text-green-500">Services</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto leading-relaxed animate-fade-in-delayed">
              Professional, compassionate care services designed to meet the unique needs of your aging parents in Nepal, 
              giving you peace of mind no matter where you are in the world.
            </p>
          </div>
        </div>
      </div>

      {/* Services Overview Section */}
      <div className="py-20 container mx-auto px-6">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <div className="inline-flex items-center bg-green-100 text-green-700 rounded-full px-4 py-2 text-sm font-medium mb-4">
            <FaShieldAlt className="w-4 h-4 mr-2" />
            Comprehensive Care
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">How We Support Your Family</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We offer a complete range of services to ensure your parents receive the care, attention, and support they need to thrive.
          </p>
        </div>

        {/* Healthcare Services */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <div className="inline-flex items-center bg-blue-100 text-blue-700 rounded-full px-4 py-2 text-sm font-medium">
                <FaUserMd className="w-4 h-4 mr-2" />
                Healthcare Services
              </div>
              
              <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                Professional <span className="text-blue-600">Medical Care</span>
              </h2>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Our trained healthcare professionals provide regular medical monitoring and support to ensure your parents' health needs are met.
              </p>
              
              <div className="space-y-4">
                {[
                  { text: "Regular health check-ups and monitoring", icon: <MdHealthAndSafety className="w-5 h-5 text-blue-500" /> },
                  { text: "Medication management and reminders", icon: <GiMedicines className="w-5 h-5 text-blue-500" /> },
                  { text: "Accompany to medical appointments", icon: <FaCalendarCheck className="w-5 h-5 text-blue-500" /> },
                  { text: "Emergency medical response", icon: <MdEmergency className="w-5 h-5 text-blue-500" /> }
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    {feature.icon}
                    <span className="text-gray-700 text-lg">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-green-500 rounded-3xl transform rotate-3"></div>
              <img
                src="https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Healthcare services"
                className="relative rounded-3xl shadow-2xl w-full h-96 object-cover"
              />
            </div>
          </div>

        </div>
      </div>

          <LandingDoctors/>
          <LandingRecreational/>


      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeInDelayed {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }
        
        .animate-slide-up {
          animation: slideUp 1s ease-out 0.3s both;
        }
        
        .animate-fade-in-delayed {
          animation: fadeInDelayed 1s ease-out 0.6s both;
        }
      `}</style>
    </div>
  )
}

export default Page