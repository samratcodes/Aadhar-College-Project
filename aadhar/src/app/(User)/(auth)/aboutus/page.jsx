'use client'
import React from 'react'
import { FaHeart, FaShieldAlt, FaCheckCircle, FaStar, FaQuoteLeft } from 'react-icons/fa'
import { MdFamilyRestroom, MdHealthAndSafety, MdUpdate, MdSupport } from 'react-icons/md'
import { IoIosPeople } from 'react-icons/io'

const Page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50">
      {/* Hero Section with Background Image */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.pexels.com/photos/8430304/pexels-photo-8430304.jpeg')`
          }}
        />
        <div className="relative container mx-auto px-6 py-24">
          <div className="text-center max-w-4xl mx-auto text-white">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-md rounded-full px-6 py-3 mb-8 animate-fade-in border border-white/30">
              <FaHeart className="w-5 h-5 text-green-400 mr-2" />
              <span className="text-sm font-medium">Caring for Your Family</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
              About <span className="text-green-500">Aadhar</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto leading-relaxed animate-fade-in-delayed">
              Bridging the distance between you and your aging parents in Nepal with comprehensive, 
              compassionate care services that bring peace of mind to families worldwide.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20 container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center bg-green-100 text-green-700 rounded-full px-4 py-2 text-sm font-medium">
                <FaShieldAlt className="w-4 h-4 mr-2" />
                Our Mission
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Caring for Your <span className="text-green-600">Parents</span> Like Our Own
              </h2>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                We understand the challenges of caring for aging parents from afar. Aadhar was created 
                to bridge that gap, providing professional, compassionate care that gives you peace of mind 
                and your parents the support they deserve.
              </p>
              
              <div className="space-y-4">
                {[
                  { text: "Professional healthcare monitoring", icon: <MdHealthAndSafety className="w-5 h-5 text-green-500" /> },
                  { text: "Trusted local caretakers", icon: <IoIosPeople className="w-5 h-5 text-green-500" /> },
                  { text: "Regular family updates", icon: <MdUpdate className="w-5 h-5 text-green-500" /> },
                  { text: "24/7 emergency support", icon: <MdSupport className="w-5 h-5 text-green-500" /> }
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    {feature.icon}
                    <span className="text-gray-700 text-lg">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-3xl transform rotate-3"></div>
              <img
                src="https://images.pexels.com/photos/7551667/pexels-photo-7551667.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Elderly care"
                className="relative rounded-3xl shadow-2xl w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center bg-blue-100 text-blue-700 rounded-full px-4 py-2 text-sm font-medium mb-4">
              <MdFamilyRestroom className="w-4 h-4 mr-2" />
              Our Values
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">What Makes Us Different</h2>
            <p className="text-xl text-gray-600">We're built on a foundation of compassion, trust, and excellence in care.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { 
                title: "Compassion", 
                description: "We treat every client with the dignity and respect they deserve, just like family.",
                icon: <FaHeart className="w-10 h-10 text-pink-500" />
              },
              { 
                title: "Trust", 
                description: "Your family's safety is our priority. We thoroughly vet all our caregivers.",
                icon: <FaShieldAlt className="w-10 h-10 text-blue-500" />
              },
              { 
                title: "Excellence", 
                description: "We maintain the highest standards of care through continuous training and monitoring.",
                icon: <FaStar className="w-10 h-10 text-yellow-500" />
              }
            ].map((value, index) => (
              <div key={index} className="bg-gradient-to-b from-white to-gray-50 p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center shadow-md mb-6 mx-auto">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">{value.title}</h3>
                <p className="text-gray-600 text-center">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
   <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes bounceIn {
          from { opacity: 0; transform: scale(0.8) translateY(30px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        
        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }
        
        .animate-slide-up {
          animation: slideUp 1s ease-out 0.3s both;
        }
        
        .animate-fade-in-delayed {
          animation: fadeIn 1s ease-out 0.6s both;
        }
        
        .animate-bounce-in {
          animation: bounceIn 1s ease-out 0.9s both;
        }
      `}</style>
    </div>
  )
}

export default Page