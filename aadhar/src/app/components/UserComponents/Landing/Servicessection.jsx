import React from 'react'
import { motion } from 'framer-motion'
import { FaHome, FaHandsHelping, FaUserMd } from 'react-icons/fa'

const Servicessection = () => {
  return (
    <section className="py-16 px-6 bg-white relative">
      {/* Heading Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center max-w-2xl mx-auto"
      >
        <h2 className="text-2xl sm:text-4xl font-bold text-gray-900">
          We offer you the <span className="text-green-600">best support</span>
        </h2>
        <p className="mt-4 text-gray-600 text-base sm:text-lg">
          Choose from our wide range of home care and medical services designed 
          to ensure complete care for seniors.
        </p>
      </motion.div>

      {/* Feature Cards */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.9, ease: 'easeOut' }}
        className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto"
      >
        {/* Home Care */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center text-center hover:shadow-2xl hover:border hover:border-green-100 transition-all duration-300"
        >
          <div className="bg-green-50 p-5 rounded-full mb-4 shadow-sm">
            <FaHome className="text-green-600 text-3xl" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Home Care</h3>
          <p className="mt-2 text-gray-600 text-sm">
            Our caregivers provide compassionate in-home support to help seniors 
            live comfortably and independently.
          </p>
        </motion.div>

        {/* Care Services */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center text-center hover:shadow-2xl hover:border hover:border-green-100 transition-all duration-300"
        >
          <div className="bg-green-50 p-5 rounded-full mb-4 shadow-sm">
            <FaHandsHelping className="text-green-600 text-3xl" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Care Services</h3>
          <p className="mt-2 text-gray-600 text-sm">
            Professional nurses and attendants provide physical and emotional 
            support for every need.
          </p>
        </motion.div>

        {/* Medical Escort */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center text-center hover:shadow-2xl hover:border hover:border-green-100 transition-all duration-300"
        >
          <div className="bg-green-50 p-5 rounded-full mb-4 shadow-sm">
            <FaUserMd className="text-green-600 text-3xl" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Medical Escort</h3>
          <p className="mt-2 text-gray-600 text-sm">
            Safe and professional transportation for seniors to hospitals, 
            clinics, and appointments.
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Servicessection
